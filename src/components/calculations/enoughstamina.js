const { raceSimPlot } = require("./racesim");

const EnoughStamina = ({ sections, slopes, stats }) => {
  const getData = raceSimPlot(sections, slopes, stats);
  const { racePlot } = getData;

  //Check if phase2 is delayed

  return (
    <div className="enough-stamina-container">
      <button>Click me to calculate</button>
      <div className="stamina-remainder">Placeholder</div>
    </div>
  );
};

export default EnoughStamina;
