import React from "react";
import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import VehicleList from "./VehicleList";


const useStyles = makeStyles((theme) => ({
    spacer: {
        marginTop: theme.spacing(3)
    }
}));


const VehicleLists = (props) => {
    const { t } = props;

    const classes = useStyles();

    const myVehicles = useSelector(state => state.firestore.ordered.myVehicles);
    const vehiclesSharedWithMe = useSelector(state => state.firestore.ordered.vehiclesSharedWithMe);

    return (
        <article>
            <VehicleList title={t('myVehicles')} vehicles={myVehicles} showFab={true} />
            {vehiclesSharedWithMe && vehiclesSharedWithMe.length > 0 &&
                < VehicleList title={t('vehiclesSharedWithMe')} vehicles={vehiclesSharedWithMe} paperProps={{ className: classes.spacer }} />
            }
        </article>
    )
}


export default withTranslation()(VehicleLists);
