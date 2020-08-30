import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import { auth, createProfileDocument } from "./firebase/firebase.utils";

import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("userAuth", userAuth);
      if (userAuth) {
        const userRef = await createProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
      }
      this.setState({
        currentUser: userAuth,
      });
    });
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
