export async function fetchSkills() {
  const res = await fetch(`${process.env.REACT_APP_URL}/skills`);

  return await res.json();
}

export async function fetchCardRarityData() {
  const res = await fetch(`${process.env.REACT_APP_URL}/cardRarityData`);

  return await res.json();
}

export async function fetchSkillSet() {
  const res = await fetch(`${process.env.REACT_APP_URL}/skillSet`);

  return await res.json();
}

export async function fetchSupportCard() {
  const res = await fetch(`${process.env.REACT_APP_URL}/supportCards`);

  return await res.json();
}

// module.exports = {
//   fetchSkills: fetchSkills,
//   fetchCardRarityData: fetchCardRarityData,
//   fetchSkillSet: fetchSkillSet,
//   fetchSupportCard: fetchSupportCard,
// };
