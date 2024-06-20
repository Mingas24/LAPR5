import React from "react";
import CreateTab from "./components/Tabs/CreateTab";
import HomePage from "./components/Tabs/HomePage";
import AdminPage from "./components/Tabs/AdminPage";
import UserPage from "./components/Tabs/UserPage";
import DriverType from "../src/components/UI/CreateDriverType";
import VehicleType from "../src/components/UI/CreateVehicleType";
import Line from "../src/components/UI/CreateLine";
import ImportMDR from "../src/components/UI/Import";
import ImportMDV from "../src/components/UI/ImportMDV";
import Node from "../src/components/UI/CreateNode";
import Path from "../src/components/UI/CreatePath";
import AStar from "../src/components/UI/AStar";
import Driver from "../src/components/UI/CreateDriver";
import Vehicle from "../src/components/UI/CreateVehicle";
import VehicleService from "../src/components/UI/CreateVehicleService";
import CrewService from "../src/components/UI/CreateCrewService";
import Register from "../src/components/UI/Register";
import Login from "../src/components/UI/Login";
import TermsOfUse from "../src/components/UI/TermsOfUse";
import PrivacyPolicy from "../src/components/UI/PrivacyPolicy";
import DriverDuty from "../src/components/UI/DriverDuty";
import Trip from "./components/UI/CreateTrip";
import TripsToLine from "./components/UI/CreateTripsToLine";
import Workblock from "./components/UI/CreateWorkblock";
import ListTab from "./components/Tabs/ListTab" 
import ImportTab from "./components/Tabs/ImportTabs"
import ListVS from "./components/UI/List/ListVehicleService";
import ListPath from "./components/UI/List/ListPathByLine";
import ListNodes from "./components/UI/List/ListNodes";
import ListLines from "./components/UI/List/ListLines";
import ListCS from "./components/UI/List/ListCrewServiceByDate";
import "../src/App.css";
import ViewMap from "./components/map";
import DeleteAccount from "../src/components/UI/DeleteAccount";
import Logout from "../src/components/UI/Logout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import NormalTabs from "./components/Tabs/NormalUserTabs";
// import AdminTabs from "./components/Tabs/AdminTabs";


function App() {
  return (
    <div className="appNav" data-testid="appNavTest">
      <div className="Logo" data-testid="logoTest">
        <img
          class="ISEP_image"
          src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Isep-logo.png"
          alt="ISEP"
        />
        <img
          class="Paredes_image"
          src="https://www.heraldry-wiki.com/arms/websites/Portugal/www.fisicohomepage.hpg.ig.com.br/images/PRD1.gif"
          alt="Paredes_Logo"
        />
      </div>
      <br />
      <br />
      <Router>
        {/* <Newtab /> */}
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin/" exact component={AdminPage} />
          <Route path="/user/" exact component={UserPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/termsOfUse" exact component={TermsOfUse} />
          <Route path="/privacyPolicy" exact component={PrivacyPolicy} />
          <Route path="/admin/create" exact component={CreateTab} />
          <Route path="/map" exact component={ViewMap} />
          <Route path="/admin/create/node" exact component={Node} />
          <Route path="/admin/create/path" exact component={Path} />
          <Route path="/admin/create/line" exact component={Line} />
          <Route path="/admin/create/vehicle" exact component={Vehicle} />
          <Route path="/admin/create/vehicleService" exact component={VehicleService}/>
          <Route path="/admin/create/vehicleType" exact component={VehicleType} />
          <Route path="/admin/create/driver" exact component={Driver} />
          <Route path="/admin/create/driverType" exact component={DriverType} />
          <Route path="/admin/import" exact component={ImportTab} />
          <Route path="/admin/import/importMDR" exact component={ImportMDR} />
          <Route path="/admin/import/importMDV" exact component={ImportMDV} />
          <Route path="/admin/bestPath" exact component={AStar} />
          <Route path="/admin/driverDuty" exact component={DriverDuty} />
          <Route path="/admin/create/trip" exact component={Trip} />
          <Route path="/admin/create/trips" exact component={TripsToLine} />
          <Route path="/admin/create/workblock" exact component={Workblock} />
          <Route path="/admin/create/crewService" exact component={CrewService} />
          <Route path="/list" exact component={ListTab} />
          <Route path="/list/listVS" exact component={ListVS} />
          <Route path="/list/listPath" exact component={ListPath} />
          <Route path="/list/listNodes" exact component={ListNodes} />
          <Route path="/list/listLines" exact component={ListLines} />
          <Route path="/list/listCS" exact component={ListCS} />
          <Route path="/deleteAccount" exact component={DeleteAccount} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
