import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TrackGraph from "./trackgraph";
import "./racetrack.scss";
import Loading from "../loading/loading";

const Racetrack = ({ stats }) => {
  const track = useSelector((state) => state.track);
  const [trackSpurt, setTrackSpurt] = useState(null);
  const [orderedSections, setSectionOrder] = useState(null);
  const [orderedSlopes, setSlopeOrder] = useState(null);
  const [showType, setShowType] = useState("type");

  useEffect(() => {
    if (!track) return;
    sortCornersStraight();
    sortSlopes();
  }, [track]);

  const { corners, straights, slopes, distance, threshold } = track;

  const racePhases = [
    { phase: "Opening Leg", start: 0, end: Math.round(distance / 6) },
    {
      phase: "Middle Leg",
      start: Math.round(distance / 6),
      end: Math.round((2 * distance) / 3),
    },
    {
      phase: "Final Leg",
      start: Math.round((2 * distance) / 3),
      end: Math.round((5 * distance) / 6),
    },
    {
      phase: "Last Spurt",
      start: Math.round((5 * distance) / 6),
      end: distance,
    },
  ];

  const lastSpurtDistance = distance - distance / 3;

  const sortCornersStraight = () => {
    let array = [];

    if (corners) {
      corners.map((corner) => {
        return array.push({
          type: "corner",
          distance: [corner.start, corner.start + corner.length],
        });
      });
    }
    if (straights) {
      straights.map((straight) => {
        return array.push({
          type: "straight",
          distance: [straight.start, straight.end],
        });
      });
    }

    array.sort(function (a, b) {
      return a.distance[0] - b.distance[0];
    });

    setSectionOrder(array);

    // {corner.start + corner.length}m
    // {straight.start}m - {straight.end}m

    for (let i = 0; i < array.length; i++) {
      if (
        array[i].distance[0] <= lastSpurtDistance &&
        lastSpurtDistance <= array[i].distance[1]
      ) {
        setTrackSpurt({
          spurt: array[i],
          before: i < array.length ? array[i + 1] : "",
          after: i > 0 ? array[i - 1] : "",
        });
      }
    }
  };

  const sortSlopes = () => {
    if (slopes.length === 0) {
      return;
    }

    let array = [...slopes];

    array.sort(function (a, b) {
      return a.start - b.start;
    });

    setSlopeOrder(array);
  };

  ////////Track chart labels
  let trackChartLabels = [];

  for (let i = 0; i <= 6; i++) {
    trackChartLabels.push(Math.round((i * distance) / 6, 1));
  }

  //Track chart slope
  const getSlopeChart = () => {
    let slopeArray = [];
    let slopeStart = 50;
    let slopeEnd = 50;
    let currentSlope = [0, 0, 0];
    let currentDistance = 0;
    let nextDistance = distance;
    let slopeHeight = [];

    if (slopes.length !== 0) {
      for (let i = 0; i < slopes.length; i++) {
        currentSlope = Object.values(slopes[i]);
        nextDistance = currentSlope[0]; //Start of slope

        //Iteration does before slope, then does the slope
        if (currentDistance === nextDistance) break;

        slopeArray.push(
          createSlope(
            slopeStart,
            slopeEnd,
            nextDistance,
            currentDistance,
            currentSlope[2]
          )
        );

        currentDistance = nextDistance;
        nextDistance = currentDistance + currentSlope[1];

        //Iteration for slope
        slopeEnd -=
          ((nextDistance - currentDistance) / 100) * (currentSlope[2] / 2500); //Adds slope/gradient

        slopeHeight.push(
          ((currentSlope[2] / 10000) * (nextDistance - currentDistance)) / 100
        );

        slopeArray.push(
          createSlope(
            slopeStart,
            slopeEnd,
            nextDistance,
            currentDistance,
            currentSlope[2]
          )
        );

        slopeHeight.push(
          (currentSlope[2] / 10000) * ((nextDistance - currentDistance) / 100)
        );

        currentDistance = nextDistance;

        slopeStart = slopeEnd;
      }
    }

    if (currentDistance !== distance) {
      nextDistance = distance;
      slopeArray.push(
        createSlope(
          slopeStart,
          slopeEnd,
          nextDistance,
          currentDistance,
          currentSlope[2]
        )
      );
    }

    console.log(slopeHeight);

    return slopeArray;
  };

  console.log(track);

  const getTrackDistance = (type) => {
    if (2 == type) return "Mile マイル";
    if (3 == type) return "Medium 中距離";
    if (4 == type) return "Long 長距離";
    else return "Short 短距離";

    // if ((1500 <= length) & (length < 1900)) return "Mile マイル";
    // if ((1900 <= length) & (length < 2500)) return "Medium 中距離";
    // if (2500 <= length) return "Long 長距離";
    // else return "Short 短距離";
  };

  const createSlope = (slopeStart, slopeEnd, nextDis, curDis, slope) => {
    return (
      <div
        className="track-chart-slope-section"
        style={{
          width: `${((nextDis - curDis) / distance) * 100}%`,
        }}
      >
        <div
          className="track-chart-slope-graph"
          style={{
            clipPath: `polygon(0 ${slopeStart}%, 100% ${slopeEnd}%, 100% 100%, 0% 100%)`,
          }}
        />
        <div className="track-chart-slope-value">
          {slopeStart !== slopeEnd ? slope / 10000 : 0}%
        </div>

        {curDis !== 0 ? (
          <span className="track-chart-slope-start track-chart-value">
            {curDis}
          </span>
        ) : (
          ""
        )}

        {nextDis !== distance ? (
          <span className="track-chart-slope-end track-chart-value">
            {nextDis}
          </span>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className="track-container">
      <h2 className="track-header">
        Track Breakdown
        <div className="track-sort-container">
          <button
            className={`track-button ${
              showType === "type" ? "show-active" : ""
            }`}
            onClick={() => setShowType("type")}
          >
            Sort by Type
          </button>
          <button
            className={`track-button ${
              showType === "order" ? "show-active" : ""
            }`}
            onClick={() => setShowType("order")}
          >
            Sort by Order
          </button>
        </div>
      </h2>
      <div className="track-chart-container">
        <div className="track-chart-phase-container">
          {racePhases.map((phases) => {
            return (
              <div
                className={`track-chart-phase`}
                style={{
                  width: `${((phases.end - phases.start) / distance) * 100}%`,
                }}
              >
                <span>{phases.phase}</span>
                <span className="track-chart-phase-value">
                  {phases.start}m - {phases.end}m
                </span>
              </div>
            );
          })}
        </div>
        <div className="track-chart-slope-container">
          {getSlopeChart()}
          <div className="track-chart-slope-heights"></div>
        </div>
        <div className="track-chart-section-container">
          {orderedSections &&
            orderedSections.map((section) => (
              <div
                className={`track-chart-section`}
                style={{
                  width: `${
                    ((section.distance[1] - section.distance[0]) / distance) *
                    100
                  }%`,
                  left: `${section.distance[0] / distance}`,
                }}
              >
                <div
                  className={`track-chart-section-bg track-chart-section-${section.type}`}
                />
                {section.distance[0] !== 0 ? (
                  <span className="track-chart-section-value track-chart-value">
                    {section.distance[0]}
                  </span>
                ) : (
                  ""
                )}
                <div className="track-chart-label">
                  <span>{section.type}</span>
                </div>
              </div>
            ))}
        </div>
        <div className="track-chart-others-container">
          <div className="track-chart-position-keep track-chart-other">
            <div className="track-chart-other-bg track-chart-keep-bg" />
            <div className="track-chart-label">
              <span className="track-chart-keep-value track-chart-value">
                {Math.round((distance * 5) / 12)}
              </span>
              <span>Position Keep</span>
            </div>
          </div>
          <div className="track-chart-remaining track-chart-other" />
          <div className="track-chart-spurt track-chart-other">
            <div className="track-chart-other-bg track-chart-spurt-bg" />
            <div className="track-chart-label track-chart-spurt-label">
              <span className="track-chart-spurt-value track-chart-value">
                {Math.round((distance * 8) / 12)}
              </span>
              <span>Spurt </span>{" "}
              <span>
                {distance - Math.round((distance * 8) / 12)}m remaining
              </span>
            </div>
          </div>
        </div>
        <div className="track-chart-x-axis">
          <div className="track-chart-xAxis-bar">
            <div className="track-chart-xAxis-bar-line" />
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />{" "}
            <div className="track-chart-xAxis-bar-line" />
          </div>
        </div>
        <div className="track-chart-xAxis-labels">
          {trackChartLabels.map((value) => (
            <div className="track-chart-xAxis-label">
              <div className="track-chart-xAxis-value">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="track-breakdown-container">
        <div
          className={`section-container ${
            showType === "order" ? "section-order" : "section-type"
          }`}
        >
          {showType === "order" ? (
            <>
              <p className="section-title">Racetrack</p>
              <div className="sections">
                {orderedSections &&
                  orderedSections.map((section) => (
                    <div className={`${section.type}`}>
                      <p>
                        {section === trackSpurt.spurt ? "spurt on " : ""}
                        {section.type}: {section.distance[0]}m -{" "}
                        {section.distance[1]}m
                      </p>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="race-corners">
                <span>
                  <p className="section-title">Corners</p>
                  {corners.map((corner, index) => (
                    <div className="corner">
                      {corner.start}m -{corner.start + corner.length}m
                    </div>
                  ))}
                </span>
              </div>
              <div className="race-straights">
                <span>
                  <p className="section-title">Straights</p>
                  {straights.map((straight, index) => (
                    <div className="straight">
                      {straight.start}m - {straight.end}m{" "}
                    </div>
                  ))}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="race-slopes">
          <span>
            <p className="section-title">Slopes</p>
            {orderedSlopes ? (
              orderedSlopes.map((slope, index) => (
                <div className="slope">
                  {slope.start}m - {slope.start + slope.length}m
                  {slope.slope > 0 ? (
                    <> (↑{Math.abs(slope.slope / 10000)})</>
                  ) : (
                    <> (↓{Math.abs(slope.slope / 10000)})</>
                  )}
                </div>
              ))
            ) : (
              <p>No Slopes</p>
            )}
          </span>
        </div>
        <div className="race-track-details">
          <span>
            <p className="thresholds-title section-title">Details</p>

            <div className="details-container">
              Threshold:{" "}
              {threshold && threshold.length > 0
                ? threshold.map((stat) => <p>{stat}</p>)
                : "No thresholds"}
            </div>
            <div className="details-container">
              Distance: {getTrackDistance(track.distanceType)}
            </div>
            <div className="details-container">Track Course: {track.name}</div>
            <div className="details-container">
              Turn:{" "}
              {track.turn === 1
                ? "右回り - Clockwise"
                : "左回り - Counterclockwise"}
            </div>
          </span>
        </div>
      </div>
      {/* {orderedSections ? (
        <TrackGraph
          sections={orderedSections}
          slopes={orderedSlopes}
          stats={stats}
        />
      ) : (
        <Loading />
      )} */}
    </div>
  );
};

export default Racetrack;
