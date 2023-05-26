import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TrackGraph from "./trackgraph";
import "./racetrack.scss";
import Loading from "../loading/loading";

const Racetrack = ({ stats }) => {
  const track = useSelector((state) => state.track);
  const [slopeSpurt, setSlopeSpurt] = useState(null);
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

    for (let i = 0; i < array.length - 1; i++) {
      let slopeStart = array[i].start;
      let slopeEnd = slopeStart + array[i].length;

      if (lastSpurtDistance >= slopeStart && lastSpurtDistance <= slopeEnd) {
        setSlopeSpurt({ slopeSpurt: array[i], slopeIndex: i });
      }
    }
  };

  let spurt;
  let after;
  let before;
  let slopeIndex;

  if (trackSpurt) {
    spurt = trackSpurt.spurt;
    after = trackSpurt.after;
    before = trackSpurt.before;
  }

  if (slopeSpurt) {
    slopeIndex = slopeSpurt.slopeIndex;
  }

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
                  orderedSections.map((section, index) => (
                    <div className={`${section.type}`}>
                      <p>
                        ({index + 1}):{" "}
                        {section === trackSpurt.spurt ? "spurt on " : ""}
                        {section.type}
                      </p>
                      {section.distance[0]}m - {section.distance[1]}m
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
                      ({index + 1}): {corner.start}m -{" "}
                      {corner.start + corner.length}m
                    </div>
                  ))}
                </span>
              </div>
              <div className="race-straights">
                <span>
                  <p className="section-title">Straights</p>
                  {straights.map((straight, index) => (
                    <div className="straight">
                      ({index + 1}): {straight.start}m - {straight.end}m{" "}
                    </div>
                  ))}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="slopes-spurt-container">
          <div className="race-slopes">
            <span>
              <p className="section-title">Slopes</p>
              {orderedSlopes ? (
                orderedSlopes.map((slope, index) => (
                  <div className="slope">
                    ({index + 1}): {slope.start}m - {slope.start + slope.length}
                    m
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
          <div className="spurt-details">
            <p className="section-title">Spurt</p>
            {trackSpurt && (
              <>
                <p>
                  Occurs at {lastSpurtDistance.toFixed(2)}m on a {spurt.type}{" "}
                  while:
                </p>
                {after ? (
                  <p>
                    - {(lastSpurtDistance - after.distance[0]).toFixed(2)}m
                    before the next {after.type}
                  </p>
                ) : (
                  ""
                )}
                {before ? (
                  <p>
                    - {(before.distance[1] - lastSpurtDistance).toFixed(2)}m
                    after the end of {before.type}
                  </p>
                ) : (
                  ""
                )}
                <p>
                  {slopeSpurt ? "" : "No slopes at spurt point"}
                  {/* // <> uphill (↑{Math.abs(slopeSpurt.slope / 10000)})</>
                // ) : ( //{" "}
                <> downhill (↓{Math.abs(slopeSpurt.slope / 10000)})</>
                // )} // slope ({slopeIndex + 1}) */}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="lower-race-track-container">
        <div className="race-phase-container">
          <span>
            <p className="section-title">Race Phases</p>
            <div className="race-phase">
              {racePhases &&
                racePhases.map((phase) => (
                  <div className="race-phase-details">
                    <p>{phase.phase}</p>
                    <p>
                      {phase.start}m - {phase.end}m
                    </p>
                  </div>
                ))}
            </div>
          </span>
        </div>
        <div className="race-track-thresholds">
          <span>
            <p className="thresholds-title section-title">Thresholds</p>
            <div className="thresholds-container">
              {threshold && threshold.length > 0
                ? threshold.map((stat) => (
                    <div className="thresholds-stat">
                      <p>{stat}</p>
                    </div>
                  ))
                : "No thresholds"}
            </div>
          </span>
        </div>
      </div>
      {orderedSections ? (
        <TrackGraph
          sections={orderedSections}
          slopes={orderedSlopes}
          stats={stats}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Racetrack;
