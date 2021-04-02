import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './auth/Login';
import { UserList } from './user/UserList';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/users' component={UserList} />
          <Route exact path='/' component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
