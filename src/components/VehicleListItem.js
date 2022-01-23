import React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import VehicleAvatar from "./VehicleAvatar";


const VehicleListItem = (props) => {
    const { vehicle } = props;

    return (
        <ListItem button component={Link} to={"/vehicle?id=" + vehicle.id} >
            <ListItemAvatar>
                <VehicleAvatar title={vehicle.primaryTitle} sourceUrl={vehicle.image && vehicle.image.url} />
            </ListItemAvatar>
            <ListItemText primary={vehicle.primaryTitle} secondary={vehicle.secondaryTitle} />
        </ListItem>
    )
}

export default VehicleListItem;
