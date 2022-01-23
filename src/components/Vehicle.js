import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, IconButton, Menu, MenuItem, CardContent, CardActions, Collapse, Fade, Grid } from '@material-ui/core';
import { MoreVert, ExpandMore } from '@material-ui/icons';
import { updateVehicle, deleteVehicle, addVehicleDocumentImages } from "../actions/vehicles";
import VehicleAvatar from "./VehicleAvatar";
import Fields from "./Fields";
import MaintenanceWork from "./MaintenanceWork";
import ImageDropzone from "./ImageDropzone";
import EditSaving from "./EditSaving";


const useStyles = makeStyles((theme) => ({
    mainCardContent: {
        paddingBottom: 0
    },
    addFieldsCardContent: {
        paddingTop: 0
    },
    cardActionsRight: {
        display: 'flex',
        marginLeft: 'auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    images: {
        marginTop: theme.spacing(2)
    }
}));


const Vehicle = (props) => {
    const { t } = props;

    const [urlSearch] = useState(queryString.parse(props.location.search));
    const [vehicle, setVehicle] = useState(null);
    const [newDocumentImages, setNewDocumentImages] = useState([]);
    const [vehicleEdit, setVehicleEdit] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);

    let vehicleEditable = false;

    const vehicleDB = useSelector(state => {
        let ret = null;

        if (state.firestore.data.myVehicles) {
            ret = state.firestore.data.myVehicles[urlSearch.id];

            vehicleEditable = Boolean(ret);
        }

        if (ret == null && state.firestore.data.vehiclesSharedWithMe) {
            ret = state.firestore.data.vehiclesSharedWithMe[urlSearch.id];
        }

        return ret;
    });

    if (!vehicleEdit && vehicle !== vehicleDB) {
        setVehicle(vehicleDB);
    }

    const dispatch = useDispatch();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleVehicleDelete = () => {
        handleMenuClose();
        dispatch(deleteVehicle(urlSearch.id));
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleNewDocumentImages = (documentImages) => {
        setNewDocumentImages(documentImages);
        setVehicleEdit(true);
    }

    const setVehicleUpdate = (changes) => {
        setVehicle({ ...vehicle, ...changes });
        setVehicleEdit(true);
    }

    const saveVehicleUpdate = () => {
        if (vehicleDB !== vehicle) {
            dispatch(updateVehicle(urlSearch.id, vehicle));
        }

        if (newDocumentImages.length > 0) {
            dispatch(addVehicleDocumentImages(urlSearch.id, newDocumentImages));
            setNewDocumentImages([]);
        }

        setVehicleEdit(false);
    }

    const cancelVehicleUpdate = () => {
        setNewDocumentImages([]);
        setVehicleEdit(false);
    }

    const classes = useStyles();

    if (vehicle) {
        return (
            <Grid component={"article"} container direction="column" justify="flex-start" alignItems="stretch">
                <Card component={"section"}>
                    <CardHeader avatar={<VehicleAvatar title={vehicle.primaryTitle} sourceUrl={vehicle.image && vehicle.image.url} />}
                        title={vehicle.primaryTitle}
                        action={<IconButton onClick={handleMenuOpen} aria-controls="fade-menu" aria-haspopup="true" aria-label="settings"><MoreVert /></IconButton>}>
                    </CardHeader >
                    <CardContent className={classes.mainCardContent}>
                        <Fields notEditable={!vehicleEditable} area={'vehicle'} fields={vehicle.fields} onChanged={newFields => setVehicleUpdate({ fields: newFields })
                        } />
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActionsRight}>
                        <EditSaving enabled={vehicleEdit} onSave={saveVehicleUpdate} onCancel={cancelVehicleUpdate} />
                        <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" className={clsx(classes.expand, { [classes.expandOpen]: expanded })}>
                            <ExpandMore />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto">
                        <CardContent className={classes.addFieldsCardContent}>
                            <ImageDropzone title={t('vehicleDocumentImages')} imageAmount={5} className={classes.images}
                                images={vehicle.documentImages} setImages={newImages => setVehicleUpdate({ documentImages: newImages })}
                                files={newDocumentImages} setFiles={handleNewDocumentImages}
                                notEditable={!vehicleEditable} />
                        </CardContent>
                    </Collapse>
                </Card >
                <Menu anchorEl={anchorEl} open={anchorEl != null} onClose={handleMenuClose} TransitionComponent={Fade}>
                    {vehicleEditable &&
                        <MenuItem onClick={handleVehicleDelete}>{t('delete')}</MenuItem>
                    }
                </Menu>
                <MaintenanceWork vehicleId={urlSearch.id} />
            </Grid >
        )
    }
    else {
        return (<p>Loading</p>)
    }
}


export default withTranslation()(Vehicle);
