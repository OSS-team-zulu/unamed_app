import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Modal } from "react-bootstrap";

import AuthService from "./services/auth.service";

import MapComponent from "./components/Map/MapGeojsonMarkers.jsx";
import Register from "./components/Login/register.component";
import LoginWithRouter from "./components/Login/login.component";
import Profile from "./components/Login/profile.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      showAboutModal: false,
    };
  }
  showAboutModal = () => {
    this.setState({ showAboutModal: true })
  };

  closeModal() {
    this.setState({ showAboutModal: false })
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router>
        <div >
          <div>
            <nav className="navbar navbar-expand navbar-light bg-primary">
              <Link to={"/"} className="navbar-brand">
                Zulu App
                    </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/map"} className="nav-link">
                    Map
                        </Link>
                </li>


                <li className="nav-item" onClick={this.showAboutModal} style={{ cursor: 'pointer' }} >
                  <a className="nav-link">
                    About Us
                  </a>
                </li>

              </div>


              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      Logout
                        </a>
                  </li>
                </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                        </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                        </Link>
                    </li>
                  </div>
                )}
            </nav>

            <div >
              <Switch>
                <Route exact path={["/", "/map"]} component={MapComponent} />
                <Route exact path="/login" component={LoginWithRouter} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
            </div>
          </div>

        </div>

        <Modal id="about" position={[this.state.lat, this.state.lng]} show={this.state.showAboutModal} onHide={this.closeModal.bind(this)}>
          <b>Zulu - A Local exploration App</b><br />
          <i>A social platform that allows viewing stories based on geographical location</i><br />

          &bull; A local social app where people can share (anonymously or otherwise) personal histories attached to specific locations. Ranging from historical tidbits and recommendations to personal stories about life events or emotions connected to this location.<br />
          &bull; Users can become tourists in familiar locations, viewing the world through other's eyes, as well as a more intimate peak into<br />
          &bull; Main interface is a map of local stories.<br />
          <p style={{ marginLeft: '15px' }}>  - Only users in the immediate surroundings can be seen?</p>
        </Modal>
      </Router>


    );
  }
}

export default App;