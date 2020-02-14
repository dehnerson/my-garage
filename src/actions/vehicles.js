export const CREATE_VEHICLE_REQUEST = "CREATE_VEHICLE_REQUEST";
export const CREATE_VEHICLE_SUCCESS = "CREATE_VEHICLE_SUCCESS";
export const CREATE_VEHICLE_ERROR = "CREATE_VEHICLE_ERROR";

export const createVehicle = (vehicle) => {

    return (dispatch, _getState, { getFirebase }) => {
        const firebase = getFirebase();

        vehicle.creator = "ruCNqmmzsHTqUc3Q3I32j5FyvxL2";
        vehicle.createdOn = new Date();

        firebase.firestore().collection("vehicles").add(vehicle).then(() => {
            dispatch({ type: CREATE_VEHICLE_SUCCESS });
        }).catch((error) => {
            dispatch({ type: CREATE_VEHICLE_ERROR, error });
        })
    }
}
