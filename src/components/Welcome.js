import React from 'react'
import ReactPlayer from 'react-player'

const Welcome = () => {
  return(
      <div>
        <h1 style={{marginTop:'90px', marginBottom:'80px'}}>Welcome to Musician Finder</h1>
        <ReactPlayer style={{margin:'0 auto'}} width='60%' height='60%' url='https://storage.googleapis.com/coverr-main/mp4/Ma-Vibes.mp4' playing  />
      </div>
  )
}
export default Welcome
