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
      }
  }
})
function App() {
  return (
      <ThemeProvider theme = {theme}>
        <MainProvider>
          <Router>
              <Route exact path = "/login">
                <Login regVariant = "log" />
              </Route>
              <Route exact path = "/sign">
                <Sign regVariant = "signin" ></Sign>
              </Route>
              <Route exact path = "/">
                <Home />
              </Route>
            <Switch>
            </Switch>
          </Router>
        </MainProvider>
      </ThemeProvider>
  );
}

export default App;
