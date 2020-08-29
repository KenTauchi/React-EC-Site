import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import { auth } from "./firebase/firebase.utils";

import { Switch, Route } from "react-router-dom";

// const HatsPage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h1>HATS PAGE</h1>
//     </div>
//   );
// };

class App extends Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({
        currentUser: user,
      });
    });
  }
  // this.unsubscribeFromAuth now return a function. By attaching the () to the end of this.unsubscribeFromAuth,
  // the function which the auth.onAuthStateChanged(...) returned and got assigned to this.unsubscribeFromAuth gets called.
  // Since it is called in the componentWillUnmount method, when the App component unmounts, the channel to firebase gets closed.

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
