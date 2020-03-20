import React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CarIcon from '@material-ui/icons/DirectionsCar';


const VehicleListItem = (props) => {
    const { vehicle } = props;

    let alter;

    if (vehicle.model) {
        alter = vehicle.model;

        if (vehicle.manufacturer) {
            alter = vehicle.manufacturer + " " + vehicle.model;
        }
    }

    return (
        <ListItem button component={Link} to={"/vehicle/" + vehicle.id}>
            <ListItemAvatar>
                {vehicle.imageURL ? <Avatar variant='rounded' alt={alter} src={vehicle.imageURL} /> : alter ? <Avatar variant='rounded'>{alter[0]}</Avatar> : <Avatar variant='rounded'><CarIcon /></Avatar>}
            </ListItemAvatar>
            {vehicle.manufacturer && <ListItemText primary={"Manufacturer: " + vehicle.manufacturer} />}
            {vehicle.model && <p>Model: {vehicle.model}</p>}
            {vehicle.licensePlate && <p>License plate: {vehicle.licensePlate}</p>}

        </ListItem>
    )
}

export default VehicleListItem;
