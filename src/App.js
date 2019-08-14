import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
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

  clearUsers = () => {
    this.setState({users: [], loading: false});
  }

  setAlert = (message, type) => {
    this.setState({alert: { message, type}});

    setTimeout(() => this.setState({alert: null}), 3000);
  }
  render() {
    const {users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar></Navbar>
        <div className="container">
          <Alert alert={this.state.alert}></Alert>
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true: false} setAlert={this.setAlert}></Search>
          <Users loading = {loading} users={users}></Users>
        </div>
        
      </div>
      
    );
  }
  
}

export default App;
