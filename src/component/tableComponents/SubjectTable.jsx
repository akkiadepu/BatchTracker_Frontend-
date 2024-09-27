
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SubjectTable.css';
// import eventEmitter from './eventEmitter';

// function SubjectTable() {
//     const [subjects, setSubjects] = useState([]);
//     const [locations, setLocations] = useState([]); // Store all locations
//     const [filteredSubjects, setFilteredSubjects] = useState([]); // Filtered subjects based on dropdowns
//     const [subjectFilter, setSubjectFilter] = useState(''); // Filter for selected subject
//     const [locationFilter, setLocationFilter] = useState(''); // Filter for selected location
//     const [filteredLocations, setFilteredLocations] = useState([]); // Filtered locations for cascading dropdown
//     const [filteredSubjectNames, setFilteredSubjectNames] = useState([]);
//     const [editRowId, setEditRowId] = useState(null); 
//     const [editData, setEditData] = useState({ id: '', name: '', location: '', locationId: '' }); 

//     // Fetch subjects from backend
//     const fetchSubjectsAndLocations = async () => {
//         try {
//             const subjectResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/subjects`);
//             setSubjects(subjectResponse.data);
//             setFilteredSubjects(subjectResponse.data); // Initialize filteredSubjects
//             setFilteredSubjectNames(subjectResponse.data.map(subject => subject.name)); // Set all subject names

//             const locationResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`);
//             setLocations(locationResponse.data); // Store all locations
//             setFilteredLocations(locationResponse.data); // Initialize filteredLocations
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchSubjectsAndLocations();

//         const handleSubjectAdded = (newSubject) => {
//             setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
//         };

//         eventEmitter.on('subjectAdded', handleSubjectAdded);

//         // Clean up event listener on unmount
//         return () => {
//             eventEmitter.off('subjectAdded', handleSubjectAdded);
//         };
//     }, []);


//     const handleSubjectFilterChange = (e) => {
//         const selectedSubject = e.target.value;
//         setSubjectFilter(selectedSubject);
//         filterLocations(selectedSubject); // Apply cascading filter for locations
//         filterTable(selectedSubject, locationFilter); // Filter table based on subject and location
//     };

//     // Handle location dropdown change
//     const handleLocationFilterChange = (e) => {
//         const selectedLocation = e.target.value;
//         setLocationFilter(selectedLocation);
//         filterSubjects(selectedLocation); // Apply cascading filter for subjects
//         filterTable(subjectFilter, selectedLocation); // Filter table based on subject and location
//     };

//     // Filter locations dropdown based on selected subject
//     const filterLocations = (selectedSubject) => {
//         if (selectedSubject) {
//             const filteredLocs = subjects
//                 .filter(subject => subject.name === selectedSubject)
//                 .map(subject => subject.location);
//             setFilteredLocations([...new Set(filteredLocs.map(loc => loc.name))]); // Ensure unique locations
//         } else {
//             setFilteredLocations(locations.map(loc => loc.name)); // Reset to all locations if no subject is selected
//         }
//     };

//     // Filter subjects dropdown based on selected location
//     const filterSubjects = (selectedLocation) => {
//         if (selectedLocation) {
//             const filteredSubs = subjects
//                 .filter(subject => subject.location.name === selectedLocation)
//                 .map(subject => subject.name);
//             setFilteredSubjectNames([...new Set(filteredSubs)]); // Ensure unique subjects
//         } else {
//             setFilteredSubjectNames(subjects.map(subject => subject.name)); // Reset to all subjects if no location is selected
//         }
//     };

//     // Filter the table based on both subject and location
//     const filterTable = (selectedSubject, selectedLocation) => {
//         let filtered = subjects;

//         if (selectedSubject) {
//             filtered = filtered.filter(subject => subject.name === selectedSubject);
//         }

//         if (selectedLocation) {
//             filtered = filtered.filter(subject => subject.location.name === selectedLocation);
//         }

//         setFilteredSubjects(filtered); // Update the table with filtered data
//     };




//     // Edit function to set row in edit mode
//     const handleEdit = (subject) => {
//         setEditRowId(subject.id); // Use the subject's ID for editing
//         setEditData({
//             id: subject.id,
//             name: subject.name,
//             location: subject.location.name,   // Set location name for editing
//             locationId: subject.location.id    // Also set the location ID
//         });
//     };

//     // Handle input change
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditData({
//             ...editData,
//             [name]: value,
//         });
//     };

//     // Save the updated subject
//     const handleSave = async (subjectId) => {
//         try {
//             // Ensure both name and location with ID are sent
//             const updatedSubject = {
//                 id: editData.id,
//                 name: editData.name,
//                 location: {
//                     id: editData.locationId,  // Pass location ID if it exists
//                     name: editData.location   // Pass the location name
//                 }
//             };

//             // Send PUT request with the subject ID and updated data
//             await axios.put(`${process.env.REACT_APP_BACKEND_URL}/subjects/${subjectId}`, updatedSubject); 
//             // Exit editing mode and refresh data
//             setEditRowId(null);
//             fetchSubjectsAndLocations(); 
//         } catch (error) {
//             console.error('Error updating subject:', error);
//         }
//     };

//     // Cancel editing
//     const handleCancel = () => {
//         setEditRowId(null); // Exit editing mode
//         setEditData({ id: '', name: '', location: '', locationId: '' }); // Reset editData
//     };

//     // Delete function
//     const handleDelete = async (subjectId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/subjects/${subjectId}`);
//             console.log('Subject deleted successfully');
//             fetchSubjectsAndLocations(); // Refresh the data
//         } catch (error) {
//             console.error('Error deleting subject:', error);
//         }
//     };

//     return (
//         <div>



// <table border="1" cellPadding="10" cellSpacing="0" className="batch-table">
//         <thead>
//           <tr>

//             <th>
//               <select value={subjectFilter} onChange={handleSubjectFilterChange}>
//                 <option value="">All Batches</option>
//                 {filteredSubjectNames.map((subjectName, index) => (
//                   <option key={index} value={subjectName}>{subjectName}</option>
//                 ))}
//               </select>
//             </th>
//             {/* <th>Start Date</th> */}

//             <th>
//               <select value={locationFilter} onChange={handleLocationFilterChange}>
//                 <option value="">All Locations</option>
//                 {filteredLocations.map(location => (
//                   <option key={location.id} value={location.name}>{location.name}</option>
//                 ))}
//               </select>
//             </th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredSubjects.map(subject => (
//             <tr key={subjects.id}>
//               {editRowId === subject.id ? (
//                 <>
//                   <td>
//                     <input
//                       type="text"
//                       name="name"
//                       value={editData.name}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="text"
//                       name="location"
//                       value={editData.location}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <input
//                       type="hidden"
//                       name="locationId"
//                       value={editData.locationId}
//                     />
//                   </td>
//                   <td>
//                     <button type="button" onClick={handleSave}>Save</button>
//                     <button type="button" onClick={handleCancel}>Cancel</button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{subject.name}</td>
//                   <td>{subject.location.name}</td>
//                   <td>
//                     <button onClick={() => handleEdit(subject)}>Update</button>
//                     {/* <button onClick={() => handleDelete(batch.id)}>Delete</button> */}
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//         </div>
//     );
// }

// export default SubjectTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SubjectTable.css';
// import eventEmitter from './eventEmitter';

// function SubjectTable() {
//     const [subjects, setSubjects] = useState([]);
//     const [locations, setLocations] = useState([]);
//     const [filteredSubjects, setFilteredSubjects] = useState([]);
//     const [subjectFilter, setSubjectFilter] = useState('');
//     const [locationFilter, setLocationFilter] = useState('');
//     const [filteredSubjectNames, setFilteredSubjectNames] = useState([]);
//     const [filteredLocations, setFilteredLocations] = useState([]);

//     const [editRowId, setEditRowId] = useState(null);
//     const [editData, setEditData] = useState({ id: '', name: '', location: '', locationId: '' });

//     // Fetch subjects and locations from the backend
//     const fetchSubjectsAndLocations = async () => {
//         try {
//             const subjectResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/subjects`);
//             setSubjects(subjectResponse.data);
//             setFilteredSubjects(subjectResponse.data); // Initialize filteredSubjects
//             setFilteredSubjectNames(subjectResponse.data.map(subject => subject.name)); // Set all subject names

//             const locationResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`);
//             setLocations(locationResponse.data); // Store all locations
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchSubjectsAndLocations();

//         const handleSubjectAdded = (newSubject) => {
//             setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
//         };

//         eventEmitter.on('subjectAdded', handleSubjectAdded);

//         // Clean up event listener on unmount
//         return () => {
//             eventEmitter.off('subjectAdded', handleSubjectAdded);
//         };
//     }, []);

//     const handleSubjectFilterChange = (e) => {
//         const selectedSubject = e.target.value;
//         setSubjectFilter(selectedSubject);
//         filterLocations(selectedSubject); // Apply cascading filter for locations
//         filterTable(selectedSubject, locationFilter); // Filter table based on subject and location
//     };

//     // Handle location dropdown change
//     const handleLocationFilterChange = (e) => {
//         const selectedLocation = e.target.value;
//         setLocationFilter(selectedLocation);
//         filterSubjects(selectedLocation); // Apply cascading filter for subjects
//         filterTable(subjectFilter, selectedLocation); // Filter table based on subject and location
//     };

//     // Filter locations dropdown based on selected subject
//     const filterLocations = (selectedSubject) => {
//         if (selectedSubject) {
//             const filteredLocs = subjects
//                 .filter(subject => subject.name === selectedSubject)
//                 .map(subject => subject.location);
//             setFilteredLocations([...new Set(filteredLocs.map(loc => loc.name))]); // Ensure unique locations
//         } else {
//             setFilteredLocations(locations.map(loc => loc.name)); // Reset to all locations if no subject is selected
//         }
//     };

//     // Filter subjects dropdown based on selected location
//     const filterSubjects = (selectedLocation) => {
//         if (selectedLocation) {
//             const filteredSubs = subjects
//                 .filter(subject => subject.location.name === selectedLocation) // Compare by location name
//                 .map(subject => subject.name);
//             setFilteredSubjectNames([...new Set(filteredSubs)]); // Ensure unique subjects
//         } else {
//             setFilteredSubjectNames(subjects.map(subject => subject.name)); // Reset to all subjects if no location is selected
//         }
//     };




//     // Filter the table based on both subject and location
//     const filterTable = (selectedSubject, selectedLocation) => {
//         let filtered = subjects;

//         if (selectedSubject) {
//             filtered = filtered.filter(subject => subject.name === selectedSubject);
//         }

//         if (selectedLocation) {
//             filtered = filtered.filter(subject => subject.location.name === selectedLocation);
//         }

//         setFilteredSubjects(filtered); 

//         const locsFromSelectedSubject = selectedSubject
//             ? [...new Set(filtered.map(subject => subject.location.name))]
//             : locations.map(loc => loc.name); // Reset if no subject is selected

//         setFilteredLocations(locsFromSelectedSubject);

//         // Update the filtered subject names based on the current location filter
//         const subsFromSelectedLocation = selectedLocation
//             ? [...new Set(subjects.filter(subject => subject.location.name === selectedLocation).map(subject => subject.name))]
//             : subjects.map(subject => subject.name); // Reset if no location is selected

//         setFilteredSubjectNames(subsFromSelectedLocation);



//     };

//     // Edit function to set row in edit mode
//     const handleEdit = (subject) => {
//         setEditRowId(subject.id);
//         setEditData({
//             id: subject.id,
//             name: subject.name,
//             location: subject.location.name,
//             locationId: subject.location.id
//         });
//     };

//     // Handle input change
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditData({
//             ...editData,
//             [name]: value,
//         });
//     };

//     // Save the updated subject
//     const handleSave = async (subjectId) => {
//         try {
//             const updatedSubject = {
//                 id: editData.id,
//                 name: editData.name,
//                 location: {
//                     id: editData.locationId,
//                     name: editData.location
//                 }
//             };

//             await axios.put(`${process.env.REACT_APP_BACKEND_URL}/subjects/${subjectId}`, updatedSubject);
//             setEditRowId(null);
//             fetchSubjectsAndLocations();
//         } catch (error) {
//             console.error('Error updating subject:', error);
//         }
//     };

//     // Cancel editing
//     const handleCancel = () => {
//         setEditRowId(null);
//         setEditData({ id: '', name: '', location: '', locationId: '' });
//     };

//     // Delete function
//     const handleDelete = async (subjectId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/subjects/${subjectId}`);
//             fetchSubjectsAndLocations();
//         } catch (error) {
//             console.error('Error deleting subject:', error);
//         }
//     };

//     return (
//         <div>
//             <table border="1" cellPadding="10" cellSpacing="0" className="batch-table">
//                 <thead>
//                     <tr>
//                         <th>
//                             <select value={subjectFilter} onChange={handleSubjectFilterChange}>
//                                 <option value="">All Subjects</option>
//                                 {filteredSubjectNames.map((subjectName, index) => (
//                                     <option key={index} value={subjectName}>{subjectName}</option>
//                                 ))}
//                             </select>
//                         </th>
//                         <th>
//                             <select value={locationFilter} onChange={handleLocationFilterChange}>
//                                 <option value="">All Locations</option>
//                                 {locations.map(location => (  // Use all locations here for the dropdown
//                                     <option key={location.id} value={location.name}>{location.name}</option>
//                                 ))}
//                             </select>
//                         </th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredSubjects.map(subject => (
//                         <tr key={subject.id}>
//                             {editRowId === subject.id ? (
//                                 <>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={editData.name}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="text"
//                                             name="location"
//                                             value={editData.location}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                         <input
//                                             type="hidden"
//                                             name="locationId"
//                                             value={editData.locationId}
//                                         />
//                                     </td>
//                                     <td>
//                                         <button type="button" onClick={() => handleSave(subject.id)}>Save</button>
//                                         <button type="button" onClick={handleCancel}>Cancel</button>
//                                     </td>
//                                 </>
//                             ) : (
//                                 <>
//                                     <td>{subject.name}</td>
//                                     <td>{subject.location.name}</td>
//                                     <td>
//                                         <button onClick={() => handleEdit(subject)}>Update</button>
//                                         <button onClick={() => handleDelete(subject.id)}>Delete</button>
//                                     </td>
//                                 </>
//                             )}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default SubjectTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SubjectTable.css';
import eventEmitter from './eventEmitter';

function SubjectTable() {
    const [subjects, setSubjects] = useState([]);
    const [locations, setLocations] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [subjectFilter, setSubjectFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [filteredSubjectNames, setFilteredSubjectNames] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editData, setEditData] = useState({ id: '', name: '', location: '', locationId: '' });


    const fetchSubjectsAndLocations = async () => {
        try {
            const subjectResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/subjects`);
            setSubjects(subjectResponse.data);
            setFilteredSubjects(subjectResponse.data);
            setFilteredSubjectNames(subjectResponse.data.map(subject => subject.name));

            const locationResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`);
            setLocations(locationResponse.data);
            setFilteredLocations(locationResponse.data.map(location => location.name));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchSubjectsAndLocations();
    }, []);

    useEffect(() => {
        const handleSubjectAdded = (newSubject) => {
            const formattedSubject = {
                ...newSubject,

            };

            setSubjects((prevSubjects) => [...prevSubjects, formattedSubject]);
            setFilteredSubjects((prevFilteredSubjects) => [...prevFilteredSubjects, formattedSubject]);
        };

        eventEmitter.on('subjectAdded', handleSubjectAdded);

        return () => {
            eventEmitter.off('subjectAdded', handleSubjectAdded);
        };
    }, []);


    const handleSubjectFilterChange = (e) => {
        const selectedSubject = e.target.value;
        setSubjectFilter(selectedSubject);
        filterBoth(selectedSubject, locationFilter);
    };

    const handleLocationFilterChange = (e) => {
        const selectedLocation = e.target.value;
        setLocationFilter(selectedLocation);
        filterBoth(subjectFilter, selectedLocation);
    };


    const filterBoth = (selectedSubject, selectedLocation) => {
        let filtered = subjects;


        if (selectedSubject) {
            filtered = filtered.filter(subject => subject.name === selectedSubject);
        }


        const locsFromFilteredSubjects = selectedSubject
            ? [...new Set(filtered.map(subject => subject.location.name))]
            : locations.map(loc => loc.name);

        setFilteredLocations(locsFromFilteredSubjects);


        filtered = filtered.filter(subject => !selectedLocation || subject.location.name === selectedLocation);


        const subsFromSelectedLocation = selectedLocation
            ? [...new Set(subjects.filter(subject => subject.location.name === selectedLocation).map(subject => subject.name))]
            : subjects.map(subject => subject.name);

        setFilteredSubjectNames(subsFromSelectedLocation);
        setFilteredSubjects(filtered);
    };

    const handleEdit = (subject) => {
        setEditRowId(subject.id);
        setEditData({
            id: subject.id,
            name: subject.name,
            location: subject.location.name,
            locationId: subject.location.id
        });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };


    const handleSave = async () => {
        try {

            const updatedSubject = {
                id: editData.id,
                name: editData.name,
                location: {
                    id: editData.locationId,
                    name: editData.location
                }
            };
            console.log("ID to update:", editRowId);
            console.log("Data being sent:", updatedSubject);

            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/subjects/${editRowId}`, updatedSubject);

            setEditRowId(null);
            fetchSubjectsAndLocations();
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };


    const handleCancel = () => {
        setEditRowId(null);
        setEditData({ id: '', name: '', location: '', locationId: '' });
    };


    const handleDelete = async (subjectId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/subjects/${subjectId}`);
            console.log('Subject deleted successfully');
            fetchSubjectsAndLocations();
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <div>
              <h2>Subject List</h2>
            <table border="1" cellPadding="10" cellSpacing="0" className="batch-table">
                <thead>
                    <tr>
                        <th>
                            <select value={subjectFilter} onChange={handleSubjectFilterChange}>
                                <option value="">All Subjects</option>
                                {filteredSubjectNames.map((subjectName, index) => (
                                    <option key={index} value={subjectName}>{subjectName}</option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <select value={locationFilter} onChange={handleLocationFilterChange}>
                                <option value="">All Locations</option>
                                {filteredLocations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubjects.map(subject => (
                        <tr key={subject.id}>
                            {editRowId === subject.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            className='inputSubject'
                                            value={editData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="location"
                                            className='inputSubject'
                                            value={editData.location}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="hidden"
                                            name="locationId"
                                            className='inputSubject'
                                            value={editData.locationId}
                                        />
                                    </td>
                                    <td>
                                        <button type="button" onClick={handleSave}>Save</button>
                                        <button type="button" onClick={handleCancel}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{subject.name}</td>
                                    <td>{subject.location.name}</td>
                                    <td>
                                        <button onClick={() => handleEdit(subject)}>Update</button>
                                        {/* <button onClick={() => handleDelete(subject.id)}>Delete</button> */}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubjectTable;













