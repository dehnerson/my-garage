import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, TextField, Stepper, Step, StepLabel, Grid, Container } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { setMaintenanceWork } from "../actions/maintenanceWork";
import AddTextFields from "./AddTextFields";
import ProcedureMaintenance from "./ProcedureMaintenance";


const useStyles = makeStyles((theme) => ({
    dialogContent: {
        paddingLeft: 0,
        paddingRight: 0
    },
    cancelButton: {
        marginRight: theme.spacing(4)
    }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateMaintenanceWorkDialog = (props) => {
    const setMaintenanceWorkElement = (element, value) => {
        props.changeFocusedMaintenanceWork({ [element]: value });
    }

    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);

    const { mileage, addFields, procedures } = props.focusedMaintenanceWork;
    let { doneOn } = props.focusedMaintenanceWork;

    useEffect(() => {
        if (!doneOn) {
            setMaintenanceWorkElement('doneOn', new Date());
        }
    });

    if (doneOn && doneOn.seconds) {
        doneOn = fromUnixTime(doneOn.seconds);
    }

    const steps = ['Commons', props.t('procedures')];

    const handleNextAdd = () => {
        if (activeStep === steps.length - 1) {
            props.addChangeMaintenanceWork();
            props.handleClose();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Container maxWidth="lg">
                        <Grid component="form" container direction="column" alignItems="flex-start">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker disableToolbar autoOk variant="inline" format="dd.MM.yyyy" margin="normal" label="Date" value={doneOn} onChange={date => setMaintenanceWorkElement('doneOn', date)}
                                    inputVariant="outlined" KeyboardButtonProps={{ 'aria-label': 'change date' }}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField variant="outlined" label="Mileage" type="number" margin="normal" value={mileage} onChange={e => setMaintenanceWorkElement('mileage', e.target.value)}></TextField>
                            <AddTextFields addTextFields={addFields} onChanged={addFields => setMaintenanceWorkElement('addFields', addFields)} />
                        </Grid>
                    </Container>
                )
            case 1:
                return <ProcedureMaintenance procedures={procedures} onProceduresChanged={procedures => setMaintenanceWorkElement('procedures', procedures)} />
            default:
                return (
                    'Blaa'
                )
        }
    }

    return (
        <Dialog fullScreen open={props.open} TransitionComponent={Transition} onClose={props.handleClose} onExited={e => setActiveStep(0)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{props.focusedMaintenanceWork.id ? props.t('changeMaintenanceWork') : props.t('addMaintenanceWork')}</DialogTitle>
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
                <Button onClick={props.handleClose} className={classes.cancelButton}>Cancel</Button>
                <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                <Button onClick={handleNextAdd}>{activeStep !== steps.length - 1 ? 'Next' : props.focusedMaintenanceWork.id ? 'Change' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    )
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        addChangeMaintenanceWork: () => dispatch(setMaintenanceWork(props.vehicleID, props.focusedMaintenanceWork))
    }
}

export default withTranslation()(connect(null, mapDispatchToProps)(CreateMaintenanceWorkDialog));