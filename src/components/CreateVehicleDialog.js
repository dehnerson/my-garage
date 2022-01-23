import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, Container } from '@material-ui/core';
import Fields from "./Fields";
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

    const [fields, setFields] = useState([]);
    const [vehicleImages, setVehicleImages] = useState([]);
    const [vehicleDocumentImages, setVehicleDocumentImages] = useState([]);

    const dispatch = useDispatch();

    const handleCreateVehicle = () => {
        const vehicle = {
            fields: fields
        };

        dispatch(createVehicle(vehicle, vehicleImages[0], vehicleDocumentImages));
        handleClose();
    }

    const onExited = () => {
        setFields([]);
        setVehicleImages([]);
        setVehicleDocumentImages([]);
    }

    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition} onClose={handleClose} TransitionProps={{ onExited: onExited }} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{t('createVehicle')}</DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                <Container maxWidth='md' className={classes.container}>
                    <ImageDropzone title="Vehicle image" imageAmount={1} files={vehicleImages} setFiles={setVehicleImages} />
                    <Fields area={'vehicle'} fields={fields} creationMode={true} onChanged={setFields} />
                    <ImageDropzone title={t('vehicleDocumentImages')} imageAmount={5} className={classes.documentsDropzone} files={vehicleDocumentImages} setFiles={setVehicleDocumentImages} />
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