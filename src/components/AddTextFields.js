import React, { useState } from "react";
import { withTranslation } from 'react-i18next';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Grid, Grow, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 0,
        marginBottom: 0,
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 0, 1, 0)
    }
}));


const AddTextFields = (props) => {
    const { area, addTextFields, notEditable, t } = props;

    const [labelEditing, setLabelEditing] = useState(!addTextFields || addTextFields.length === 0);

    const uid = useSelector(state => state.firebase.auth.uid);

    useFirestoreConnect([
        {
            collection: 'addTextFields',
            doc: uid
        }
    ]);

    const fieldLabels = useSelector(state => state.firestore.data.addTextFields && state.firestore.data.addTextFields[uid][area]);

    const getNextFieldLabel = () => {
        return 'Hier weiter machen!'
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

    return (
        <Grid container spacing={2} justify="flex-start" className={classes.container}>
            {!notEditable &&
                <Grid item xs={12} className={classes.item}>
                    <Tooltip title={t('addTextField')}>
                        <IconButton onClick={addTextField} > <AddIcon /></IconButton >
                    </Tooltip>
                    <Grow in={addTextFields && addTextFields.length > 0}>
                        <div>
                            <Grow in={!labelEditing} mountOnEnter unmountOnExit>
                                <Tooltip title={t('enableLabelEditing')}>
                                    <IconButton onClick={e => setLabelEditing(true)} > <LabelIcon /></IconButton >
                                </Tooltip>
                            </Grow>
                            <Grow in={labelEditing} mountOnEnter unmountOnExit>
                                <Tooltip title={t('disableLabelEditing')}>
                                    <IconButton onClick={e => setLabelEditing(false)} > <LabelOffIcon /></IconButton >
                                </Tooltip>
                            </Grow>
                        </div>
                    </Grow>
                </Grid>
            }

            {addTextFields && addTextFields.length > 0 && addTextFields.map((item, index) => (
                <Grid key={index} item className={classes.item}>
                    {!notEditable &&
                        <div>
                            <Tooltip title={t('removeTextField')}>
                                <IconButton onClick={e => removeTextField(index)}><RemoveIcon /></IconButton>
                            </Tooltip>
                            <Grow in={labelEditing} mountOnEnter unmountOnExit>
                                <TextField size="small" label="Label" value={item.label} onChange={e => changeTextField(index, { label: e.target.value })} />
                            </Grow>
                        </div>
                    }
                    <TextField inputProps={inputProps} variant="outlined" size="small" label={item.label} value={item.value} onChange={e => changeTextField(index, { value: e.target.value })} />
                </Grid>
            ))
            }
        </Grid >
    )
}


export default withTranslation()(AddTextFields);