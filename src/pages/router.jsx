import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { Info } from "./info";

export const InfoRouter = () => {

    return (
        <Router>
            <Switch>
                <Link to="/" component={Info} />
            </Switch>
        </Router>
    )

}