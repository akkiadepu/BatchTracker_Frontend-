
// import React, { useState } from 'react';
// import axios from 'axios';
// import "./TrainerStyle.css";

// function BatchForm() {
//   const [batchData, setBatchData] = useState({
//     name: '',
//     startDate: ''
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setBatchData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation check to ensure both fields are filled
//     if (batchData.name === '' || batchData.startDate === '') {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/batches`, {
//         name: batchData.name,
//         startDate: batchData.startDate
//       });

//       if (response.status === 200 || response.status === 201) {
//         console.log('Batch added successfully');
//         // Clear the input fields after submission
//         setBatchData({ name: '', startDate: '' });
//       } else {
//         console.error('Failed to add batch');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="form">
//         <div className="title">Let's create Batch Form</div>

//         <form onSubmit={handleSubmit}>
//           <div className="input-container ic1">
//             <input
             
//               type="text"
//               className="input"
//               id="name"
//               value={batchData.name}
//               onChange={handleChange}
//             />
//             <div className="cut" />
//             <label className="iLabel" htmlFor="name">Batch name</label>
//           </div>

//           <div className="input-container ic2">
//             <input
           
//               type="date"
//               className="input"
//               id="startDate"
//               value={batchData.startDate}
//               onChange={handleChange}
//             />
//             <div className="cut" />
//             <label className="iLabel" htmlFor="startDate">Start date</label>
//           </div>

//           <button className="submit" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BatchForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./TrainerStyle.css";
import BatchTable from './tableComponents/BatchTable';
import eventEmitter from './tableComponents/eventEmitter';
import Header from './Header';


function BatchForm() {
  const [batchData, setBatchData] = useState({
    name: '',
    startDate: '',
    locationId: ''
  });

  const [locations, setLocations] = useState([]); // To store the fetched locations

  // Fetch locations when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`);
        setLocations(response.data); // Assuming the response contains an array of locations
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBatchData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleLocationChange = (e) => {
    setBatchData(prevState => ({
      ...prevState,
      locationId: e.target.value // Store the selected location ID
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check to ensure all fields are filled
    if (batchData.name === '' || batchData.startDate === '' || batchData.locationId === '') {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/batches`, {
        name: batchData.name,
        startDate: batchData.startDate,
        location: {
          id: batchData.locationId // Send location ID to the backend
        }
      });


      if (response.status === 200 || response.status === 201) {
        console.log('Batch added successfully');
        // Clear the input fields after submission
        setBatchData({ name: '', startDate: '', locationId: '' });
      } else {
        console.error('Failed to add batch');
      }
      eventEmitter.emit('batchAdded', response.data);
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
        <div className="title">Let's create Batch Form</div>

        <form onSubmit={handleSubmit}>
          <div className="input-container ic1">
            <input
              type="text"
              className="input"
              id="name"
              value={batchData.name}
              onChange={handleChange}
            />
            <div className="cut" />
            <label className="iLabel" htmlFor="name">Batch name</label>
          </div>

          <div className="input-container ic2">
            <input
              type="date"
              className="input"
              id="startDate"
              value={batchData.startDate}
              onChange={handleChange}
            />
            <div className="cut" />
            <label className="iLabel" htmlFor="startDate">Start date</label>
          </div>

          <div className="input-container ic3">
            <select
              className="input"
              id="location"
              value={batchData.locationId}
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
      <div className="table-container"><BatchTable/></div>
     </div>
    </div>
  );
}

export default BatchForm;

