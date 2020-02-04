import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../actions/signOut";
import Deposits from "../Deposits";
import Vehicles from "./Vehicles";

class Home extends Component {
  handleLogout = () => {
    this.props.signOut();
  };

  render() {
    const { isSigningOut, signOutError } = this.props;

    return (
      <div>
        <Deposits/>
        <Vehicles/>
        <button onClick={this.handleLogout}>Logout</button>
        {isSigningOut && <p>Logging Out....</p>}
        {signOutError && <p>Error logging out</p>}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isSigningOut: state.signOut.isSigningOut,
    signOutError: state.signOut.signOutError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
