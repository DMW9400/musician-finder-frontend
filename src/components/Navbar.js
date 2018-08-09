import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';

class Navbar extends React.Component {

  state = {
    currentUser:null
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      currentUser: nextProps.currentUser
    })
  }

  logout = () => {
    localStorage.clear()
      this.props.history.push('/login')
  }


  render(){
    if (!this.state.currentUser){
      return (<div>Loading</div>)
    }else {
      this.state.curentUser ?  console.log('current user: ', this.state.currentUser) : console.log('No user', this.state.currentUser)
      const linkstyle = {textDecoration: 'none', borderBottom: 'blue', color:'#546E7A', margin:'10px', display:'inline-block'}
      return(
        <header className="nav-wrapper" style={{backgroundColor:'#BDBDBD', margin:'0px',paddingTop: '0px'}} >
          <nav style={{backgroundColor:'#BDBDBD',margin:'0px',paddingTop: '0px'}}>
            <ul id='navbar-ul'>
              <li className='nav'><Link to={`/base/users/${this.state.currentUser.id}`} style={linkstyle}>View Profile</Link></li>
              <li className='nav'><Link to="/base/users" style={linkstyle}>View Users</Link></li>
              <li className='nav'><Link to="/base/findmusician" style={linkstyle}>Find Musician</Link></li>
              <li className='nav'><a href="/base/my_messages" style={linkstyle}>My Messages</a></li>
              <li className='nav'><a href="/base/edit" style={linkstyle}>Edit Profile</a></li>
              <FlatButton onClick={this.logout} label="Logout" backgroundColor="#90A4AE" />
            </ul>
          </nav>
        </header>
      )
    }
  }

}
const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(Navbar)
