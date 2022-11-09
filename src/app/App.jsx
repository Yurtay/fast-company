import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Users from "./components/users";
import TestUser from "./components/testUser";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact render={() => <h1>Main page</h1>} />
        <Route path="/login" exact render={() => <h1>Login page</h1>} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/:postId">
          {(props) => <TestUser params={props} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
