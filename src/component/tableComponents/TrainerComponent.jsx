import React from 'react'
import TrainerForm from '../TrainerForm'
import Header from '../Header'

function TrainerComponent() {
  return (
    <div>
        <Header/>
        <div className="form-column">
            <TrainerForm />
          </div>

    </div>
  )
}

export default TrainerComponent