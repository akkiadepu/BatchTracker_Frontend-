
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./TrainerStyle.css";
import SubjectTable from './tableComponents/SubjectTable';
import eventEmitter from './tableComponents/eventEmitter';
import Header from './Header';

function SubjectForm() {
  const [subjectData, setSubjectData] = useState({
    name: '',
    locationId: ''
  });

  const [locations, setLocations] = useState([]); 

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`);
        setLocations(response.data); 
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
 
  }, []);

  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSubjectData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleLocationChange = (e) => {
    setSubjectData(prevState => ({
      ...prevState,
      locationId: e.target.value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (subjectData.name === '' || subjectData.locationId === '') {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/subjects`, {
        name: subjectData.name,
        location: {
          id: subjectData.locationId 
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Subject added successfully');
      
        setSubjectData({ name: '', locationId: '' });
       
      } else {
        console.error('Failed to add subject');
      }
      eventEmitter.emit('subjectAdded', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Header/>
    <div className="subject-container">
      <div className="form-container">
      <div className="form1">
        <div className="title">Create Subject Form</div>
        <form onSubmit={handleSubmit}>
          <div className="input-container ic1">
            <input
              type="text"
              className="input"
              id="name"
              value={subjectData.name}
              onChange={handleChange}
            />
            <div className="cut" />
            <label className="iLabel" htmlFor="name">Subject name</label>
          </div>

          <div className="input-container ic2">
            <select
              className="input"
              id="location"
              value={subjectData.locationId}
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

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
        </div>
        </div>
      
      <div className="table-container"><SubjectTable/></div>
      
   
    </div>
    </>
  );
}

export default SubjectForm;

