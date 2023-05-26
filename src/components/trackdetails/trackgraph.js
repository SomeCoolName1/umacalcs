import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //xaxis
  LinearScale, //yaxis
  PointElement,
} from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import "./trackgraph.scss";
import { useEffect, useRef } from "react";
import { raceSimPlot } from "../calculations/racesim";
import EnoughStamina from "../calculations/enoughstamina";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Annotation
);

const TrackGraph = ({ sections, slopes, stats }) => {
  const dataPlot = raceSimPlot(sections, slopes, stats);
  const { racePlot } = dataPlot;

  const maxSpeed = Math.max(...racePlot.map((o) => o.speed));

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

  const chartRef = useRef(null);
  const chart = chartRef.current;
  let containerWidth;
  let graphWidth;
  let graphLeft;
  let yAxisHeight = 50;

  let timeFinished = racePlot[racePlot.length - 1].time;

  if (chart) {
    containerWidth = chart.width;
    graphWidth = chart.chartArea.width;
    graphLeft = chart.chartArea.left;
    yAxisHeight = chart.scales.y.max;
  }

  const calculatePhaseDistance = (time) => {
    const absolutePointRatio = graphWidth * (time / timeFinished);

    return absolutePointRatio;
  };

  const getPhaseChanges = [
    ...new Map(racePlot.map((item) => [item["phase"], item])).values(),
  ];

  let phaseChangeAnnotations = getPhaseChanges.map((x) => {
    return {
      type: "line",
      borderColor: "green",
      borderWidth: 1,
      label: {
        display: true,
        position: "end",
        height: 100,
      },
      scaleID: "x",
      value: x.time,
    };
  });

  let checkSection = racePlot.map((x) => {
    return {
      type: "box",
      yScaleID: "y",
      xMin: x.time - 1,
      xMax: x.time,
      yMin: 10,
      yMax: (10 + yAxisHeight) / 2,
      borderWidth: 0,
      backgroundColor:
        x.currentSection === "straight"
          ? "rgba(25, 200, 252, 0.25)"
          : "rgba(247, 94, 94, 0.25)",
    };
  });

  let checkSlope = racePlot.map((x) => {
    return {
      type: "box",
      yScaleID: "y",
      xMin: x.time - 1,
      xMax: x.time,
      yMin: (10 + yAxisHeight) / 2,
      yMax: yAxisHeight,
      borderWidth: 0,
      backgroundColor: x.existingSlope
        ? "rgba(105, 193, 12, 0.25)"
        : "transparent",
    };
  });

  const options = {
    plugins: {
      legend: true,
      annotation: {
        annotations: [
          ...checkSection,
          ...checkSlope,
          ...phaseChangeAnnotations,
        ],
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
        min: 10,
        max: 50,
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

  return (
    <>
      <div>
        {sections && (
          <EnoughStamina sections={sections} slopes={slopes} stats={stats} />
        )}
      </div>
      <h2>Race Simulation</h2>
      <div className="race-simulation-container">
        {chart && (
          <div
            className="phases-bar-container"
            style={{ width: `${graphWidth}px`, left: `${graphLeft}px` }}
          >
            {getPhaseChanges.map((phase) => (
              <div
                className="phase-seperator"
                id={`phase-seperator-${phase.phase}`}
                style={{
                  left: `${calculatePhaseDistance(phase.time) - 1.5}px `,
                }}
              />
            ))}
          </div>
        )}
        <Line options={options} data={data} ref={chartRef} />
        <span>
          Note: The graph represents a single simulation and does some shit{" "}
        </span>
      </div>
    </>
  );
};

export default TrackGraph;
