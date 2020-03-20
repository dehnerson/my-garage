import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import VehicleListItem from './VehicleListItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CreateVehicleDialog from "./CreateVehicleDialog";


class MyVehiclesList extends Component {
  state = { createVehicleDialogOpen: false };

  handleCreateVehicleDialogOpen = () => {
    this.setState({ createVehicleDialogOpen: true });
  };

  handleCreateVehicleDialogClose = () => {
    this.setState({ createVehicleDialogOpen: false });
  };

  render() {
    const { myVehicles } = this.props;


    if (myVehicles && myVehicles.length > 0) {
      return (
        <div>
          <Typography component='h4' variant='h4'>My vehicles</Typography>
          <List>{myVehicles.map((item) => <VehicleListItem key={item.id} vehicle={item} />)}</List>
          <Fab color="primary" aria-label="add" onClick={this.handleCreateVehicleDialogOpen}>
            <AddIcon />
          </Fab>
          <CreateVehicleDialog open={this.state.createVehicleDialogOpen} handleClose={this.handleCreateVehicleDialogClose} />
        </div>
      )
    }

    return (
      <p>You don't have any vehicles!</p>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    signedInUid: state.firebase.auth.uid,
    myVehicles: state.firestore.ordered.myVehicles
  }
}

export default connect(mapStateToProps)(firestoreConnect(props => [{
  collection: 'vehicles',
  storeAs: 'myVehicles',
  where: [['creator', '==', props.signedInUid]]
}])
  (MyVehiclesList));
