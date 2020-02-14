import { CREATE_VEHICLE_REQUEST, CREATE_VEHICLE_SUCCESS, CREATE_VEHICLE_ERROR } from "../actions/vehicles";

export default (
  state = {
    isCreatingVehicle: false,
    createVehicleError: null,
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
    default:
      return state;
  }
};
