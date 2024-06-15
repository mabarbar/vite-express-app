import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

import { FaPencilAlt } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [title, setTitle] = useState(workout.title);
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = async () => {
        if (!user) return;

        const response = await fetch(
            `http://localhost:4000/api/workouts/${workout._id}`,
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
        console.log(title, load, reps);
        if (!user) return;

        const response = await fetch(
            `http://localhost:4000/api/workouts/${workout._id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    load: load,
                    reps: reps,
                }),
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "UPDATE_WORKOUT", payload: json });
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p>
                <strong>Load (kg): </strong>
                {workout.load}
            </p>
            <p>
                <strong>Number of reps: </strong>
                {workout.reps}
            </p>
            <p>
                {formatDistanceToNow(new Date(workout.createdAt), {
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
                <form onSubmit={handleOnSubmit}>
                    <label>Title</label>
                    <input
                        type="text"
                        className="edit-form"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Load</label>
                    <input
                        type="number"
                        className="edit-form"
                        onChange={(e) => setLoad(e.target.value)}
                    />
                    <label>Reps</label>
                    <input
                        type="number"
                        className="edit-form"
                        onChange={(e) => setReps(e.target.value)}
                    />
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
};

export default WorkoutDetails;
