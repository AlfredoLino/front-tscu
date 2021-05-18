import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainProvider from "./Hooks.custom/MainProvider"
import Login from "./components/Login"
import Sign from "./components/Signin"
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles"
import './styles/App.css';
import Home from './components/Home';
import PrivateRoute from './components/Private/PrivateRoute';


const theme = createMuiTheme({
  palette: {
      primary: {
          main : "#02475e"
      },
      secondary: {
        main: "#687980"
      },
      warning: {
        main: "#f3bda1"
      },
      success: {
        main: "#02475e"
      }
  }
})
function App() {
  return (
      <ThemeProvider theme = {theme}>
        <MainProvider>
          <Router>
              <PrivateRoute component = {Home} path = "/" exact isPrivate/>
              <Route exact path = "/login">
                <Login regVariant = "log" />
              </Route>
              <Route exact path = "/sign">
                <Sign regVariant = "signin" ></Sign>
              </Route>

              
                
            <Switch>
            </Switch>
          </Router>
        </MainProvider>
      </ThemeProvider>
  );
}

export default App;
