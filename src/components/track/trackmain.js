import { useEffect, useState } from "react";
import { fetchSkills } from "../CMGuide/data/fetchData";
import Coursedetails from "./coursedetails";
import Racetrack from "./courseGraph";
import SkillList from "./skillList";
import { skillCheck } from "./skills/skillDecipher";
import Loading from "../home/loading/loading";

const TrackMain = () => {
  let [skillsData, setSkills] = useState(false);
  let [selectedSkill, setSelectedSkill] = useState(false);
  let [searchShow, setShowSearch] = useState(false);

  const getSkillsData = async () => {
    setSkills(await fetchSkills());
  };

  useEffect(() => {
    getSkillsData();
  }, []);

  return (
    <div style={style}>
      <Coursedetails />
      <Racetrack skill={selectedSkill} />
      {skillsData ? (
        <SkillList
          skillsList={skillsData}
          setSelectedSkill={setSelectedSkill}
          selectedSkill={selectedSkill}
          setSearchShow={setShowSearch}
          searchShow={searchShow}
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