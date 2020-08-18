import React, { useState } from "react";
import { withTranslation } from 'react-i18next';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Grid, Grow, Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import AddIcon from '@material-ui/icons/Add';
import LabelIcon from '@material-ui/icons/Label';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 0,
        marginBottom: 0,
    },
    item: {
        display: 'flex',
        alignItems: 'center'
    },
    labelEditingButton: {
        border: 'none'
    }
}));


const AddTextFields = (props) => {
    const { area, addTextFields, notEditable, t } = props;

    const [labelEditing, setLabelEditing] = useState(false);

    const uid = useSelector(state => state.firebase.auth.uid);

    useFirestoreConnect([
        {
            collection: 'addFields',
            doc: uid
        }
    ]);

    const sortedFieldLabels = useSelector(state => {
        if (state.firestore.data.addFields && state.firestore.data.addFields[uid] && state.firestore.data.addFields[uid][area]) {
            return state.firestore.data.addFields[uid][area];
        } else {
            return [];
        }
    });

    const getNextFieldLabel = () => {
        if (Array.isArray(addTextFields) && addTextFields.length > 0) {
            return sortedFieldLabels.find(fieldLabel => !addTextFields.some(addTextField => addTextField.label === fieldLabel));
        } else {
            return sortedFieldLabels[0];
        }
    }

    const addTextField = () => {
        if (Array.isArray(addTextFields)) {
            props.onChanged(addTextFields.concat({ value: "", label: getNextFieldLabel() }));
        } else {
            props.onChanged([{ value: "", label: getNextFieldLabel() }]);
        }
    }

    const removeTextField = (index) => {
        const newAddTextFields = [...addTextFields];
        newAddTextFields.splice(index, 1);
        props.onChanged(newAddTextFields);
    }

    const changeTextField = (index, changes) => {
        const newAddTextFields = [...addTextFields];
        newAddTextFields[index] = { ...newAddTextFields[index], ...changes };
        props.onChanged(newAddTextFields);
    }

    const classes = useStyles();

    const inputProps = { readOnly: notEditable };

    const [valueEditing, setValueEditing] = useState(!labelEditing);

    return (
        <Grid container spacing={1} justify="flex-start" className={classes.container}>
            {!notEditable &&
                <Grid item xs={12} className={classes.item}>
                    <Tooltip title={t('addTextField')}>
                        <IconButton onClick={addTextField} > <AddIcon /></IconButton >
                    </Tooltip>
                    <Grow in={addTextFields && addTextFields.length > 0}>
                        <Tooltip title={t('labelEditing')}>
                            <ToggleButton value="check" selected={labelEditing} onChange={() => { setLabelEditing(!labelEditing) }} className={classes.labelEditingButton}>
                                <LabelIcon />
                            </ToggleButton>
                        </Tooltip>
                    </Grow>
                </Grid>
            }

            {addTextFields && addTextFields.length > 0 && addTextFields.map((item, index) => (
                <Grid key={index} item className={classes.item}>
                    {!notEditable &&
                        <Grow in={true} mountOnEnter unmountOnExit>
                            <Tooltip title={t('removeTextField')}>
                                <IconButton onClick={e => removeTextField(index)}><RemoveIcon /></IconButton>
                            </Tooltip>
                        </Grow>
                    }
                    <Grow in={labelEditing} mountOnEnter unmountOnExit onEnter={e => setValueEditing(false)} onExited={e => setValueEditing(true)}>
                        <TextField size="small" margin='dense' label={"Label (" + item.value + ")"} value={item.label} onChange={e => changeTextField(index, { label: e.target.value })} />
                    </Grow>
                    <Grow in={valueEditing} mountOnEnter unmountOnExit>
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='dense' label={t(item.label)} value={item.value} onChange={e => changeTextField(index, { value: e.target.value })} />
                    </Grow>
                </Grid>
            ))}
        </Grid >
    )
}


export default withTranslation()(AddTextFields);