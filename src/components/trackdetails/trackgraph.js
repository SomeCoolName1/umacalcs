import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //xaxis
  LinearScale, //yaxis
  PointElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import Annotation from "chartjs-plugin-annotation";
import "./trackgraph.scss";
import { useEffect, useRef } from "react";
import { raceSimPlot } from "../calculations/racesim";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Annotation
);

const TrackGraph = ({ sections, stats }) => {
  const dispatch = useDispatch();
  const track = useSelector((state) => state.track);
  const { distance, corners, straights, slopes } = track;

  const dataPlot = raceSimPlot(sections, stats);

  const racePhases = [
    { phase: "Opening Leg", start: 0, end: distance / 6 },
    { phase: "Middle Leg", start: distance / 6, end: (2 * distance) / 3 },
    { phase: "Final Leg", start: (2 * distance) / 3, end: (5 * distance) / 6 },
    { phase: "Last Spurt", start: (5 * distance) / 6, end: distance },
  ];

  const { phase0, phase1, phase2, phase3 } = racePhases;

  const { racePlot } = dataPlot;

  const maxSpeed = Math.max(...racePlot.map((o) => o.speed));

  let trackCourse = [];
  if (corners) {
    corners.map((corner) => {
      return trackCourse.push({
        type: "corner",
        cornerStart: corner.start,
        cornerEnd: corner.start + corner.length,
      });
    });
  }
  if (straights) {
    straights.map((straight) => {
      return trackCourse.push({
        type: "straight",
        straightStart: straight.start,
        straightEnd: straight.end,
      });
    });
  }

  const data = {
    labels: racePlot.map((x) => x.time),
    datasets: [
      {
        label: "Speed",
        data: racePlot.map((x) => x.speed),
        borderColor: "black",
        borderWidth: 1,
        yAxisID: "y",
        backgroundColor: racePlot.map((x) =>
          x.speed % 2 === 0 ? "red" : "pink"
        ),
      },
      {
        label: "Stamina",
        data: racePlot.map((x) => x.remainingStamina),
        borderColor: "red",
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  };

  // let phaseChangeAnnotations = phaseChange.map((x) => {
  //   return {
  //     type: "line",
  //     borderColor: "green",
  //     borderWidth: 1,
  //     label: {
  //       display: true,
  //       content: x.phase,
  //       position: "end",
  //       height: 100,
  //     },
  //     scaleID: "x",
  //     value: x.time,
  //   };
  // });

  // let cornerStraightAnnotation = phaseChange.map((x) => {
  //   return {
  //     type: "box",
  //     scaleID: "y",
  //     xMin: 1,
  //     xMax: 2,
  //     yMin: 0,
  //     yMax: maxSpeed / 2,
  //     backgroundColor: "rgba(255, 99, 132, 0.5)",
  //   };
  // });

  // let annotations = [...phaseChangeAnnotations, ...cornerStraightAnnotation];

  let checkSection = racePlot.map((x) => {
    return {
      type: "box",
      yScaleID: "y",
      xMin: x.time - 1,
      xMax: x.time,
      yMin: 0,
      yMax: 20,
      borderWidth: 0,
      backgroundColor:
        x.currentSection === "straight"
          ? "rgba(25, 200, 252, 0.25)"
          : "rgba(255, 51, 51, 0.25)",
    };
  });

  const options = {
    plugins: {
      legend: true,
      annotation: {
        annotations: checkSection,
      },
    },
    elements: {
      point: {
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
    },
    scales: {
      y: {
        // beginAtZero: true,
        min: 15,
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        beginAtZero: true,
        min: -500,
        display: true,
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    options: { maintainAspectRatio: true },
  };

  //Phase Progression Bar

  const chartRef = useRef(null);
  const chart = chartRef.current;
  let containerWidth;
  let graphWidth;
  let graphLeft;
  let timeFinished = racePlot[racePlot.length - 1].time;

  if (chart) {
    containerWidth = chart.width;
    graphWidth = chart.chartArea.width;
    graphLeft = chart.chartArea.left;
  }

  const calculatePhaseDistance = (phase) => {
    const absolutePointRatio = graphWidth * (phase / timeFinished);

    return absolutePointRatio;
  };

  const getPhaseChanges = [
    ...new Map(racePlot.map((item) => [item["phase"], item])).values(),
  ];

  return (
    <>
      <h2>Race Simulation</h2>
      <div
        className="phases-bar-container"
        style={{ width: `${graphWidth}px`, left: `${graphLeft}px` }}
      >
        {getPhaseChanges.map((phase) => (
          <div
            className="phase-seperator"
            id={`{phase-seperator-${phase.phase}`}
            style={{
              width: `${calculatePhaseDistance(phase.time)}px`,
            }}
          />
        ))}
      </div>
      <Line options={options} data={data} ref={chartRef} />
      <span>
        Note: The graph represents a single simulation and does some shit{" "}
      </span>
    </>
  );
};

export default TrackGraph;
