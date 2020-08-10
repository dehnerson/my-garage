import React, { useState } from "react";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddFields } from "../actions/addFields";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Tabs, Tab } from '@material-ui/core';
import SortableList from './SortableList';
import EditSaving from "./EditSaving";

const useStyles = makeStyles((theme) => ({
    cardContent: {
        flexGrow: 1,
        display: 'flex',
        width: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabPanel: {
        flexGrow: 1
    }
}));


const AddTextFieldsMaintenance = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [addFields, setAddFields] = useState();
    const [edited, setEdited] = useState(false);

    const uid = useSelector(state => state.firebase.auth.uid);

    useFirestoreConnect([{
        collection: 'addFields',
        doc: uid
    }]);

    const addFieldsDB = useSelector(state => {
        if (state.firestore.data.addFields) {
            return state.firestore.data.addFields[uid];
        }
    });

    const a11yProps = (index) => {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!edited && addFields !== addFieldsDB) {
        setAddFields(addFieldsDB);
    }

    const onListChange = (changes) => {
        setEdited(true);
        setAddFields({ ...addFields, ...changes });
    }

    const dispatch = useDispatch();

    const saveChanges = () => {
        dispatch(updateAddFields(addFields));
    }

    if (addFields) {
        return (
            <Card component={"section"}>
                <CardHeader title="sdasdasdas"
                    action={<EditSaving enabled={edited} onSave={saveChanges} onCancel={e => setEdited(false)} />} />
                <CardContent className={classes.cardContent}>
                    <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="Vertical tabs example" className={classes.tabs}>
                        {Object.keys(addFields).map((key, i) =>
                            <Tab key={i} label={key} {...a11yProps(i)} />
                        )}
                    </Tabs>
                    {Object.keys(addFields).map((key, i) =>
                        <div key={i} role="tabpanel" hidden={value !== i} id={`vertical-tabpanel-${i}`} aria-labelledby={`vertical-tab-${i}`} className={classes.tabPanel}>
                            {value === i && (
                                <SortableList items={addFields[key]} setItems={newItems => onListChange({ [key]: newItems })} />
                            )}
                        </div>
                    )}
                </CardContent>
            </Card >
        )
    } else {
        return null;
    }
}

export default AddTextFieldsMaintenance;