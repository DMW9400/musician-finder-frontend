import fetches from './APIs'

export const loginUser = (username, password) => {
  return function(dispatch){
    fetches.loginFetch(username, password)
    .then(json => {
      if(json.token){
        localStorage.setItem('token', json.token)
        dispatch({
          type: "SET_USER",
          payload: json
        })
      } else {
        console.log(json.error)
      }
    })
  }
}

export const editUser = (username, password) => {
  return fetches.editFetch(username,password)
}

export const dispatchCurrentUser = () => {
  return function(dispatch){
    fetches.fetchCurrentUser()
    .then(json => {
      dispatch({
        type: "SET_USER",
        payload: json
      })
    })
  }
}


export function fetchUsers(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/users').then(res=>res.json())
    .then(users => {
      dispatch({type:"FETCH_USERS", payload: users})
    })
  }
}

export function fetchInstruments(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/instruments').then(res=>res.json())
    .then(instruments => {
      dispatch({type:"FETCH_INSTRUMENTS", payload: instruments})
    })
  }
}
export function fetchArtists(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/artists').then(res=>res.json())
    .then(artists => {
      dispatch({type:"FETCH_ARTISTS", payload: artists})
    })
  }
}
export function fetchGenres(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/genres').then(res=>res.json())
    .then(genres => {
      dispatch({type:"FETCH_GENRES", payload: genres})
    })
  }
}
export function fetchUserInstruments(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/user_instruments').then(res=>res.json())
    .then(userInstruments => {
      dispatch({type:"FETCH_USER_INSTRUMENTS", payload: userInstruments})
    })
  }
}
export function fetchUserGenres(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/user_genres').then(res=>res.json())
    .then(userGenres => {
      dispatch({type:"FETCH_USER_GENRES", payload: userGenres})
    })
  }
}
export function fetchUserArtists(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/user_artists').then(res=>res.json())
    .then(userArtists => {
      dispatch({type:"FETCH_USER_ARTISTS", payload: userArtists})
    })
  }
}
