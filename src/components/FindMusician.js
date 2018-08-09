import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class FindMusician extends React.Component {

  state={
    shared_artists:'',
    shared_genres:'',
    instrument_match:'',
    submitted:null
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    }, ()=>console.log(this.state))
  }

  sortUsers = () => {
    let ranking = {}
    if(this.props.users.length > 0){
      this.props.users[0].map(user => {
        if(user.name !== this.props.currentUser.name ){
        ranking[user.name] = {
          id: user.id,
          shared_artists:0,
          shared_genres:0,
          instrument_match:0
        }

        user.played_instruments.map(playedInst =>{
          let seekingInstrumentsIDS = this.props.currentUser.seeking_instruments.map(instrument=>instrument.id)
          if (seekingInstrumentsIDS.includes(playedInst.id)){
            ranking[user.name].instrument_match ++
          }
        })

        user.genres.map(genre =>{
          let genreIDs = this.props.currentUser.genres.map(genre=>genre.id)
          if (genreIDs.includes(genre.id)){
            ranking[user.name].shared_genres ++
          }
        })

        user.artists.map(artist =>{
          let artistIDs = this.props.currentUser.artists.map(artist=>artist.id)
          if (artistIDs.includes(artist.id)){
            ranking[user.name].shared_artists ++
          }
        })
      }
      })
    }

    return ranking
  }

  prioritizeUsersViaArtists = () => {
    let ranking = this.sortUsers()
    if (Object.keys(ranking).length > 0){
      // console.log("ARTIST MULTIPLIER (1)  HIT!")
      if (this.state.shared_artists === '1'){
          console.log("ARTIST RANKING IS ONE")
        this.keyAlteration(ranking,"shared_artists",3)
      }else if(this.state.shared_artists === '2'){
        this.keyAlteration(ranking,"shared_artists",2)
      }else if(this.state.shared_artists === '3') {
        this.keyAlteration(ranking,"shared_artists",1)
      }
      return ranking
    }
  }

  prioritizeUsersViaGenres = () => {
    let ranking = this.prioritizeUsersViaArtists()
      // console.log("GENRE MULTIPLIER (2)  HIT!")
    if (this.state.shared_genres === '1'){
        console.log("GENRE RANKING IS ONE")
      this.keyAlteration(ranking,"shared_genres",3)
    }else if(this.state.shared_genres === '2'){
      this.keyAlteration(ranking,"shared_genres",2)
    }else if(this.state.shared_genres === '3') {
      this.keyAlteration(ranking,"shared_genres",1)
    }
    return ranking
  }

  prioritizeUsersViaInstruments = () => {
    let ranking = this.prioritizeUsersViaGenres()
      // console.log("INSTRUMENT MULTIPLIER (3)  HIT!")
    if (this.state.instrument_match === '1'){
      console.log("INSTRUMENT RANKING IS ONE")
      this.keyAlteration(ranking,"instrument_match",5)
    }else if(this.state.instrument_match === '2'){
      this.keyAlteration(ranking,"instrument_match",2)
    }else if(this.state.instrument_match === '3') {
      this.keyAlteration(ranking,"instrument_match",1)
    }

    console.log("Rankings: ", ranking)
    return ranking
  }

  keyAlteration = (object, term, increment) => {
    // console.log("KEY ALTERATION TRIGGERED")
    for(let user in object){
      for(let key in object[user]){
        if (key===term){
          object[user][key]*=increment
        }
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      submitted: true
    })
  }

  sortFinalRanking = () => {
    let ranking = this.prioritizeUsersViaInstruments()
    let returnObject = {}
    let tally = 0

    for (let user in ranking){
      for (let key in ranking[user]){
        if (key === "shared_artists" || key === "shared_genres" || key === "instrument_match" ){
          // console.log(ranking[user][key])
          tally += ranking[user][key]
          returnObject[user] = tally
        }
      }
      tally = 0
      // console.log("user scores: ",ranking)
    }
    console.log("user totals: ", returnObject)
    let keys = Object.keys(returnObject)
    keys.sort(function(a, b) { return returnObject[a] - returnObject[b] });
    const sortedNames = keys.reverse()
    console.log("Sorted names:", sortedNames)
    return sortedNames
  }

  renderFoundMusicians(){
    if (this.state.submitted===true){
      let musicianReturn = []
      let sortedMusicians = this.sortFinalRanking()
      let musicianRender = this.props.users[0].filter(user=>{
        return sortedMusicians.includes(user.name)
      })
      let topMatch = this.props.users[0].filter(user =>{
        return user.name === sortedMusicians[0]
      })
      let secondMatch = this.props.users[0].filter(user =>{
        return user.name === sortedMusicians[1]
      })
      let thirdMatch = this.props.users[0].filter(user =>{
        return user.name === sortedMusicians[2]
      })
      let fourthMatch = this.props.users[0].filter(user =>{
        return user.name === sortedMusicians[3]
      })
      let fifthMatch = this.props.users[0].filter(user =>{
        return user.name === sortedMusicians[4]
      })

      let matchArray = [topMatch,secondMatch,thirdMatch,fourthMatch,fifthMatch]
      console.log(matchArray)
      return (
        <ul>
          {matchArray.map(match=>{
            return (
              <div>
                <Link to={`/base/users/${match[0].id}`} className="collection-item" key={match[0].id} style={{display:'block', margin:'10px',textDecoration: 'none', borderBottom: 'blue', color:'#37474F'}}>
                    {match[0].name}
                </Link>
                <img src={match[0].image_url} alt='' ></img>
                <p>Age: {match[0].age}</p>
                <p>Plays: {match[0].played_instruments.map(instrument=><li>{instrument.name}</li>)}</p>
                <p>Borough: {match[0].borough}</p>
                <Link to={`/base/users/${match[0].id}/message`} style={{display:'block', margin:'10px',fontWeight:'bold',textDecoration: 'none', borderBottom: 'blue', color:'#37474F'}}>
                  Message {match[0].name}
                </Link>
              </div>
            )
          })
        }
        </ul>
      )
  }
}

  render(){
    console.log("Full Users: ", this.props.users)
    this.prioritizeUsersViaInstruments()
    this.sortFinalRanking()
    return(
      <div>
        <h1 style={{marginTop:'100px'}}>Find your Musical Match!</h1>
        <h3>Prioritize the following criteria on a scale of 1-3:</h3>
        <form onSubmit={this.handleSubmit} style={{marginTop:'80px'}}>
          <label className="field-name"><span className="field-name">Listens to artists you like:</span>
          <TextField
            name='shared_artists'
            onChange={this.handleChange}
          /></label>
          <label className="field-name"><span className="field-name">Listens to genres you like:</span>
          <TextField
            name='shared_genres'
            onChange={this.handleChange}
          />
          </label>
          <label className="field-name"><span className="field-name">Plays an instrument you're looking for:</span>
          <TextField
            name='instrument_match'
            onChange={this.handleChange}
          /></label>
        </form>
          <FlatButton id='submit-button' onClick={this.handleSubmit} backgroundColor="#90A4AE" hoverColor='#B0BEC5' label="Submit" />
        {this.renderFoundMusicians()}
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

export default connect(mapStateToProps)(FindMusician)
