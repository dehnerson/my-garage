import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { withTranslation } from 'react-i18next';
import cloneDeep from 'lodash/cloneDeep';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, IconButton, Menu, MenuItem, CardContent, CardActions, TextField, Collapse, Fade, Grid } from '@material-ui/core';
import { MoreVert, ExpandMore } from '@material-ui/icons';
import { updateVehicle, deleteVehicle, addVehicleDocumentImages } from "../actions/vehicles";
import VehicleAvatar from "./VehicleAvatar";
import AddTextFields from "./AddFields";
import MaintenanceWork from "./MaintenanceWork";
import ImageDropzone from "./ImageDropzone";
import EditSaving from "./EditSaving";


const useStyles = makeStyles((theme) => ({
    mainCardContent: {
        display: 'flex',
        flexFlow: 'wrap',
        paddingBottom: 0
    },
    break: {
        flexBasis: '100%',
        width: 0,
        height: 0,
        overflow: 'hidden'
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

    const propsVehicle = useSelector(state => {
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

    useEffect(() => {
        if (!vehicleEdit) {
            setVehicle(cloneDeep(propsVehicle));
        }
    }, [propsVehicle, vehicleEdit]);

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
        dispatch(updateVehicle(urlSearch.id, vehicle));

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

    const inputProps = { readOnly: !vehicleEditable };

    if (vehicle) {
        return (
            <Grid component={"article"} container direction="column" justify="flex-start" alignItems="stretch">
                <Card component={"section"}>
                    <CardHeader avatar={<VehicleAvatar title={vehicle.primaryTitle} sourceUrl={vehicle.image && vehicle.image.url} />}
                        title={vehicle.primaryTitle}
                        action={<IconButton onClick={handleMenuOpen} aria-controls="fade-menu" aria-haspopup="true" aria-label="settings"><MoreVert /></IconButton>}>
                    </CardHeader >
                    <CardContent className={classes.mainCardContent}>
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='dense' label={t('manufacturer')} value={vehicle.manufacturer}
                            onChange={e => setVehicleUpdate({ manufacturer: e.target.value })} />
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='dense' label={t('model')} value={vehicle.model}
                            onChange={e => setVehicleUpdate({ model: e.target.value })} />
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='dense' label={t('version')} value={vehicle.version}
                            onChange={e => setVehicleUpdate({ version: e.target.value })} />
                        <div className={classes.break} />
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='dense' label={t('licensePlate')} value={vehicle.licensePlate}
                            onChange={e => setVehicleUpdate({ licensePlate: e.target.value })} />
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='dense' label={t('vin')} value={vehicle.vin}
                            onChange={e => setVehicleUpdate({ vin: e.target.value })} />
                        <div className={classes.break} />
                        <TextField inputProps={inputProps} variant="outlined" size="small" margin='dense' label={t('owner')} value={vehicle.owner}
                            onChange={e => setVehicleUpdate({ owner: e.target.value })} />
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActionsRight}>
                        <EditSaving enabled={vehicleEdit} onSave={saveVehicleUpdate} onCancel={cancelVehicleUpdate} />
                        <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" className={clsx(classes.expand, { [classes.expandOpen]: expanded })}>
                            <ExpandMore />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto">
                        <CardContent className={classes.addFieldsCardContent}>
                            <AddTextFields notEditable={!vehicleEditable} area={'vehicle'} addTextFields={vehicle.addFields} onChanged={newAddFields => setVehicleUpdate({ addFields: newAddFields })} />
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
