import React from "react";
import { Slide, IconButton } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';


const EditSaving = (props) => {
    return (
        <Slide in={props.enabled} direction='up'>
            <div>
                <IconButton aria-label="cancel" onClick={props.onCancel}> <Clear /> </IconButton>
                <IconButton aria-label="save" onClick={props.onSave}> <Save /> </IconButton>
            </div>
        </Slide>
    )
}


export default EditSaving;
