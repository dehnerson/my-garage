import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import { withStyles } from "@material-ui/styles";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, TextField, Container, Grid } from '@material-ui/core';
import AddTextFields from "./AddFields";
import ImageDropzone from "./ImageDropzone";
import { createVehicle } from "../actions/vehicles";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class CreateVehicleDialog extends Component {
    state = { addFields: [], vehicleImages: [], vehicleDocumentImages: [] };

    handleCreateVehicle = () => {
        const vehicle = {
            vin: this.refVin.value,
            licensePlate: this.refLicensePlate.value,
            manufacturer: this.refManufacturer.value,
            model: this.refModel.value,
            version: this.refVersion.value,
            addFields: this.state.addFields
        };

        this.props.createVehicle(vehicle, this.state.vehicleImages[0], this.state.vehicleDocumentImages);
        this.props.handleClose();
    }

    render() {
        const { open, handleClose, t, classes } = this.props;

        return (
            <Dialog fullScreen open={open} TransitionComponent={Transition} onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{t('createVehicle')}</DialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    <Container maxWidth='md' className={classes.container}>
                        <ImageDropzone title="Vehicle image" imageAmount={1} files={this.state.vehicleImages} setFiles={newFiles => this.setState({ vehicleImages: newFiles })} />

                        <Grid container direction="row" spacing={2} justify="flex-start" alignItems="flex-start" className={classes.grid}>
                            <Grid item>
                                <TextField inputRef={ref => this.refManufacturer = ref} variant="outlined" label={t('manufacturer')}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField inputRef={ref => this.refModel = ref} variant="outlined" label={t('model')}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField inputRef={ref => this.refVersion = ref} variant="outlined" label={t('version')}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField inputRef={ref => this.refLicensePlate = ref} variant="outlined" label={t('licensePlate')}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField inputRef={ref => this.refVin = ref} variant="outlined" label={t('vin')}></TextField>
                            </Grid>
                        </Grid>
                        <AddTextFields area={'vehicle'} addTextFields={this.state.addFields} onChanged={addFields => this.setState({ addFields: addFields })} />
                        <ImageDropzone title={t('vehicleDocumentImages')} imageAmount={5} className={classes.documentsDropzone} files={this.state.vehicleDocumentImages} setFiles={newFiles => this.setState({ vehicleDocumentImages: newFiles })} />
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose}>{t('cancel')}</Button>
                    <Button onClick={this.handleCreateVehicle}>{t('createVehicle')}</Button>
                </DialogActions>
            </Dialog >
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createVehicle: (vehicle, vehicleImage, vehicleDocumentImages) => dispatch(createVehicle(vehicle, vehicleImage, vehicleDocumentImages))
    }
}

export default withStyles((theme) => ({
    dialogContent: {
        paddingLeft: 0,
        paddingRight: 0
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
    },
    grid: {
        marginTop: theme.spacing(2),
        marginBottom: 0
    },
    documentsDropzone: {
        paddingTop: theme.spacing(2),
        marginTop: 'auto',
        marginBottom: 0
    }
}))(withTranslation()(connect(null, mapDispatchToProps)(CreateVehicleDialog)));