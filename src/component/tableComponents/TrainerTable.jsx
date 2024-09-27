// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./TrainerTable.css"

// function TrainerTable() {
//   const [trainers, setTrainers] = useState([]);
//   const [editTrainer, setEditTrainer] = useState(null);
//   const [formData, setFormData] = useState({ name: '', phone: '', locationId: '' });
//   const [editTrainerId, setEditTrainerId] = useState(null);

//   // Fetch data from the backend
//   useEffect(() => {
//     axios.get('http://localhost:8080/trainers')
//       .then(response => {
//         setTrainers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching trainers:', error);
//       });
//   }, []);

//   // Update handler (you'll need to customize this with your update logic)
//   const handleUpdate = (trainer) => {
//     setEditTrainer(trainer);
//     setFormData({
//       name: trainer.name,
//       phone: trainer.phone,
//       locationId: trainer.location.id,
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editTrainerId) {
//       axios.put(`http://localhost:8080/trainers/${editTrainerId}`, {
//         name: formData.name,
//         phone: formData.phone,
//         location: { id: formData.locationId }
//       })
    
//       .then(response => {
//         setTrainers(trainers.map(trainer => (trainer.id === editTrainer.id ? response.data : trainer)));
//         setEditTrainer(null);
//         setFormData({ name: '', phone: '', locationId: '' });
//       })
//       .catch(error => {
//         console.error('Error updating trainer:', error);
//       });
//     }
//   };

//   // Delete handler
//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:8080/trainers/${id}`)
//       .then(() => {
//         setTrainers(trainers.filter(trainer => trainer.id !== id));
//       })
//       .catch(error => {
//         console.error('Error deleting trainer:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Trainer List</h2>
//       <table border="1" cellPadding="10" cellSpacing="0" className="trainer-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Location</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainers.map(trainer => (
//             <tr key={trainer.id}>
//               {editTrainerId === trainer.id ? (
//                 <>
//                   <td>{trainer.id}</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="locationId"
//                       value={formData.locationId}
//                       onChange={handleChange}
//                       required
//                     />
//                   </td>
//                   <td>
//                     <button type="button" onClick={handleSubmit}>Save</button>
//                     <button type="button" onClick={() => setEditTrainerId(null)}>Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{trainer.id}</td>
//                   <td>{trainer.name}</td>
//                   <td>{trainer.phone}</td>
//                   <td>{trainer.location.name}</td>
//                   <td>
//                     <button onClick={() => handleUpdate(trainer)}>Update</button>
//                     <button onClick={() => handleDelete(trainer.id)}>Delete</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TrainerTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./TrainerTable.css"

// function TrainerTable() {
//   const [trainers, setTrainers] = useState([]);
//   const [editTrainerId, setEditTrainerId] = useState(null);
//   const [formData, setFormData] = useState({ name: '', phone: '', locationId: '' });

//   // Fetch data from the backend
//   useEffect(() => {
//     const fetchTrainers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/trainers');
//         setTrainers(response.data);
//       } catch (error) {
//         console.error('Error fetching trainers:', error);
//       }
//     };

//     fetchTrainers();
//   }, []);

//   // Update handler
//   const handleUpdate = (trainer) => {
//     setEditTrainerId(trainer.id);
//     setFormData({
//       name: trainer.name,
//       phone: trainer.phone,
//       locationId: trainer.location.id,
//     });
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Submit the update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editTrainerId) {
//       try {
//         const response = await axios.put(`http://localhost:8080/trainers/${editTrainerId}`, {
//           name: formData.name,
//           phone: formData.phone,
//           location: { id: formData.locationId }
//         });
//         console.log('Update response:', response.data); // Debug log
//         // Update the trainers list with the updated trainer
//         setTrainers(trainers.map(trainer => 
//           trainer.id === editTrainerId ? response.data : trainer
//         ));
//         // Reset editing state
//         setEditTrainerId(null);
//         setFormData({ name: '', phone: '', locationId: '' });
//       } catch (error) {
//         console.error('Error updating trainer:', error);
//       }
//     }
//   };

//   // Delete handler
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/trainers/${id}`);
//       setTrainers(trainers.filter(trainer => trainer.id !== id));
//     } catch (error) {
//       console.error('Error deleting trainer:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Trainer List</h2>
//       <table border="1" cellPadding="10" cellSpacing="0" className="trainer-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Location</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainers.map(trainer => (
//             <tr key={trainer.id}>
//               {editTrainerId === trainer.id ? (
//                 <>
//                   <td>{trainer.id}</td>
//                   <td>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       name="locationId"
//                       value={formData.locationId}
//                       onChange={handleChange}
//                       required
//                     />
//                   </td>
//                   <td>
//                     <button type="button" onClick={handleSubmit}>Save</button>
//                     <button type="button" onClick={() => setEditTrainerId(null)}>Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{trainer.id}</td>
//                   <td>{trainer.name}</td>
//                   <td>{trainer.phone}</td>
//                   <td>{trainer.location.name}</td>
//                   <td>
//                     <button onClick={() => handleUpdate(trainer)}>Update</button>
//                     <button onClick={() => handleDelete(trainer.id)}>Delete</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TrainerTable;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrainerTable.css';
import eventEmitter from './eventEmitter';

function TrainerTable() {
  const [trainers, setTrainers] = useState([]);
  const [editRowId, setEditRowId] = useState(null); 
  const [editData, setEditData] = useState({ id: '', name: '', phone: '', location: '', locationId: '' });
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [nameFilter, setNameFilter] = useState(''); // State for name filter
  const [locationFilter, setLocationFilter] = useState(''); // State for location filter
  const [locations, setLocations] = useState([]); 

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trainers`);
      setTrainers(response.data);
      setFilteredTrainers(response.data); // Initialize filteredTrainers
      const locationResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`);
      setLocations(locationResponse.data); // Fetch locations for dropdown
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  useEffect(() => {
    fetchTrainers();
    const handleTrainerAdded = (newTrainer) => {
      setTrainers((prevTrainers) => [...prevTrainers, newTrainer]);
    };

    eventEmitter.on('trainerAdded', handleTrainerAdded);


    return () => {
      eventEmitter.off('trainerAdded', handleTrainerAdded);
    };
  }, []);

  useEffect(() => {
    // Filter trainers based on selected name and location
    const filtered = trainers.filter(trainer => {
      const matchesName = nameFilter ? trainer.name.includes(nameFilter) : true;
      const matchesLocation = locationFilter ? trainer.location.name === locationFilter : true;
      return matchesName && matchesLocation;
    });
    setFilteredTrainers(filtered);
  }, [nameFilter, locationFilter, trainers]); // Depend on filters and trainers

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocationFilter(selectedLocation);
    setNameFilter(''); // Reset name filter when location changes

    // Update filtered trainers based on selected location
    const filtered = trainers.filter(trainer => trainer.location.name === selectedLocation);
    setFilteredTrainers(filtered);
  };

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    setNameFilter(selectedName);

    // Update locationFilter based on selected name
    const trainer = trainers.find(trainer => trainer.name === selectedName);
    setLocationFilter(trainer ? trainer.location.name : '');
  };



  const handleEdit = (trainer) => {
    setEditRowId(trainer.id); 
    setEditData({
      id: trainer.id,
      name: trainer.name,
      phone: trainer.phone,
      location: trainer.location.name, 
      locationId: trainer.location.id  
    });
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  
  const handleSave = async (trainerId) => {
    try {
      
      const updatedTrainer = {
        id: editData.id,
        name: editData.name,
        phone: editData.phone,
        location: {
          id: editData.locationId,   
          name: editData.location    
        }
      };


      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/trainers/${trainerId}`, updatedTrainer);

      // Exit editing mode and refresh data
      fetchTrainers();
      setEditRowId(null); // Reset edit mode
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditRowId(null); // Exit editing mode
    setEditData({ id: '', name: '', phone: '', location: '', locationId: '' }); // Reset editData
  };

  // Delete function
  const handleDelete = async (trainerId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/trainers/${trainerId}`);
      console.log('Trainer deleted successfully');
      fetchTrainers(); // Refresh the data
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  return (
    <div>
      <h2>Trainer List</h2>
      


<table border="1" cellPadding="10" cellSpacing="0" className="trainer-table">
        <thead>
          <tr>
            <th>
              <select value={nameFilter} onChange={handleNameChange}>
                <option value="">All Names</option>
                {Array.from(new Set(filteredTrainers.map(trainer => trainer.name))).map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </select>
            </th>
            <th>number</th>
            <th>
              <select value={locationFilter} onChange={handleLocationChange}>
                <option value="">All Locations</option>
                {Array.from(new Set(filteredTrainers.map(trainer => trainer.location.name))).map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <tr key={trainer.id}>
                {editRowId === trainer.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        className="inputTrainer"
                        value={editData.name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phone"
                        className="inputTrainer"
                        value={editData.phone}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="location"
                        className="inputTrainer"
                        value={editData.location}
                        onChange={handleInputChange}
                      />
                      <input
                        type="hidden"
                        name="locationId"
                        className="inputTrainer"
                        value={editData.locationId}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(trainer.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{trainer.name}</td>
                    <td>{trainer.phone}</td>
                    <td>{trainer.location.name}</td>
                    <td>
                      <button onClick={() => handleEdit(trainer)}>Update</button>
                      {/* <button onClick={() => handleDelete(trainer.id)}>Delete</button> */}
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No trainers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerTable;



