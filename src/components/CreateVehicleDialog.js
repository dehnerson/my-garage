import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, Container } from '@material-ui/core';
import AddFields from "./AddFields";
import ImageDropzone from "./ImageDropzone";
import { createVehicle } from "../actions/vehicles";


const useStyles = makeStyles((theme) => ({
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
    documentsDropzone: {
        paddingTop: theme.spacing(2),
        marginTop: 'auto',
        marginBottom: 0
    }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateVehicleDialog = (props) => {
    const { open, handleClose, t } = props;

    const [vehicleImages, setVehicleImages] = useState([]);
    const [addFields, setAddFields] = useState([]);
    const [vehicleDocumentImages, setVehicleDocumentImages] = useState([]);

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleCreateVehicle = () => {
        const vehicle = {
            addFields: addFields
        };

        dispatch(createVehicle(vehicle, vehicleImages[0], vehicleDocumentImages));
        handleClose();
    }

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition} onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{t('createVehicle')}</DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                <Container maxWidth='md' className={classes.container}>
                    <ImageDropzone title="Vehicle image" imageAmount={1} files={vehicleImages} setFiles={newFiles => setVehicleImages(newFiles)} />
                    <AddFields area={'vehicle'} addTextFields={addFields} onChanged={newAddFields => setAddFields(newAddFields)} />
                    <div className={classes.documentsDropzone}>
                        <ImageDropzone title={t('vehicleDocumentImages')} imageAmount={5} files={vehicleDocumentImages} setFiles={newFiles => setVehicleDocumentImages(newFiles)} />
                    </div>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('cancel')}</Button>
                <Button onClick={handleCreateVehicle}>{t('createVehicle')}</Button>
            </DialogActions>
        </Dialog >
    )
}


export default withTranslation()(CreateVehicleDialog);