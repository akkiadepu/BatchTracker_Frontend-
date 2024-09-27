import React from 'react'
import "./TrainerDropStyle.css"

function TrainerDropDown() {
  return (
    <div>
         <div className="input-container ic2">
                <select className="dropdown">
                    <option value="">Select Trainer Name</option>
                    <option>Batch 1</option>
                    <option>Batch 2</option>
                    <option>Batch 3</option>
                    <option>Batch 4</option>
                </select>
                {/* <label className="iLabel">Batch Name</label> */}

            </div>

    </div>
  )
}

export default TrainerDropDown