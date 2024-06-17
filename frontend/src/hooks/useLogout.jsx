import { useAuthContext } from "./useAuthContext";
import { useTripsContext } from "./useTripsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: tripsDispatch } = useTripsContext();
    const logout = async () => {
        // remove user from local storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
        tripsDispatch({ type: "SET_WORKOUTS", payload: null });
    };

    return { logout };
};
