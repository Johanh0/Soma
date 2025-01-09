const express = require("express");
const router = express.Router();
const exerciseFetch = require("../../utils/exercise");

router.get("/workouts", async (req, res) => {
  try {
    const data = await exerciseFetch.getExercises();
    res.send({ data });
  } catch {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

router.get("/filter", async (req, res) => {
  const exercise = req.query.exercise;
  const target = req.query.target;
  if (!exercise && !target) {
    res.send({
      error: "You must provide a exercise and a target name",
    });
    return;
  }

  let data = {};
  try {
    const exerciseData = await exerciseFetch.getBodyExercise(exercise);

    data.exercise = exerciseData;
  } catch {
    res.status(500).send({
      message: "Something went wrong",
    });
  }

  try {
    const targetData = await exerciseFetch.getTargetExercise(target);
    data.target = targetData;
  } catch {
    res.status(500).send({
      message: "Something went wrong",
    });
  }

  res.send(data);
});

module.exports = router;
