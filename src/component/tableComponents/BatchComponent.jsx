import React from 'react'
import BatchForm from '../BatchForm'
import Header from '../Header'

function BatchComponent() {
  return (
    <div>
 <Header/>
<div className="form-column">
          <BatchForm />
          </div>
    </div>
  )
}

export default BatchComponent