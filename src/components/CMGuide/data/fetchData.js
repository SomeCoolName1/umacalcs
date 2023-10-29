export async function fetchSkills() {
  const res = await fetch(process.env.URL + `/skills`);

  return await res.json();
}

export async function fetchCardRarityData() {
  const res = await fetch(process.env.URL + `/cardRarityData`);

  return await res.json();
}

export async function fetchSkillSet() {
  const res = await fetch(process.env.URL + `/skillSet`);

  return await res.json();
}

export async function fetchSupportCard() {
  const res = await fetch(process.env.URL + `/supportCards`);

  return await res.json();
}
