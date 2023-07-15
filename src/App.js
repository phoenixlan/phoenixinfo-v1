import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

import { init } from '@phoenixlan/phoenix.js';
import { Info } from "./pages/info";

export const BASE_URL = process.env.REACT_APP_API_URL??"http://api.dev.phoenixlan.no:3000";

const initialize = () => {
  init(BASE_URL); //init(process.env.BASE_URL);
  if(process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
    });
  }
};
initialize();

export default function App() {
  return (
    <Info />
  );
}