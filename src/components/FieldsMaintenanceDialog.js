import React from "react";
import { withTranslation } from 'react-i18next';
import { Dialog, Slide } from '@material-ui/core';
import FieldsMaintenance from "./FieldsMaintenance";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const FieldsMaintenanceDialog = (props) => {
    const { open, handleClose } = props;

    return (
        <Dialog fullWidth={true} maxWidth='md' open={open} TransitionComponent={Transition} onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <FieldsMaintenance></FieldsMaintenance>
        </Dialog >
    )
}


export default withTranslation()(FieldsMaintenanceDialog);