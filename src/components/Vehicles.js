import React, { Component } from 'react';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from 'react-redux';


class Vehicles extends Component {
  render() {
    console.log(this.props);

    return (
      <div className="dashboard container">
        <div className="row">
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signedInUid: state.firebase.auth.uid,
    myVehicles: state.firestore.ordered.myVehicles
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'vehicles',
      storeAs: 'myVehicles',
      where: [['creator', '==', props.signedInUid]]
    }
  ])
)(Vehicles);
