import React from "react";
import { withTranslation } from 'react-i18next';
import { Slide, IconButton, Tooltip } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';


const EditSaving = (props) => {
    return (
        <Slide in={props.enabled} direction='up'>
            <div>
                <Tooltip title={props.t('cancel')}>
                    <IconButton aria-label="cancel" onClick={props.onCancel}> <Clear /> </IconButton>
                </Tooltip>
                <Tooltip title={props.t('saveChanges')}>
                    <IconButton aria-label="save" onClick={props.onSave}> <Save /> </IconButton>
                </Tooltip>
            </div>
        </Slide>
    )
}


export default withTranslation()(EditSaving);
