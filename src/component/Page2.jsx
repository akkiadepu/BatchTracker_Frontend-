import React from 'react'
import Header from './Header'
import "./Page2.css"
import TrainerDropDown from './Dropdown/TrainerDropDown'
import SubjectDropDown from './Dropdown/SubjectDropDown'
import BatchDropDown from './Dropdown/BatchDropDown'
import RuningBatchDropDown from './Dropdown/RuningBatchDropDown'
import RuningBatchForm from './RuningBatchForm'
import RunningBatchTable from './RunningBatchTable'


function Page2() {
    return (
        <div>
            <Header />

            <div className="form-container">
            <div className="row-container">
         
            {/* <RuningBatchDropDown/>

            <TrainerDropDown/>
         
            <SubjectDropDown/>
       
            <BatchDropDown/> */}

<RuningBatchForm />
            

        </div>

        
      </div>


        </div>
    )
}

export default Page2