import React from 'react';
import { compose } from 'redux'
import { firestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CarIcon from '@material-ui/icons/DirectionsCar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const Vehicle = (props) => {
    const { vehicle, maintenanceWork } = props;

    if (vehicle) {
        let alter;

        if (vehicle.model) {
            alter = vehicle.model;

            if (vehicle.manufacturer) {
                alter = vehicle.manufacturer + " " + vehicle.model;
            }
        }

        return (
            <div>
                <Card>
                    <CardHeader avatar={vehicle.imageURL ? <Avatar variant='rounded' alt={alter} src={vehicle.imageURL} /> : alter ? <Avatar variant='rounded'>{alter[0]}</Avatar> : <Avatar variant='rounded'><CarIcon /></Avatar>}
                        title={alter}
                        action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>} />
                    <CardContent>
                        {vehicle.licensePlate && <Typography component="p">License plate: {vehicle.licensePlate}</Typography>}
                    </CardContent>
                </Card>
                {maintenanceWork && maintenanceWork.length > 0 &&
                    <Paper>
                        <List>{maintenanceWork.map((item) =>
                            <ListItem key={item.id}>
                                <ListItemText primary={item.date.seconds} />
                            </ListItem>)}
                        </List>
                    </Paper>
                }

            </div>
        )
    }
    else {
        return (<p>Loading</p>)
    }
}

const mapStateToProps = (state) => {
    return {
        vehicle: state.firestore.data.vehicle,
        maintenanceWork: state.firestore.ordered.maintenanceWork
    }
}

export default compose(
    firestoreConnect(props => [{
        collection: 'vehicles',
        doc: props.match.params.vehicleID,
        storeAs: 'vehicle'
    },
    {
        collection: 'vehicles',
        doc: props.match.params.vehicleID,
        subcollections: [{ collection: 'maintenanceWork' }],
        storeAs: 'maintenanceWork'
    }]),
    connect(mapStateToProps)
)(Vehicle);
