import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router'

class MessagePage extends React.Component{

  state = {
    body:'',
    recipientId:null
  }

  handleChange = (event) => {
    this.setState({
        body: event.target.value
    })
  }
  findById = () => {
       if (this.props.users.length > 0){
         let found = this.props.users[0].find((user) => {
          return user.id === parseInt(this.props.match.params.id)
        })
        return found
       }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.history.push(`/base/users`)
    return fetch(`http://localhost:3000/api/v1/messages`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        sender_id: this.props.currentUser.id,
        recipient_id: this.props.match.params.id,
        message: this.state.body
      })
    }).then(res=>res.json())
  }

  render(){
      if (this.props.users.length === 0) {
        return <div>Loading</div>
      }
      let username = this.findById().name
      return(
      <div>
        <label className="field-name"><span className="field-name" style={{display:'block', textAlign:'center', fontWeight:'bold'}}>Send Message to {username}</span></label>
        <TextField
          name='text-body'
          multiLine= 'true'
          onChange={this.handleChange}
          placeholder='                                         Your message here            '
          style={{width:'500px',
                  backgroundColor:'#B0BEC5'}}
        />
        <FlatButton id='submit-button' onClick={this.handleSubmit} style={{display:'block', margin: '0 auto'}} backgroundColor="#90A4AE" hoverColor='#B0BEC5' label="Submit" />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(MessagePage)
