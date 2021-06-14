import "./App.css";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Logout from "./pages/logout";
import GameStart from "./pages/gameStart";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <ProtectedRoute exact path="/startGame" component={GameStart} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
