import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser as importedSetCurrentUser } from "./redux/user/user.actions";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // the reason why this.props gets setCurrentUser here is because "mapDispatchToProps" dispatches user actions I can map to the props in the App component.
    // So this.props.setCurrentUser returns a function: that takes (user) as an argument and returns dispatch(importedSetCurrentUser(user). Find more about this (user) at the "mapDispatchToProps" section.

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
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(importedSetCurrentUser(user)),
});
// this is an anonymous function, so importedSetCurrentUser can take whatever the argument passed to it.

export default connect(mapStateToProps, mapDispatchToProps)(App);
