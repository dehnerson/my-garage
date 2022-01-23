import React, { useState } from "react";
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListSubheader, Fab, Tooltip, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import VehicleListItem from './VehicleListItem';
import CreateVehicleDialog from "./CreateVehicleDialog";


const useStyles = makeStyles((theme) => ({
  noVehiclesHint: {
    alignSelf: 'center',
    margin: theme.spacing(6, 2, 2, 3)
  }
}));


const VehicleList = (props) => {
  const [createVehicleDialogOpen, setCreateVehicleDialogOpen] = useState(false);

  const { t, title, vehicles, showFab } = props;

  const classes = useStyles();

  let content;

  if (vehicles && vehicles.length > 0) {
    content =
      <List subheader={<ListSubheader>{title}</ListSubheader>}>
        {vehicles.map((item) => <VehicleListItem key={item.id} vehicle={item} />)}
      </List>;
  } else {
    content = <Typography variant='body1' className={classes.noVehiclesHint}>You don't have any vehicles!</Typography>;
  }

  return (
    <Paper component={"section"}>
      {content}
      {showFab &&
        <Tooltip title={t('createVehicle')}>
          <Fab color="primary" aria-label="add" aria-haspopup="true" onClick={e => setCreateVehicleDialogOpen(true)}><AddIcon /></Fab>
        </Tooltip>
      }
      <CreateVehicleDialog open={createVehicleDialogOpen} handleClose={e => setCreateVehicleDialogOpen(false)} />
    </Paper>
  )
}


export default withTranslation()(VehicleList);
