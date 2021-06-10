import "./App.css";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Logout from "./pages/logout";
import GameStart from "./pages/gameStart";
import GameScene from "./components/gameScene";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <ProtectedRoute exact path="/game" component={GameScene} />
        <ProtectedRoute exact path="/startGame" component={GameStart} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
