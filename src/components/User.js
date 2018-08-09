import React from 'react'
import { Link } from 'react-router-dom'

const User = (props) => {
  console.log('User page props:', props)

    return(
      <div className='styled-div' >

          <Link to={`/base/users/${props.user.id}`} className="collection-item" style={{ textDecoration: 'none', borderBottom: 'blue', color:'#546E7A' }} key={props.user.id}>
              <h3>{props.user.name}</h3>
          </Link>

        <img src={props.user.image_url} alt='' ></img>
        <p>Plays: {props.user.played_instruments.map(instrument=><p>{instrument.name}</p>)}</p>
        <p>Age: {props.user.age}</p>
        <p>Borough: {props.user.borough}</p>
        <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src={props.user.top_song_url}></iframe>
        <Link to={`/base/users/${props.user.id}/message`} style={{display:'block', margin:'10px',fontWeight: 'bold',textDecoration: 'none', borderBottom: 'blue', color:'#546E7A'}}>
          Message {props.user.name}
        </Link>
      </div>
    )
}
export default User
