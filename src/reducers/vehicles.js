import {
  CREATE_VEHICLE_REQUEST, CREATE_VEHICLE_SUCCESS, CREATE_VEHICLE_ERROR,
  DELETE_VEHICLE_REQUEST, DELETE_VEHICLE_SUCCESS, DELETE_VEHICLE_ERROR,
  UPDATE_VEHICLE_REQUEST, UPDATE_VEHICLE_SUCCESS, UPDATE_VEHICLE_ERROR
} from "../actions/vehicles";

export default (
  state = {
    isCreatingVehicle: false,
    createVehicleError: null,
    isUpdatingVehicle: false,
    updateVehicleError: null,
    isDeletingVehicle: false,
    deleteVehicleError: null
  },
  action) => {
  switch (action.type) {
    case CREATE_VEHICLE_REQUEST:
      return {
        ...state,
        isCreatingVehicle: true,
        createVehicleError: null
      };
    case CREATE_VEHICLE_SUCCESS:
      return {
        ...state,
        isCreatingVehicle: false,
        createVehicleError: null
      };
    case CREATE_VEHICLE_ERROR:
      return {
        ...state,
        isCreatingVehicle: false,
        createVehicleError: action.error
      };
    case DELETE_VEHICLE_REQUEST:
      return {
        ...state,
        isDeletingVehicle: true,
        deleteVehicleError: null
      };
    case DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        isDeletingVehicle: false,
        deleteVehicleError: null
      };
    case DELETE_VEHICLE_ERROR:
      return {
        ...state,
        isDeletingVehicle: false,
        deleteVehicleError: action.error
      };
    case UPDATE_VEHICLE_REQUEST:
      return {
        ...state,
        isUpdatingVehicle: true,
        updateVehicleError: null
      };
    case UPDATE_VEHICLE_SUCCESS:
      return {
        ...state,
        isUpdatingVehicle: false,
        updateVehicleError: null
      };
    case UPDATE_VEHICLE_ERROR:
      return {
        ...state,
        isUpdatingVehicle: false,
        updateVehicleError: action.error
      };
    default:
      return state;
  }
};
