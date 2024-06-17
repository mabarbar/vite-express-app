import { useTripsContext } from "../hooks/useTripsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

import { FaPencilAlt } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TripDetails = ({ trip }) => {
    const { dispatch } = useTripsContext();
    const { user } = useAuthContext();
    const [destination, setDestination] = useState(trip.destination);
    const [distance, setDistance] = useState(trip.distance);
    const [cost, setCost] = useState(trip.cost);
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = async () => {
        if (!user) return;

        const response = await fetch(
            `http://localhost:4000/api/trips/${trip._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json });
        }
    };

    const handleEditClick = async () => {
        setIsVisible(!isVisible);
    };

    const handleOnSubmit = async () => {
        console.log(destination, distance, cost);
        if (!user) return;

        const response = await fetch(
            `http://localhost:4000/api/trips/${trip._id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    destination: destination,
                    distance: distance,
                    cost: cost,
                }),
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "UPDATE_WORKOUT", payload: json });
        }
    };

    return (
        <div className="trip-details">
            <h4>{trip.destination}</h4>
            <p>
                <strong>Distance (km): </strong>
                {trip.distance}
            </p>
            <p>
                <strong>Cost (PLN): </strong>
                {trip.cost}
            </p>
            <p>
                {formatDistanceToNow(new Date(trip.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
            <span className="update-button" onClick={handleEditClick}>
                <FaPencilAlt />
            </span>
            {isVisible && (
                <form className="form" onSubmit={handleOnSubmit}>
                    <label>Title</label>
                    <input
                        type="text"
                        className="edit-form"
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <label>Distance</label>
                    <input
                        type="number"
                        className="edit-form"
                        onChange={(e) => setDistance(e.target.value)}
                    />
                    <label>Cost</label>
                    <input
                        type="number"
                        className="edit-form"
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
};

export default TripDetails;
