import { useState } from "react";
import { useTripsContext } from "../hooks/useTripsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TripForm = () => {
    const { dispatch } = useTripsContext();
    const { user } = useAuthContext();

    const [destination, setDestination] = useState("");
    const [distance, setDistance] = useState("");
    const [cost, setCost] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in to add a trip");
            return;
        }

        const trip = { destination, distance, cost };

        const response = await fetch("http://localhost:4000/api/trips", {
            method: "POST",
            body: JSON.stringify(trip),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setDestination("");
            setDistance("");
            setCost("");
            setError(null);
            setEmptyFields([]);
            dispatch({ type: "CREATE_WORKOUT", payload: json });
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3>Add a New Destination</h3>

            <label>Where do you want to travel:</label>
            <input
                type="text"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                className={emptyFields.includes("destination") ? "error" : ""}
            />

            <label>How far is it (km):</label>
            <input
                type="number"
                onChange={(e) => setDistance(e.target.value)}
                value={distance}
                className={emptyFields.includes("distance") ? "error" : ""}
            />

            <label>How much money does it cost (PLN):</label>
            <input
                type="number"
                onChange={(e) => setCost(e.target.value)}
                value={cost}
                className={emptyFields.includes("cost") ? "error" : ""}
            />

            <button>Add to Bucket List</button>
            {error && <div className="error">{`${error}`}</div>}
        </form>
    );
};

export default TripForm;
