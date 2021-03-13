import { Route, Switch, HashRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

export const App: React.FC = ({}) => {
  return (
    <div style={{ marginTop:30, height:"100vh" }}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/mylist" component={MyList} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
