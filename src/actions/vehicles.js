export const CREATE_VEHICLE_REQUEST = "CREATE_VEHICLE_REQUEST";
export const CREATE_VEHICLE_SUCCESS = "CREATE_VEHICLE_SUCCESS";
export const CREATE_VEHICLE_ERROR = "CREATE_VEHICLE_ERROR";

export const SET_VEHICLE_IMAGE_REQUEST = "SET_VEHICLE_IMAGE_REQUEST";
export const SET_VEHICLE_IMAGE_SUCCESS = "SET_VEHICLE_IMAGE_SUCCESS";
export const SET_VEHICLE_IMAGE_ERROR = "SET_VEHICLE_IMAGE_ERROR";

export const SET_VEHICLE_DOCUMENT_IMAGE_REQUEST = "SET_VEHICLE_DOCUMENT_IMAGE_REQUEST";
export const SET_VEHICLE_DOCUMENT_IMAGE_SUCCESS = "SET_VEHICLE_DOCUMENT_IMAGE_SUCCESS";
export const SET_VEHICLE_DOCUMENT_IMAGE_ERROR = "SET_VEHSET_VEHICLE_DOCUMENT_IMAGE_ERRORICLE_IMAGE_ERROR";

export const UPDATE_VEHICLE_REQUEST = "UPDATE_VEHICLE_REQUEST";
export const UPDATE_VEHICLE_SUCCESS = "UPDATE_VEHICLE_SUCCESS";
export const UPDATE_VEHICLE_ERROR = "UPDATE_VEHICLE_ERROR";

export const DELETE_VEHICLE_REQUEST = "DELETE_VEHICLE_REQUEST";
export const DELETE_VEHICLE_SUCCESS = "DELETE_VEHICLE_SUCCESS";
export const DELETE_VEHICLE_ERROR = "DELETE_VEHICLE_ERROR";

const handleSetImage = (firebase, docPath, attributePath, image, buildObject) => {
    const fullPath = docPath + '/' + attributePath + '/' + image.name;

    return firebase.storage().ref().child(fullPath).put(image).then(snapshot => {
        return snapshot.ref.getDownloadURL().then(downloadUrl => {
            firebase.firestore().doc(docPath).update({ [attributePath]: buildObject({ url: downloadUrl, path: fullPath }) });
        });
    });
}

const handleSetVehicleImage = (dispatch, firebase, vehicleID, vehicleImage) => {
    dispatch({ type: SET_VEHICLE_IMAGE_REQUEST });

    handleSetImage(firebase, "vehicles/" + vehicleID, "image", vehicleImage, (obj => obj)).then(() => {
        dispatch({ type: SET_VEHICLE_IMAGE_SUCCESS });
    }).catch(error => {
        dispatch({ type: SET_VEHICLE_IMAGE_ERROR, error });
    });
}

const handleSetVehicleDocumentImage = (dispatch, firebase, vehicleID, vehicleDocumentImage) => {
    dispatch({ type: SET_VEHICLE_DOCUMENT_IMAGE_REQUEST });

    handleSetImage(firebase, "vehicles/" + vehicleID, "documentImages", vehicleDocumentImage, (obj => firebase.firestore.FieldValue.arrayUnion({ ...obj }))).then(() => {
        dispatch({ type: SET_VEHICLE_DOCUMENT_IMAGE_SUCCESS });
    }).catch(error => {
        dispatch({ type: SET_VEHICLE_DOCUMENT_IMAGE_ERROR, error });
    });
}

export const setVehicleImage = (vehicleID, vehicleImage) => {

    return (dispatch, _getState, { getFirebase }) => {
        handleSetVehicleImage(dispatch, getFirebase(), vehicleID, vehicleImage);
    }
}

export const addVehicleDocumentImages = (vehicleID, vehicleDocumentImages) => {

    return (dispatch, _getState, { getFirebase }) => {
        if (Array.isArray(vehicleDocumentImages)) {
            vehicleDocumentImages.forEach(item => handleSetVehicleDocumentImage(dispatch, getFirebase(), vehicleID, item));
        }
    }
}

const addTitles = (vehicle) => {
    vehicle.primaryTitle = "";
    vehicle.secondaryTitle = "";

    vehicle.primaryTitle = addTitlePart("manufacturer", vehicle.primaryTitle, vehicle.fields);
    vehicle.primaryTitle = addTitlePart("model", vehicle.primaryTitle, vehicle.fields);

    vehicle.secondaryTitle = addTitlePart("licensePlate", vehicle.secondaryTitle, vehicle.fields);
    if (!vehicle.secondaryTitle) {
        vehicle.secondaryTitle = addTitlePart("vin", vehicle.secondaryTitle, vehicle.fields);
    }
}

const addTitlePart = (label, title, fields) => {
    if (fields[label]) {
        if (title) {
            title = title + " ";
        }

        title = title + fields[label];
    }

    return title;
}

export const createVehicle = (vehicle, vehicleImage, vehicleDocumentImages) => {

    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: CREATE_VEHICLE_REQUEST });

        const firebase = getFirebase();

        vehicle.active = true;
        vehicle.creator = firebase.auth().currentUser.uid;
        vehicle.createdOn = new Date();
        addTitles(vehicle);

        firebase.firestore().collection("vehicles").add(vehicle).then((vehicleRef) => {
            dispatch({ type: CREATE_VEHICLE_SUCCESS });

            if (vehicleImage) {
                handleSetVehicleImage(dispatch, firebase, vehicleRef.id, vehicleImage);
            }

            if (Array.isArray(vehicleDocumentImages)) {
                vehicleDocumentImages.forEach(item => handleSetVehicleDocumentImage(dispatch, firebase, vehicleRef.id, item));
            }
        }).catch((error) => {
            dispatch({ type: CREATE_VEHICLE_ERROR, error });
        })
    }
}

export const updateVehicle = (vehicleID, vehicle) => {

    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: UPDATE_VEHICLE_REQUEST });

        addTitles(vehicle);

        getFirebase().firestore().collection("vehicles").doc(vehicleID).set(vehicle).then(() => {
            dispatch({ type: UPDATE_VEHICLE_SUCCESS });
        }).catch((error) => {
            dispatch({ type: UPDATE_VEHICLE_ERROR, error });
        })
    }
}

export const deleteVehicle = (vehicleID) => {

    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: DELETE_VEHICLE_REQUEST });

        getFirebase().firestore().collection("vehicles").doc(vehicleID).update({ active: false }).then(() => {
            dispatch({ type: DELETE_VEHICLE_SUCCESS });
        }).catch((error) => {
            dispatch({ type: DELETE_VEHICLE_ERROR, error });
        })
    }
}
