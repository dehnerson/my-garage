import React from 'react';
import { Route, Link as RouterLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Link, Breadcrumbs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    breadcrumbs: {
        marginBottom: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(2)
        }
    }
}));


const LinkRouter = props => <Link {...props} component={RouterLink} />;

const Breadcrumb = (props) => {
    const { t } = props;
    const classes = useStyles();

    return <Route>
        {({ location }) => {
            const pathnames = location.pathname.split('/').filter(x => x);

            return (
                <Breadcrumbs className={classes.breadcrumbs} aria-label="Breadcrumb">
                    <LinkRouter color="inherit" to="/">Home</LinkRouter>
                    {pathnames.map((value, index) => {
                        const last = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                        return last ? (<Typography color="textPrimary" key={to}>{t(value)}</Typography>) : (<LinkRouter color="inherit" to={to} key={to}>{t(value)}</LinkRouter>);
                    })}
                </Breadcrumbs>
            );
        }}
    </Route>
}

export default withTranslation()(Breadcrumb);