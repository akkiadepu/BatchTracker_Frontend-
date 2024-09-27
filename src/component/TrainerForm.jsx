
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./TrainerStyle.css";
import TrainerTable from './tableComponents/TrainerTable';
import eventEmitter from './tableComponents/eventEmitter';
import Header from './Header';

function TrainerForm() {
  const [trainerData, setTrainerData] = useState({
    name: '',
    phone: '',
    locationId: ''
  });

  const [locations, setLocations] = useState([]); // To store locations from backend

  // Fetch locations when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`);
        setLocations(response.data); // Assuming response contains an array of locations
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTrainerData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleLocationChange = (e) => {
    setTrainerData(prevState => ({
      ...prevState,
      locationId: e.target.value // Store selected location ID
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (trainerData.name === '' || trainerData.phone === '' || trainerData.locationId === '') {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/trainers`, {
        name: trainerData.name,
        phone: trainerData.phone,
        location: {
          id: trainerData.locationId // Send location ID to backend
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Trainer added successfully');
        setTrainerData({ name: '', phone: '', locationId: '' }); // Reset form after submission
      } else {
        console.error('Failed to add trainer');
      }
      eventEmitter.emit('trainerAdded', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
       <Header/>
      <div className="subject-container">
      <div className="form-container">
      <div className="form1">
        <div className="title"> create TrainerForm</div>

        <div className="input-container ic1">
          <input
           
            type="text"
            className="input"
            id="name"
            value={trainerData.name}
            onChange={handleChange}
          />
          {/* <div className="cut" /> */}
          <label className="iLabel" htmlFor="name">Trainer name</label>
        </div>

        
        <div className="input-container ic2">
        
          <input
            type="text"
            className="input"
            id="phone"
            value={trainerData.phone}
            onChange={handleChange}
          />
          <label className="iLabel" htmlFor="phone">Mobile Number</label>
          {/* <div className="cut" /> */}

        </div>

        <div className="input-container ic3">
          <select
            className="input"
            id="location"
            value={trainerData.locationId}
            onChange={handleLocationChange}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          {/* <div className="cut" />
          <label className="iLabel" htmlFor="location">Location</label> */}
        </div>

        <button className="submit" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      
      
      </div>
      <div className="table-container"><TrainerTable/></div>
      </div>
     
      
    </div>
  );
}

export default TrainerForm;


