export const SET_MAINTENANCE_WORK_REQUEST = "SET_MAINTENANCE_WORK_REQUEST";
export const SET_MAINTENANCE_WORK_SUCCESS = "SET_MAINTENANCE_WORK_SUCCESS";
export const SET_MAINTENANCE_WORK_ERROR = "SET_MAINTENANCE_WORK_ERROR";


export const setMaintenanceWork = (vehicleID, maintenanceWork) => {

    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: SET_MAINTENANCE_WORK_REQUEST });

        const fb = getFirebase();

        let promise;

        if (maintenanceWork.id) {
            promise = fb.firestore().collection("vehicles").doc(vehicleID).collection("maintenanceWork").doc(maintenanceWork.id).set(maintenanceWork);
        } else {
            maintenanceWork.creator = fb.auth().currentUser.uid;
            maintenanceWork.createdOn = new Date();

            promise = fb.firestore().collection("vehicles").doc(vehicleID).collection("maintenanceWork").add(maintenanceWork);
        }

        promise.then(() => dispatch({ type: SET_MAINTENANCE_WORK_SUCCESS }))
            .catch((error) => dispatch({ type: SET_MAINTENANCE_WORK_ERROR, error }));
    }
}