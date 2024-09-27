
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./RuningBatchStyle.css";

function RuningBatchForm() {
  const [formData, setFormData] = useState({
    batchId: '',
    trainerId: '',
    subjectId: '',
    locationId: '',
    startDate: '',
    endDate: ''
  });

  const [batches, setBatches] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch Batches, Trainers, Subjects, and Locations from the backend
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/batches`).then(response => setBatches(response.data));
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/trainers`).then(response => setTrainers(response.data));
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/subjects`).then(response => setSubjects(response.data));
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/locations`).then(response => setLocations(response.data));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/runningBatches`, {
        batch: { id: formData.batchId },
        trainer: { id: formData.trainerId },
        subject: { id: formData.subjectId },
        location: { id: formData.locationId }, // Send the selected location ID
        startDate: formData.startDate,
        endDate: formData.endDate
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Running batch added successfully');
        setFormData({
          batchId: '',
          trainerId: '',
          subjectId: '',
          locationId: '',
          startDate: '',
          endDate: ''
        });
      } else {
        console.error('Failed to add running batch');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="form">
        <div className="title">Let's create Running Batch Form</div>

        <form onSubmit={handleSubmit}>
          <div className="input-container ic2">
            <select
              className="dropdown"
              id="batchId"
              value={formData.batchId}
              onChange={handleChange}
            >
              <option value="">Select Batch Name</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container ic2">
            <select
              className="dropdown"
              id="trainerId"
              value={formData.trainerId}
              onChange={handleChange}
            >
              <option value="">Select Trainer Name</option>
              {trainers.map(trainer => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container ic2">
            <select
              className="dropdown"
              id="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
            >
              <option value="">Select Subject Name</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container ic2">
            <select
              className="dropdown"
              id="locationId"
              value={formData.locationId}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container ic2">
            <input
              type="datetime-local"
              className="input1"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <label className="iLabel" htmlFor="startDate">Starting Date</label>
          </div>

          <div className="input-container ic2">
            <input
              type="datetime-local"
              className="input1"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
            <label className="iLabel" htmlFor="endDate">Ending Date</label>
          </div>

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RuningBatchForm;




