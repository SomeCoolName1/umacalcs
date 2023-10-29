async function fetchSkills() {
  const res = await fetch(process.env.URL + `/skills`);

  return await res.json();
}

async function fetchCardRarityData() {
  const res = await fetch(process.env.URL + `/cardRarityData`);

  return await res.json();
}

async function fetchSkillSet() {
  const res = await fetch(process.env.URL + `/skillSet`);

  return await res.json();
}

async function fetchSupportCard() {
  const res = await fetch(process.env.URL + `/supportCards`);

  return await res.json();
}

module.exports = {
  fetchSkills: fetchSkills,
  fetchCardRarityData: fetchCardRarityData,
  fetchSkillSet: fetchSkillSet,
  fetchSupportCard: fetchSupportCard,
};
