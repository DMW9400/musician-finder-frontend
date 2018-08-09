const defaultState = {
  currentUser: null,
  users: [],
  instruments:[],
  artists:[],
  genres:[],
  userInstruments: [],
  userGenres:[],
  userArtists: []
}

export function rootReducer(state=defaultState,action){
  switch(action.type){
    case "SET_USER":
      console.log("SETTING USER", defaultState)
      return {...state, currentUser: action.payload}
    case "FETCH_USERS":
      return {...state, users: [...state.users, action.payload]}
    case "FETCH_INSTRUMENTS":
      return {...state, instruments:[...state.instruments, action.payload]}
    case "FETCH_ARTISTS":
      return {...state, artists:[...state.artists, action.payload]}
    case "FETCH_GENRES":
      return {...state, genres:[...state.genres, action.payload]}
    case "FETCH_USER_INSTRUMENTS":
      console.log("Fetch User Instruments reducers")
      return {...state, userInstruments:[...state.userInstruments, action.payload]}
    case "FETCH_USER_GENRES":
      return {...state, userGenres:[...state.userGenres, action.payload]}
    case "FETCH_USER_ARTISTS":
      return {...state, userArtists:[...state.userArtists, action.payload]}
    default:
      return state
  }
}
