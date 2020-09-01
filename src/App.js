import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser as importedSetCurrentUser } from "./redux/user/user.actions";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("userAuth", userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });

    // the first setCurrentUser is for when logging in, and we check for a userRef object, whereas the second one is for when logging out and get null as the userAuth and store that in the user reducer to update it to null.
  }
  // auth.onAuthStateChanged returns an object that contains user data.

  // this.unsubscribeFromAuth now return a function. By attaching the () to the end of this.unsubscribeFromAuth,
  // the function which the auth.onAuthStateChanged(...) returned and got assigned to this.unsubscribeFromAuth gets called.
  // Since it is called in the componentWillUnmount method, when the App component unmounts, the channel to firebase gets closed.

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(importedSetCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
