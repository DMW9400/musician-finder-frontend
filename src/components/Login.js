import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import './ComponentCss.css'

class Login extends React.Component{
  state = {
    username: '',
    password: ''
  }
  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.loginUser(this.state.username, this.state.password)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentUser){
      this.props.history.push('/base')
    }

  }

  render(){
    console.log('login props: ', this.props)
    return(
      <div style={{display: 'table', width: '100%'}}>
        <h1 style={{marginTop:'400px'}}>Welcome to Musician Finder</h1>
        <h2 className='header1' style={{marginTop:'80px'}}>User Login</h2>

        <form onSubmit={this.handleSubmit} style={{marginTop:'30px'}} >
          <label>Username: </label>
          {/* <input onChange={this.handleChange} name="username"></input> */}
          <TextField
            name='username'
            onChange={this.handleChange}
          />
          <label>Password: </label>
          <TextField
            name='password'
            type='password'
            onChange={this.handleChange}
          />
          {/* <input type="password" onChange={this.handleChange} name="password"></input> */}
          <FlatButton  onClick={this.handleSubmit} backgroundColor="#90A4AE" hoverColor='#B0BEC5' label="Submit" />
        </form>
        <Link to="/create-user" style={{ textDecoration: 'none', borderBottom: 'blue', color:'#546E7A' }}>Not registered? Create a Profile</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps, {loginUser})(Login)
