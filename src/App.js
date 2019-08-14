import React, {Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // async componentDidMount() {
    
  //   this.setState({loading: true});

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({users: res.data, loading: false});
  // }


  searchUsers = async (text) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false});
  }

  // Get single user
  getUser = async (username) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false});
  }

  clearUsers = () => {
    this.setState({users: [], loading: false});
  }

  setAlert = (message, type) => {
    this.setState({alert: { message, type}});

    setTimeout(() => this.setState({alert: null}), 3000);
  }
  render() {
    const {users, user, loading } = this.state;
    return (
      <Router>
      <div className='App'>
        <Navbar></Navbar>
        <div className="container">
          <Alert alert={this.state.alert}></Alert>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true: false} setAlert={this.setAlert}></Search>
                <Users loading = {loading} users={users}></Users>
              </Fragment>
            )}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/user/:login' render={props => (
              <User { ...props} getUser={this.getUser} user={user} loading={loading}></User>
              
            )}></Route>
          </Switch>
          
        </div>
        
      </div>
      </Router>
    );
  }
  
}

export default App;
