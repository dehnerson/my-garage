import React from "react";
import { withTranslation } from 'react-i18next';
import { List, ListSubheader, ListItem, ListItemText, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(7),
    }
}));


const MaintenanceProcedures = (props) => {
    const { procedures, t } = props;
    const classes = useStyles();

    return (
        <List disablePadding subheader={<ListSubheader inset>{t('procedures')}</ListSubheader>}>
            {Array.isArray(procedures) && procedures.length > 0 &&
                procedures.map((item, index) =>
                    <ListItem key={index} button className={classes.nested}>
                        <ListItemText inset primary={item.fields?.work} secondary={item.fields?.description} />
                    </ListItem>
                )
            }
        </List>
    )
}

export default withTranslation()(MaintenanceProcedures);
