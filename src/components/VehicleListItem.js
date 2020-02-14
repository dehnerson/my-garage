import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
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
        <ListItem>
            <Paper>
                {vehicle.imageURL ? <Avatar variant='rounded' alt={alter} src={vehicle.imageURL} /> : alter ? <Avatar variant='rounded'>{alter[0]}</Avatar> : <Avatar variant='rounded'><CarIcon /></Avatar>}
                {vehicle.manufacturer && <p>Manufacturer: {vehicle.manufacturer}</p>}
                {vehicle.model && <p>Model: {vehicle.model}</p>}
                {vehicle.licensePlate && <p>License plate: {vehicle.licensePlate}</p>}
            </Paper>
        </ListItem>
    )
}

export default VehicleListItem;
