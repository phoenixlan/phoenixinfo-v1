import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Info } from "./pages/info";

export default function App() {
  return (
    <Router>
        <Route path="/">
          <Info />
        </Route>
    </Router>
  );
}