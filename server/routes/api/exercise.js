const express = require("express");
const router = express.Router();
const exercise = require("../../utils/exercise");

router.get("/search-type", async (req, res) => {
  if (!req.query.type) {
    res.send({
      error: "You must provide a exercise name",
    });
    return;
  }

  const data = await exercise.getExercise(req.query.type);
  res.send({ data });
});

module.exports = router;
