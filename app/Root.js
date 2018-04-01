import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import weaverService from './services/weaverService';
import Start from './components/Start';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

class Root extends Component {
  state = { isConnected: false };

  componentDidMount() {
    weaverService.connect()
      .then(() =>
        this.setState({ isConnected: true })
      )
      .catch(err => alert(
        err.code
          ? err.message
          : 'Something went wrong')
      );
  }

  render() {
    return this.state.isConnected
      ? (
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="*" component={Start} />
            </Switch>
          </BrowserRouter>
        </Provider>
      )
      : (
        <div>Server in not loaded...</div>
      )
  }
}

export default Root;
