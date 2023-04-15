import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TrackGraph from "./trackgraph";
import "./racetrack.scss";

const Racetrack = () => {
  const track = useSelector((state) => state.track);
  const [slopeSpurt, setSlopeSpurt] = useState(null);
  const [trackSpurt, setTrackSpurt] = useState(null);

  useEffect(() => {
    if (!track) return;
    sortCornersStraight();
    sortSlopes();
  }, [track]);

  if (!track) return;

  const { corners, straights, slopes, distance } = track;

  const lastSpurtDistance = distance - distance / 3;

  const sortCornersStraight = () => {
    let array = [];
    if (corners) {
      corners.map((corner) => {
        return array.push({ type: "corner", distance: corner.start });
      });
    }
    if (straights) {
      straights.map((straight) => {
        return array.push({ type: "straight", distance: straight.start });
      });
    }

    array.sort(function (a, b) {
      return a.distance - b.distance;
    });

    // // {corner.start + corner.length}m
    // // {straight.start}m - {straight.end}m

    for (let i = 0; i <= array.length - 1; i++) {
      if (
        array[i].distance <= lastSpurtDistance &&
        lastSpurtDistance <= array[i + 1].distance
      ) {
        setTrackSpurt({
          spurt: array[i],
          before: i <= array.length - 1 ? array[i + 1] : "",
          after: i > 0 ? array[i - 1] : "",
        });
      }
    }
    return;
  };

  const sortSlopes = () => {
    if (slopes.length === 0) {
      console.log("none");
      return;
    }

    let array = [...slopes];

    console.log(slopes);

    array.sort(function (a, b) {
      return a.start - b.start;
    });

    console.log(array);

    for (let i = 0; i < array.length - 1; i++) {
      let slopeStart = array[i].start;
      let slopeEnd = slopeStart + array[i].length;

      if (lastSpurtDistance >= slopeStart && lastSpurtDistance <= slopeEnd) {
        setSlopeSpurt({ slopeSpurt: array[i], slopeIndex: i });
      }
    }
  };

  if (!distance) return;

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

    console.log(slopeSpurt);
  }

  return (
    <div className="race-track-container">
      <div className="race-track-details">
        <div className="race-corners">
          <span>
            Corners:
            {corners.map((corner, index) => {
              return (
                <div className="corner">
                  ({index + 1}): {corner.start}m -{" "}
                  {corner.start + corner.length}m
                </div>
              );
            })}
          </span>
        </div>
        <div className="race-straights">
          Straight:
          {straights.map((straight, index) => {
            return (
              <div className="straight">
                ({index + 1}): {straight.start}m - {straight.end}m{" "}
              </div>
            );
          })}
        </div>
        <div className="race-slopes">
          Slopes:
          {slopes ? (
            slopes.map((slope, index) => {
              return (
                <div className="slope">
                  ({index + 1}): {slope.start}m - {slope.start + slope.length}m
                  {slope.slope > 0 ? (
                    <> (↑{Math.abs(slope.slope / 10000)})</>
                  ) : (
                    <> (↓{Math.abs(slope.slope / 10000)})</>
                  )}
                </div>
              );
            })
          ) : (
            <>No Slopes</>
          )}
        </div>
        <div className="spurt-details">
          {trackSpurt ? (
            <>
              <p>Spurts occurs on a {spurt.type} while:</p>
              <p>
                - {spurt.distance - after.distance}m before next {after.type}
              </p>
              <p>
                - {before.distance - spurt.distance}m after {before.type}
              </p>
              <p>
                {slopeSpurt ? {} : "No slopes at spurt point"}
                {/* // <> uphill (↑{Math.abs(slopeSpurt.slope / 10000)})</>
                // ) : ( //{" "}
                <> downhill (↓{Math.abs(slopeSpurt.slope / 10000)})</>
                // )} // slope ({slopeIndex + 1}) */}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <TrackGraph /> */}
    </div>
  );
};

export default Racetrack;

{
}
