const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/skills", async (req, res) => {
  try {
    const result = await db.pool.query(
      "select * from vw_condensed_skill_data_info"
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/supportCards", async (req, res) => {
  try {
    const result = await db.pool.query(
      "select * from vw_basic_support_card_data_info"
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/cardRarityData", async (req, res) => {
  try {
    const result = await db.pool.query("select * from card_rarity_data");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

//Get inherits from cardData skillset id
app.get("/skillSet", async (req, res) => {
  try {
    const result = await db.pool.query("select * from skill_set");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
