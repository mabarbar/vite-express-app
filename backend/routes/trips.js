const express = require("express");
const {
    createTrip,
    deleteTrip,
    getTrips,
    getTrip,
    updateTrip,
} = require("../controllers/tripController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all routes
const router = express.Router();

router.use(requireAuth);

router.get("/", getTrips);

router.get("/:id", getTrip);

router.post("/", createTrip);

router.delete("/:id", deleteTrip);

router.patch("/:id", updateTrip);

module.exports = router;
