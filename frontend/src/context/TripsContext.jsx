import { createContext, useReducer } from "react";

export const TripsContext = createContext();

export const tripsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                trips: action.payload,
            };
        case "CREATE_WORKOUT":
            return {
                trips: [action.payload, ...state.trips],
            };
        case "DELETE_WORKOUT":
            return {
                trips: state.trips.filter(
                    (trip) => trip._id !== action.payload._id
                ),
            };
        case "UPDATE_WORKOUT":
            return {
                trips: state.trips.map((trip) =>
                    trip._id === action.payload._id ? action.payload : trip
                ),
            };
        default:
            return state;
    }
};

export const TripsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tripsReducer, {
        trips: null,
    });

    return (
        <TripsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TripsContext.Provider>
    );
};
