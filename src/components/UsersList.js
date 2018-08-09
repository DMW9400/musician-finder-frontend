import React from 'react'
import User from './User'
import { connect } from 'react-redux'


class UsersList extends React.Component {

  renderUsers = () => {
    if (this.props.users.length > 0){
      return this.props.users[0].map(user=>{
        console.log(user)
        return <User key={user.id}
                     user={user}/>
      })
    }
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <h1>Our Musicians</h1>
        {this.renderUsers()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser:state.currentUser,
    users: state.users
  }
}

export default connect(mapStateToProps)(UsersList)
