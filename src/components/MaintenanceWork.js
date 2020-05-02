import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { withTranslation } from 'react-i18next';
import cloneDeep from 'lodash/cloneDeep';
import clsx from 'clsx';
import { IconButton, Paper, List, ListSubheader, ListItem, ListItemText, Collapse, Fab, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import { ExpandMore, Add } from '@material-ui/icons';
import CreateMaintenanceWorkDialog from "./CreateMaintenanceWorkDialog";
import MaintenanceProcedures from "./MaintenanceProcedures";


const useStyles = makeStyles((theme) => ({
    maintenancePaper: {
        marginTop: theme.spacing(2)
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));


const MaintenanceWork = (props) => {
    const [focusedMaintenanceWork, setFocusedMaintenanceWork] = useState({});
    const [maintenanceWorkDialogOpen, setMaintenanceWorkDialogOpen] = useState(false);
    const [expansions, setExpansions] = useState({});

    const { vehicleId, t } = props;

    const maintenanceWork = useSelector(state => state.firestore.ordered['maintenanceWork.' + props.vehicleId]);

    useFirestoreConnect([{
        collection: 'vehicles',
        doc: props.vehicleId,
        subcollections: [{ collection: 'maintenanceWork' }],
        storeAs: 'maintenanceWork.' + vehicleId
    }]);

    const changeFocusedMaintenanceWork = (elements) => {
        setFocusedMaintenanceWork({ ...focusedMaintenanceWork, ...elements });
    }

    const openMaintenanceWorkDialog = (index) => {
        setFocusedMaintenanceWork(cloneDeep(maintenanceWork[index]));
        setMaintenanceWorkDialogOpen(true);
    }

    const openCreateMaintenanceWorkDialog = () => {
        setFocusedMaintenanceWork({});
        setMaintenanceWorkDialogOpen(true);
    }

    const closeMaintenanceWorkDialog = () => {
        setMaintenanceWorkDialogOpen(false);
    }

    const toggleListExpansion = (itemID) => {
        const newExpansions = { ...expansions };
        newExpansions[itemID] = !newExpansions[itemID];
        setExpansions(newExpansions);
    }

    const classes = useStyles();

    return (
        <Paper className={classes.maintenancePaper}>
            <List aria-labelledby="nested-list-subheader"
                subheader={<ListSubheader>Maintenance work</ListSubheader>}>
                {maintenanceWork && maintenanceWork.length > 0 &&
                    maintenanceWork.map((item, index) =>
                        <div key={item.id}>
                            <ListItem button onClick={e => openMaintenanceWorkDialog(index)}>
                                <ListItemText inset
                                    primary={item.mileage + ' km'}
                                    secondary={item.doneOn && item.doneOn.toDate().toLocaleDateString('de-DE')} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={e => toggleListExpansion(item.id)} aria-expanded={expansions[item.id]} aria-label="show more"
                                        className={clsx(classes.expand, { [classes.expandOpen]: expansions[item.id], })}>
                                        <ExpandMore />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Collapse in={expansions[item.id]} timeout="auto">
                                <MaintenanceProcedures procedures={item.procedures}></MaintenanceProcedures>
                            </Collapse>
                        </div>)
                }
            </List>
            <Tooltip title={t('addMaintenanceWork')}>
                <Fab color="primary" aria-label="add" aria-haspopup="true" onClick={openCreateMaintenanceWorkDialog}><Add /></Fab>
            </Tooltip>

            <CreateMaintenanceWorkDialog open={maintenanceWorkDialogOpen} focusedMaintenanceWork={focusedMaintenanceWork} changeFocusedMaintenanceWork={changeFocusedMaintenanceWork}
                handleClose={closeMaintenanceWorkDialog} vehicleID={vehicleId} />
        </Paper>
    )
}


export default withTranslation()(MaintenanceWork);
