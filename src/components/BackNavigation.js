import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { IconButton, Zoom } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackNavigation = (props) => {
    const paths = useLocation().pathname.split('/').filter(x => x);
    const backToLocation = paths.length > 1 ? paths[paths.length - 1] : paths.length === 1 ? '/' : null;

    return (
        <Zoom className={props.className} in={Boolean(backToLocation)}>
            <IconButton component={RouterLink} to={backToLocation ? backToLocation : '/'}>
                <ArrowBackIcon />
            </IconButton>
        </Zoom>
    );
};

export default withTranslation()(BackNavigation);