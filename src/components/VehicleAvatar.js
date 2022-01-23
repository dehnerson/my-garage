import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CarIcon from '@material-ui/icons/DirectionsCar';


const VehicleAvatar = (props) => {
    const { sourceUrl, title } = props;

    const avatarContent = title ? title[0] : <CarIcon />;

    return (
        <Avatar variant='rounded' alt={title} src={sourceUrl}>{avatarContent}</Avatar>
    )
}

export default VehicleAvatar;
