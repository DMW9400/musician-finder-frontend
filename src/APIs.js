const fetches = {
  loginFetch: (username,password) => {
    return fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        token: localStorage.getItem('token')
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
    }).then(res => res.json())
  },
  editFetch: (username,password) => {
    return fetch('http://localhost:3000/api/v1/users/:id', {
      method: 'PATCH',
      headers: {
        'authorization': localStorage.getItem('token')
      }
    }).then(res => res.json())
  },
  fetchCurrentUser: () => {
    return fetch('http://localhost:3000/api/v1/active_user', {
      method: 'POST',
      headers: {
        'authorization': localStorage.getItem('token')
        }
    }).then(res => res.json())
  },
  fetchMessages: () => {
    return fetch('http://localhost:3000/api/v1/messages')
    .then(res => res.json())
  },
  fetchUserMessages: (recipientID) => {
    return fetch(`http://localhost:3000/api/v1/users/${recipientID}/messages`)
    .then(res => res.json())
  },
  fetchUserInstruments: (userID) => {
    return fetch(`http://localhost:3000/api/v1/users/${userID}/instruments`)
    .then(res => res.json())
  },
  sendMessage: (currentUser, recipient,message) => {
    return fetch(`http://localhost:3000/api/v1/messages`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        sender_id: currentUser,
        recipient_id: recipient,
        message: message
      })
    }).then(res=>res.json())
  }
}


export default fetches
