import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.REACT_APP_SUPERBASE_URL;
const supabaseKey = process.env.REACT_APP_SUPERBASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchSkills() {
  const { data, error } = await supabase
    .from("vw_condensed_skill_data_info")
    .select();

  if (error) {
    console.log(error);
  }
  if (data) {
    return data;
  }
  // const res = await fetch(
  //   // "http://" + process.env.REACT_APP_VERCEL_URL + "/skills"
  //   // `https://www.tracenacademy.com/api/CondensedSkillDataInfo`
  // );

  // return await res.json();
}

export async function fetchCardRarityData() {
  const { data, error } = await supabase.from("card_rarity_data").select();

  if (error) {
    console.log(error);
  }
  if (data) {
    return data;
  }
  // const res = await fetch(
  //   // "http://" + process.env.REACT_APP_VERCEL_URL + "/cardRarityData"
  //   `https://www.tracenacademy.com/api/CardRarityData`
  // );

  // return await res.json();
}

export async function fetchSkillSet() {
  const { data, error } = await supabase.from("skill_set").select();

  if (error) {
    console.log(error);
  }
  if (data) {
    return data;
  }
  // const res = await fetch(
  //   // "http://" + process.env.REACT_APP_VERCEL_URL + "/skillSet"
  //   `https://www.tracenacademy.com/api/SkillSet`
  // );

  // return await res.json();
}

export async function fetchSupportCard() {
  const { data, error } = await supabase
    .from("vw_basic_support_card_data_info")
    .select();

  if (error) {
    console.log(error);
  }
  if (data) {
    return data;
  }
  // const res = await fetch(
  //   // "http://" + process.env.REACT_APP_VERCEL_URL + "/supportCards"
  //   `https://www.tracenacademy.com/api/BasicSupportCardDataInfo`
  // );

  // return await res.json();
}

// module.exports = {
//   fetchSkills: fetchSkills,
//   fetchCardRarityData: fetchCardRarityData,
//   fetchSkillSet: fetchSkillSet,
//   fetchSupportCard: fetchSupportCard,
// };
// export async function fetchSkills() {
//   const res = await fetch(`"http://" + process.env.REACT_APP_VERCEL_URL + "/skills`);

//   return await res.json();
// }

// export async function fetchCardRarityData() {
//   const res = await fetch(`"http://" + process.env.REACT_APP_VERCEL_URL + "/cardRarityData`);

//   return await res.json();
// }

// export async function fetchSkillSet() {
//   const res = await fetch(`"http://" + process.env.REACT_APP_VERCEL_URL + "/skillSet`);

//   return await res.json();
// }

// export async function fetchSupportCard() {
//   const res = await fetch(`"http://" + process.env.REACT_APP_VERCEL_URL + "/supportCards`);

//   return await res.json();
// }
