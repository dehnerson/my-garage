import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, Stepper, Step, StepLabel, Container, Box, useMediaQuery, useTheme } from '@material-ui/core';
import { setMaintenanceWork as setMaintenanceWorkDB, deleteMaintenanceWork } from "../actions/maintenanceWork";
import Fields from "./Fields";
import ProcedureMaintenance from "./ProcedureMaintenance";


const useStyles = makeStyles((theme) => ({
    dialogContent: {
        paddingLeft: 0,
        paddingRight: 0
    },
    cancelButton: {
        marginRight: theme.spacing(4),
        marginLeft: "auto"
    },
    dialogButton: {
        marginRight: theme.spacing(1)
    }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateMaintenanceWorkDialog = (props) => {
    const { open, vehicleID, maintenanceWorkID, t, handleClose } = props;

    const [maintenanceWork, setMaintenanceWork] = useState();
    const [edited, setEdited] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const maintenanceWorkDB = useSelector(state => state.firestore.data?.['maintenanceWork-' + vehicleID]?.[maintenanceWorkID]);

    if (open && !edited && maintenanceWork !== maintenanceWorkDB) {
        setMaintenanceWork(maintenanceWorkDB);
    }

    const setMaintenanceWorkElement = (element, value) => {
        if (open) {
            setMaintenanceWork({ ...maintenanceWork, [element]: value });
            setEdited(true);
        }
    }

    const steps = [t('commons'), t('procedures')];

    const handleNextAdd = () => {
        if (activeStep === steps.length - 1) {
            saveChanges();
            onClose();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleDelete = () => {
        dispatch(deleteMaintenanceWork(vehicleID, maintenanceWorkID));
        onClose();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onClose = () => {
        handleClose();
    }

    const onExited = () => {
        setActiveStep(0)
        setEdited(false);
    }

    const dispatch = useDispatch();

    const saveChanges = () => {
        dispatch(setMaintenanceWorkDB(vehicleID, maintenanceWorkID, maintenanceWork));
    }

    const classes = useStyles();

    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Container maxWidth="lg" >
                        <Fields fields={maintenanceWork?.fields} area={'maintenanceWork'} creationMode={!Boolean(maintenanceWorkID)} onChanged={newFields => setMaintenanceWorkElement('fields', newFields)} />
                    </Container>
                )
            case 1:
                return (
                    <Container maxWidth="lg">
                        <ProcedureMaintenance procedures={maintenanceWork?.procedures} onProceduresChanged={procedures => setMaintenanceWorkElement('procedures', procedures)} creationMode={!Boolean(maintenanceWorkID)} />
                    </Container>
                )
            default:
                return (
                    'Blaa'
                )
        }
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog fullScreen={fullScreen} maxWidth="lg" fullWidth open={open} TransitionComponent={Transition} onClose={onClose} TransitionProps={{ onExited: onExited }} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{maintenanceWorkID ? t('changeMaintenanceWork') : t('addMaintenanceWork')}</DialogTitle>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <DialogContent dividers className={classes.dialogContent}>
                {getStepContent()}
            </DialogContent>
            <DialogActions>
                <Box display="flex" width="-webkit-fill-available">
                    {maintenanceWorkID &&
                        <Button onClick={handleDelete} className={classes.dialogButton}>Delete</Button>
                    }
                    <Button onClick={onClose} className={classes.cancelButton}>Cancel</Button>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.dialogButton}>Back</Button>
                    <Button onClick={handleNextAdd}>{activeStep !== steps.length - 1 ? 'Next' : maintenanceWorkID ? 'Change' : 'Add'}</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default withTranslation()(CreateMaintenanceWorkDialog);