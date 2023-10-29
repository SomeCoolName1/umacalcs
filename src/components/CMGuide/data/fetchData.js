async function fetchSkills() {
  const res = await fetch(`http://localhost:8000/skills`);

  return await res.json();
}

async function fetchCardRarityData() {
  const res = await fetch(`http://localhost:8000/cardRarityData`);

  return await res.json();
}

async function fetchSkillSet() {
  const res = await fetch(`http://localhost:8000/skillSet`);

  return await res.json();
}

async function fetchSupportCard() {
  const res = await fetch(`http://localhost:8000/supportCards`);

  return await res.json();
}

module.exports = {
  fetchSkills: fetchSkills,
  fetchCardRarityData: fetchCardRarityData,
  fetchSkillSet: fetchSkillSet,
  fetchSupportCard: fetchSupportCard,
};
