import React from 'react'
import "./HeaderStyle.css";
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
          <header>
        <div className="container">
            <nav>
                <ul>
                    <li> <NavLink to="/">Home</NavLink> </li>
                    <li> <NavLink to="/page2">Runing Batchs</NavLink>  </li>
                    <li> <NavLink to="/TrainerForm">Trainer</NavLink>  </li>
                    <li> <NavLink to="/SubjectForm">Subject</NavLink>  </li>
                    <li> <NavLink to="/BatchForm">Batch</NavLink>  </li>
                </ul>
            </nav>
            
        </div>
    </header>
    </div>
  )
}


export default Header