const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const { getTypes } = require("./controllers");
const router = Router();


router.get("/", async (req, res, next) => {
  let types = await getTypes();
  res.status(200).send(types);
});

module.exports = router;