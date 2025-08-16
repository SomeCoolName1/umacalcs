import { useEffect, useState } from "react";
import { fetchSkills } from "../../game_data/fetchAllData";
import Coursedetails from "./coursedetails";
import Racetrack from "./courseGraph";
import SkillList from "./skillList";
import Loading from "../../loading/loading";

const TrackMain = () => {
  let [skillsData, setSkills] = useState(false);
  let [selectedSkill, setSelectedSkill] = useState(false);
  let [searchShow, setShowSearch] = useState(false);
  let [triggers, setTriggers] = useState(false);

  const getSkillsData = async () => {
    setSkills(await fetchSkills());
  };

  useEffect(() => {
    getSkillsData();
        
  }, []);

  return (
    <div style={style}>
      <Coursedetails />
      <Racetrack skill={selectedSkill} setTriggers={setTriggers} />
      {skillsData ? (
        <SkillList
          skillsList={skillsData}
          setSelectedSkill={setSelectedSkill}
          selectedSkill={selectedSkill}
          setSearchShow={setShowSearch}
          searchShow={searchShow}
          triggers={triggers}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

const style = {
  width: `90%`,
  margin: `0 auto`,
  minWidth: `1300px`,
};

export default TrackMain;
