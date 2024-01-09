import "./skillList.scss";
import SkillSearcher from "./factory/skillSearcher";
import { useEffect, useRef, useState } from "react";
import SkillDisplay from "./factory/skillDetailDisplay";
import { useSelector } from "react-redux";
import Loading from "../home/loading/loading";
import { allFilters } from "./data/filterTypes";

const defaultFilter = {
  rarity: [],
  condition: [],
  skill: [],
  search: "",
};

const filters = allFilters;

const SkillList = ({
  skillsList,
  setSelectedSkill,
  selectedSkill,
  setSearchShow,
  searchShow,
  triggers,
}) => {
  const [filteredSkills, setFilterList] = useState(skillsList);
  const [filterType, setFilter] = useState(defaultFilter);
  const searchPopup = useRef(null);

  const course = useSelector((state) => state.track);

  const images = importAll(
    require.context(`../../assets/skillimages`, false, /.png/)
  );

  const resetFilter = () => {
    setFilter({
      rarity: [],
      condition: [],
      skill: [],
      search: "",
    });
  };

  const updateFilterType = (e) => {
    const { value, style } = e;
    const { condition } = value;
    const { filterStyle } = style;

    let filter = { ...filterType };

    if (filterStyle === "rarity") {
      //if filter already exists
      if (filter[filterStyle].some((x) => x == condition)) {
        filter[filterStyle] = [];
        setFilter(filter);
        return;
      }

      //Other update filter
      filter[filterStyle] = condition;
      setFilter(filter);
      return;
    }

    //If already existing, removes filter
    if (filter[filterStyle].some((x) => condition.includes(x))) {
      filter[filterStyle] = filter[filterStyle].filter(
        (x) => !condition.includes(x)
      );
    }

    //Else, adds in filter
    else {
      filter[filterStyle].push(...condition);
    }

    setFilter(filter);
  };

  const filterSkills = () => {
    let filter = filterType;
    const { condition, search } = filter;

    let fullSkillList = skillsList;

    let firstFilter = conditionFilter(fullSkillList, condition);
    let secondFilter = iconFilter(firstFilter, filter);
    let thirdFilter = searchFilter(secondFilter, search);

    setFilterList(thirdFilter);
  };

  useEffect(() => {
    filterSkills();
  }, [filterType]);

  const checkConditionForCSS = (condition, type) => {
    let group = filterType[type];

    if (group.length === 0 || condition.every((x) => x && group.includes(x)))
      return "active";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="race-track-skill-container">
      <h2>
        Skill Checker{" "}
        <p style={{ color: "red" }}>
          - Some Skills do not display precondition
        </p>
      </h2>

      <div
        className="race-track-skill-search-button"
        onClick={() => setSearchShow(true)}
        ref={searchPopup}
      >
        <h3>Search Skill</h3>
      </div>
      {selectedSkill && (
        <SkillDisplay
          skill={selectedSkill}
          course={course}
          triggers={triggers}
        />
      )}

      <div
        className={`race-track-skill-search-container search-show-${searchShow}`}
      >
        <div className="race-track-skill-filter-header">
          <h3
            className="race-track-skill-filter-close"
            onClick={() => resetFilter()}
          >
            Reset
          </h3>
          <h3 className="race-track-skill-filter-title">Skill List</h3>
          <h3
            className="race-track-skill-filter-close"
            onClick={() => setSearchShow(false)}
          >
            Close
          </h3>
        </div>
        <div className="race-track-skill-search-box-container">
          <input
            type="text"
            placeholder="Search Skill"
            name="search"
            autocomplete="off"
            value={filterType.search}
            onChange={handleChange}
          />
        </div>
        <div className="race-track-skill-filter-container">
          {filters.map((group) => (
            <div
              className={`race-track-skill-filter-${group.name} race-track-skill-filter`}
            >
              {group["group"].map((x) => (
                <div
                  className={`race-track-skill-filter-button race-track-skill-filter-button-${checkConditionForCSS(
                    x.condition,
                    group.filterStyle
                  )} `}
                  onClick={() => updateFilterType({ value: x, style: group })}
                >
                  {x.img ? <img src={x.img} alt="icon" /> : <div>{x.name}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={`race-track-skill-search-list`}>
          {filteredSkills ? (
            filteredSkills.map((skill) => (
              <SkillSearcher
                skills={skill}
                image={images[`icon_skill_${skill.icon_id}.png`]}
                setSelectedSkill={setSelectedSkill}
                setSearchShow={setSearchShow}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

const iconFilter = (list, filter) => {
  let { rarity, skill } = filter;
  let array = list;

  if (rarity.some((x) => x == 9)) {
    //If inherited skills was selected, seperate condition
    //Extract the 9 and then filter
    rarity = rarity.filter((x) => x !== 9);
    array = array.filter((x) => x.skill_id.toString()[0] == 9);
  }

  if (skill.length !== 0) {
    array = array.filter((x) => skill.includes(x.icon_id));
  }

  if (rarity.length !== 0) {
    array = array.filter((x) => rarity.includes(x.icon_id % 10));
  }

  return array;
};

const conditionFilter = (list, filter) => {
  if (filter.length === 0) return list;

  let output = list.filter((skill) =>
    skill.condition_1
      ? filter.some((x) => skill.condition_1.includes(x))
      : false && skill.condition_2
      ? filter.some((x) => skill.condition_2.includes(x))
      : false
  );

  return output;
};

const searchFilter = (list, filter) => {
  if (!filter) return list;

  let lowerCase = filter.toLowerCase();

  let output = list.filter(
    (skill) =>
      (skill.skill_name &&
        skill.skill_name.toLowerCase().includes(lowerCase)) ||
      (skill.skill_name_english &&
        skill.skill_name_english.toLowerCase().includes(lowerCase))
  );

  return output;
};

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
};

export default SkillList;
