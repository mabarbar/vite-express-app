const express = require("express");
const {
    createWorkout,
    deleteWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all routes
const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
