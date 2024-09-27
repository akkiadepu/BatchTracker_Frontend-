import React from 'react'
import Header from './Header'
import TrainerForm from './TrainerForm'
import BatchForm from './BatchForm'
import SubjectForm from './SubjectForm'
import RuningBatchForm from './RuningBatchForm'
import "./HomeStyle.css"
import RunningBatchTable from './RunningBatchTable'

function Home() {
  return (
    <div>
        <Header/>

        Home
        <div className="forms-container">
        {/* <div className="row"> */}
    
          <RunningBatchTable/>
        {/* </div> */}
       
      </div>



    </div>
  )
}

export default Home