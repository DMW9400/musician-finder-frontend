import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchUsers, fetchInstruments, fetchGenres, fetchArtists, fetchUserInstruments, fetchUserGenres, fetchUserArtists } from './actions'
import { withRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Container from './components/Container'
import UserInput from './components/UserInput'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


class App extends Component {

  componentDidMount(){
    this.props.fetchUsers()
    this.props.fetchInstruments()
    this.props.fetchGenres()
    this.props.fetchArtists()
    this.props.fetchUserInstruments()
    this.props.fetchUserGenres()
    this.props.fetchUserArtists()
    }



  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/create-user" component={UserInput}/>
            <Route path="/base" component={Container}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    users: state.users,
    currentUser: state.currentUser,
    instruments: state.instruments,
    artists: state.artists,
    genres: state.genres,
    userInstruments: state.userInstruments,
    userGenres: state.userGenres,
    userArtists: state.userArtists
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    fetchUsers: (user) => dispatch(fetchUsers(user)),
    fetchInstruments: (instrument) => dispatch(fetchInstruments(instrument)),
    fetchArtists: (artist) => dispatch(fetchArtists(artist)),
    fetchGenres: (genre) => dispatch(fetchGenres(genre)),
    fetchUserInstruments: (userInstrument) => dispatch(fetchUserInstruments(userInstrument)),
    fetchUserGenres: (userGenre) => dispatch(fetchUserGenres(userGenre)),
    fetchUserArtists: (userArtist) => dispatch(fetchUserArtists(userArtist))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
