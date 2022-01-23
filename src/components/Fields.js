import React, { useState, useEffect } from "react";
import { withTranslation } from 'react-i18next';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton, Grid, Fade, Tooltip } from '@material-ui/core';
import { RemoveCircleOutlined } from '@material-ui/icons';
import SplitButton from "./SplitButton";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import FieldsMaintenanceDialog from "./FieldsMaintenanceDialog";


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 0,
        marginBottom: 0,
    },
    item: {
        display: 'flex',
        alignItems: 'center'
    }
}));


const Fields = (props) => {
    const { area, fields, creationMode, onChanged, notEditable, t } = props;

    const [fieldsToDisplay, setFieldsToDisplay] = useState([]);
    const [freeFields, setFreeFields] = useState([]);
    const [hoveredKey, setHoveredKey] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

    const uid = useSelector(state => state.firebase.auth.uid);

    useFirestoreConnect([
        {
            collection: 'fields',
            doc: 'fixed',
            subcollections: [{ collection: 'areas', doc: area }],
            storeAs: 'fieldsFixed-' + area
        }
    ]);

    useFirestoreConnect([
        {
            collection: 'fields',
            doc: uid,
            storeAs: 'fieldsAdd'
        }
    ]);

    const fixedFields = useSelector(state => state.firestore.data['fieldsFixed-' + area]?.fields);
    const addFields = useSelector(state => state.firestore.data?.['fieldsAdd']?.areas?.find(each => each.name === area)?.fields);

    useEffect(() => {
        const fieldsToDisplayTemp = [];
        const freeFieldsTemp = [];

        Array.isArray(fixedFields) && fixedFields.forEach(each => {
            if (creationMode || fields?.hasOwnProperty(each.label)) {
                let value = fields?.[each.label];

                if (each.inputType === 'date' && !value) {
                    value = new Date();
                    onChanged({ ...fields, [each.label]: value });
                }

                fieldsToDisplayTemp.push({ ...each, value: value ? value : "" });
            } else {
                freeFieldsTemp.push(each);
            }
        });

        Array.isArray(addFields) && addFields.forEach(each => fields?.hasOwnProperty(each.label) ? fieldsToDisplayTemp.push({ ...each, value: fields[each.label] }) : freeFieldsTemp.push(each));

        setFieldsToDisplay(fieldsToDisplayTemp);
        setFreeFields(freeFieldsTemp);
    }, [fields, fixedFields, addFields, creationMode, onChanged]);

    const addTextField = (freeField) => {
        onChanged({ ...fields, [freeField.label]: "" });
    }

    const removeTextField = (key) => {
        const { [key]: removed, ...newFields } = fields;
        onChanged(newFields);
    }

    const changeTextField = (key, value) => {
        onChanged({ ...fields, [key]: value });
    }

    const classes = useStyles();

    const inputProps = { readOnly: notEditable };

    const freeFieldsAvailable = freeFields.length > 0;

    return (
        <Grid container spacing={1} justify="flex-start" className={classes.container}>
            {!notEditable &&
                <Grid item xs={12} className={classes.item}>
                    <SplitButton tooltipMain={freeFieldsAvailable ? t('add') + " " + t(freeFields[0].label) : t('addFields')} onMainClick={e => freeFieldsAvailable ? addTextField(freeFields[0]) : setDialogOpen(true)}
                        onSplitItemClick={addTextField} splitItems={freeFields} />
                </Grid>
            }

            {fieldsToDisplay.map((fieldToDisplay, index) => (
                <Grid key={index} item className={classes.item} onMouseEnter={e => setHoveredKey(index)} onMouseLeave={e => setHoveredKey(null)}>
                    {!notEditable &&
                        <Fade in={index === hoveredKey} >
                            <Tooltip title={t('remove') + " " + t(fieldToDisplay.label)}>
                                <IconButton onClick={e => removeTextField(fieldToDisplay.label)}><RemoveCircleOutlined /></IconButton>
                            </Tooltip>
                        </Fade>
                    }
                    {fieldToDisplay.inputType === 'date' ?
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar autoOk inputProps={inputProps} variant="inline" format="dd.MM.yyyy" label={t(fieldToDisplay.label)}
                                value={fieldToDisplay.value.seconds ? fromUnixTime(fieldToDisplay.value.seconds) : fieldToDisplay.value}
                                onChange={date => changeTextField(fieldToDisplay.label, date)} inputVariant="outlined" size="small" margin='normal' KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                        </MuiPickersUtilsProvider>
                        :
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='normal' label={t(fieldToDisplay.label)} value={fieldToDisplay.value}
                            onChange={e => changeTextField(fieldToDisplay.label, e.target.value)}
                            multiline={fieldToDisplay.inputType === 'description'} fullWidth={fieldToDisplay.inputType === 'description'} />
                    }
                </Grid>
            ))}
            <FieldsMaintenanceDialog open={dialogOpen} handleClose={e => setDialogOpen(false)} />
        </Grid >
    )
}


export default withTranslation()(Fields);