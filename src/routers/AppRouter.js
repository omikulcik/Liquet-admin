import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Admin from "../components/Admin";
import AddEvent from "../components/AddEvent";
import RegisteredTable from "../components/RegisteredTable";
import EditEvent from "../components/EditEvent"
import EditSingleEvent  from "../components/EditSingleEvent";


const AppRouter = () => (
    <div>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Admin} />
                <Route exact path="/addevent" component={AddEvent} />
                <Route exact path="/registeredtable" component={RegisteredTable} />
                <Route exact path="/editevent" component={EditEvent} />
                <Route exact path="/editevent/:eventkey" component={EditSingleEvent} />
            </div>
        </BrowserRouter>
    </div>
);

export default AppRouter;