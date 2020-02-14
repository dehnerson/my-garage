import React from 'react';
import { firestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import VehicleListItem from './VehicleListItem';


const MyVehiclesList = (props) => {
  const { myVehicles } = props;

  if (myVehicles && myVehicles.length > 0) {
    return (
      <div>
        <Typography component='h4' variant='h4'>My vehicles</Typography>
        <List>{myVehicles.map((item) => <VehicleListItem vehicle={item} />)}</List>
      </div>
    )
  }

  return (
    <p>You don't have any vehicles!</p>
  )
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
