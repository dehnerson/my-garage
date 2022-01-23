import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { withTranslation } from 'react-i18next';
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
    const [focusedMaintenanceWorkID, setFocusedMaintenanceWorkID] = useState(null);
    const [maintenanceWorkDialogOpen, setMaintenanceWorkDialogOpen] = useState(false);
    const [expansions, setExpansions] = useState({});

    const { vehicleId, t } = props;

    useFirestoreConnect([{
        collection: 'vehicles',
        doc: vehicleId,
        subcollections: [{ collection: 'maintenanceWork' }],
        storeAs: 'maintenanceWork-' + vehicleId
    }]);

    const maintenanceWork = useSelector(state => {
        return state.firestore.ordered['maintenanceWork-' + vehicleId]
    });

    const openMaintenanceWorkDialog = (index) => {
        setFocusedMaintenanceWorkID(maintenanceWork[index].id);
        setMaintenanceWorkDialogOpen(true);
    }

    const openCreateMaintenanceWorkDialog = () => {
        setMaintenanceWorkDialogOpen(true);
    }

    const closeMaintenanceWorkDialog = () => {
        setMaintenanceWorkDialogOpen(false);
        setFocusedMaintenanceWorkID(null);
    }

    const toggleListExpansion = (itemID) => {
        const newExpansions = { ...expansions };
        newExpansions[itemID] = !newExpansions[itemID];
        setExpansions(newExpansions);
    }

    const classes = useStyles();

    return (
        <Paper component={"section"} className={classes.maintenancePaper}>
            <List aria-labelledby="nested-list-subheader"
                subheader={<ListSubheader>Maintenance work</ListSubheader>}>
                {Array.isArray(maintenanceWork) &&
                    maintenanceWork.map((item, index) =>
                        <div key={item.id}>
                            <ListItem button onClick={e => openMaintenanceWorkDialog(index)}>
                                <ListItemText inset
                                    primary={item.fields?.mileage + ' km'}
                                    secondary={item.fields?.date?.toDate().toLocaleDateString('de-DE')} />
                                {item.procedures &&
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={e => toggleListExpansion(item.id)} aria-expanded={expansions[item.id]} aria-label="show more"
                                            className={clsx(classes.expand, { [classes.expandOpen]: expansions[item.id], })}>
                                            <ExpandMore />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                }
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

            <CreateMaintenanceWorkDialog open={maintenanceWorkDialogOpen} vehicleID={vehicleId} maintenanceWorkID={focusedMaintenanceWorkID} handleClose={closeMaintenanceWorkDialog} />
        </Paper>
    )
}


export default withTranslation()(MaintenanceWork);
