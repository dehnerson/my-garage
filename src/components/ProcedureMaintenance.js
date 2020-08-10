import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, TextField, IconButton, Container, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddTextFields from './AddFields';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxHeight: 'none',
        height: '100%'
    },
    tabsContainer: {
        width: 'auto',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    proceduresContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    proceduresForm: {
        width: '100%'
    }
}));


export default function ProcedureMaintenance(props) {
    const classes = useStyles();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    let activeTab;

    if (Array.isArray(props.procedures) && props.procedures.length > 0) {
        activeTab = props.procedures[activeTabIndex];
    } else {
        props.onProceduresChanged([{ work: '', description: '' }]);
    }

    const handleAddTab = () => {
        props.onProceduresChanged(props.procedures.concat({ work: '', description: '' }));
    };

    const handleRemoveTab = () => {
        if (props.procedures.length > 1) {
            const index = activeTabIndex;

            const newTabs = [...props.procedures];
            newTabs.splice(index, 1);

            props.onProceduresChanged(newTabs);

            if (index === props.procedures.length - 1) {
                handleChange(null, index - 1);
            }
        }
    }

    const handleChange = (event, newValue) => {
        setActiveTabIndex(newValue);
    };

    const changeTextFieldValue = (element, value) => {
        const newTabs = [...props.procedures];
        newTabs[activeTabIndex][element] = value;

        props.onProceduresChanged(newTabs);
    }

    const onAddFieldsChanged = (addFields) => {
        const newTabs = [...props.procedures];
        newTabs[activeTabIndex].addFields = addFields;
        props.onProceduresChanged(newTabs);
    }

    return (
        <div className={classes.root}>
            {Array.isArray(props.procedures) &&
                <Grid container direction="column" alignItems="center" wrap="nowrap" className={classes.tabsContainer}>
                    <Grid item>
                        <IconButton onClick={handleAddTab}><AddIcon /></IconButton>
                        <IconButton onClick={handleRemoveTab} disabled={props.procedures.length < 2}><RemoveIcon /></IconButton>
                    </Grid>
                    <Tabs orientation="vertical" variant="scrollable" value={activeTabIndex} onChange={handleChange} aria-label="Vertical tabs">
                        {props.procedures.map((tab, index) => (
                            <Tab key={index} label={index + 1} id={`vertical-tab-${index}`} aria-controls={`vertical-tabpanel-${index}`} />
                        ))}
                    </Tabs>
                </Grid>
            }
            {activeTab &&
                <Container id={`vertical-tabpanel-${activeTabIndex}`} aria-labelledby={`vertical-tab-${activeTabIndex}`} className={classes.proceduresContainer} role="tabpanel">
                    <form className={classes.proceduresForm}>
                        <TextField value={activeTab.work} onChange={e => changeTextFieldValue("work", e.target.value)} label={"Work"} variant="outlined" margin="normal" />
                        <TextField value={activeTab.description} onChange={e => changeTextFieldValue("description", e.target.value)} label="Description" variant="outlined" margin="normal" multiline fullWidth />
                        <AddTextFields addTextFields={activeTab.addFields} onChanged={onAddFieldsChanged} />
                    </form>
                </Container>
            }
        </div>
    )
}
