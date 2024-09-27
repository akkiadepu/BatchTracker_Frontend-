import React from 'react'
import SubjectForm from '../SubjectForm'
import Header from '../Header'

function SubjectComponent() {
  return (
    <div>
        <Header/>
         <div className="form-column">
            
            <SubjectForm/>
          </div>

    </div>
  )
}

export default SubjectComponent