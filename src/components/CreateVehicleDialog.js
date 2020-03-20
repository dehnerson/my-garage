import React from "react";
import { connect } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { createVehicle } from "../actions/vehicles";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateVehicleDialog = (props) => {
    const handleCreateVehicle = () => {
        props.createVehicle();
    };

    return (
        <Dialog open={props.open} TransitionComponent={Transition} keepMounted onClose={props.handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">Create vehicle</DialogTitle>
            <DialogContent>
                <Button variant="contained" color="primary">Scan Fahrzeugschein</Button>
                <TextField required label="License plate" variant="outlined" />
                <TextField required label="Manufacturer" variant="outlined" />
                <TextField required label="Model" variant="outlined" />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleCreateVehicle}>Create vehicle</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createVehicle: () => dispatch(createVehicle({}))
    }
}

export default (connect(null, mapDispatchToProps)(CreateVehicleDialog));