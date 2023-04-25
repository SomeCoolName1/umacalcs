import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDistance, setGround, setTrack } from "../../state/userSlice";
import "./coursedetails.scss";
const racetracks = require("../data/trackinfo.json");

const Coursedetails = () => {
  const dispatch = useDispatch();
  const [trackList, setTrackList] = useState(racetracks[10001].courses);

  const raceTrackSelect = async (e) => {
    let selected = e.target.value;
    setTrackList(racetracks[selected].courses);
  };

  const raceCourseSelect = (e) => {
    console.log("Obtain TrackList", trackList);
    let index = e ? e.target.value : 0;
    let getTrack = Object.values(trackList)[index];

    dispatch(setTrack({ track: getTrack }));
  };

  const groundSelect = (e) => {
    dispatch(setGround({ ground: e.target.value }));
  };

  useEffect(() => {
    //Set Track on load
    //Sapporo 1200 Turf default
    dispatch(setTrack({ track: Object.values(racetracks[10001])[1][10101] }));
  }, []);

  useEffect(() => {
    //Once a trackcourse is changed, default to first track distance
    raceCourseSelect(null);
  }, [trackList]);

  return (
    <>
      <h1>Track Details</h1>
      <div className="course-details-container">
        <div className="course-racetrack-container race-type">
          <label for="course-racetrack" className="uma-label label">
            <span className="jp-label">レース場</span>
            <span className="en-label">Racetrack</span>
          </label>
          <select
            className="course-details"
            name="course-racetrack"
            onChange={(e) => raceTrackSelect(e)}
          >
            <option value="10001">Sapporo (札幌)</option>
            <option value="10002">Hakodate (函館)</option>
            <option value="10003">Niigata (新潟)</option>
            <option value="10004">Fukushima (福島)</option>
            <option value="10005">Nakayama (中山)</option>
            <option value="10006">Tokyo (東京)</option>
            <option value="10007">Chukyo (中京)</option>
            <option value="10008">Kyoto (京都)</option>
            <option value="10009">Hanshin (阪神)</option>
            <option value="10010">Kokura (小倉)</option>
            <option value="10101">Ooi (大井)</option>
            <option value="10103">Kawasaki (川崎)</option>
            <option value="10104">Funabashi (船橋)</option>
            <option value="10105">Morioka (盛岡)</option>
          </select>
        </div>
        <div className="course-distance-container race-type">
          <label for="course-distance" className="uma-label label">
            <span className="jp-label">コース</span>
            <span className="en-label">Distance</span>
          </label>
          <select
            className="course-details"
            name="course-distance"
            onChange={(e) => raceCourseSelect(e)}
          >
            {trackList
              ? Object.values(trackList).map((track, index) => (
                  <option value={index} key={index}>
                    {track.surface === 1 ? "芝 " : `ダート `}
                    {track.distance}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className="ground-condition-container race-type">
          <label for="ground-condition" className="uma-label label">
            <span className="jp-label">Condition</span>
            <span className="en-label">Ground</span>
          </label>
          <select
            className="ground-details"
            name="ground-condition"
            onChange={(e) => groundSelect(e)}
          >
            <option value="良">良</option>
            <option value="稍重">稍重</option>
            <option value="重">重</option>
            <option value="不良">不良</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Coursedetails;

//API COLLECT COURSES
// const trackCourseSelect = async (e) => {
//   const res = await fetch(`https://www.tracenacademy.com/api/RaceCourseSet`, {
//     method: "GET",
//   });
//   const data = await res.json();

//   let filter = data.filter((track) => track.raceTrackId == e.target.value);
//   console.log(filter);
//   setTrackList(filter);
// };
