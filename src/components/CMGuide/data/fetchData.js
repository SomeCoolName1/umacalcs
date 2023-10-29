export async function fetchSkills() {
  const res = await fetch("https://" + process.env.VERCEL_URL + "/skills");

  return await res.json();
}

export async function fetchCardRarityData() {
  const res = await fetch(
    "https://" + process.env.VERCEL_URL + "/cardRarityData"
  );

  return await res.json();
}

export async function fetchSkillSet() {
  const res = await fetch("https://" + process.env.VERCEL_URL + "/skillSet");

  return await res.json();
}

export async function fetchSupportCard() {
  const res = await fetch(
    "https://" + process.env.VERCEL_URL + "/supportCards"
  );

  return await res.json();
}

// module.exports = {
//   fetchSkills: fetchSkills,
//   fetchCardRarityData: fetchCardRarityData,
//   fetchSkillSet: fetchSkillSet,
//   fetchSupportCard: fetchSupportCard,
// };
// export async function fetchSkills() {
//   const res = await fetch(`"https://" + process.env.VERCEL_URL + "/skills`);

//   return await res.json();
// }

// export async function fetchCardRarityData() {
//   const res = await fetch(`"https://" + process.env.VERCEL_URL + "/cardRarityData`);

//   return await res.json();
// }

// export async function fetchSkillSet() {
//   const res = await fetch(`"https://" + process.env.VERCEL_URL + "/skillSet`);

//   return await res.json();
// }

// export async function fetchSupportCard() {
//   const res = await fetch(`"https://" + process.env.VERCEL_URL + "/supportCards`);

//   return await res.json();
// }
