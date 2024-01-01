import React from 'react'
import Notes from './Notes'

const Home =(props) =>{
  let {switchAlert} =props;
  return (
    <div>
      <Notes switchAlert={switchAlert}/>
    </div>
  )
}

export default Home