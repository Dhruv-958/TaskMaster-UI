import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
  const [data, setData] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: '', age: '' });

  // const backend_uri = process.env.REACT_APP_BACKEND
  const backend_uri = import.meta.env.VITE_REACT_APP_BACKEND
  useEffect(() => {
    axios.get(`${backend_uri}example`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${backend_uri}example`, newRecord)
      .then((response) => {
        setData([...data, response.data]);
        setNewRecord({ name: '', age: '' });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Example Data from MongoDB</h1>
        <p>Welcome to the Example App! This app shows data from a MongoDB database and allows you to add new records.</p>
        <p>Here, you can view, add, and manage your data easily.</p>
        <h2>Instructions:</h2>
        <ul>
          <li>View existing records below.</li>
          <li>Fill out the form to add a new record.</li>
          <li>Each new record will be saved in the MongoDB database and displayed here.</li>
        </ul>
      </header>

      <div className="content">
        <h3>Data from Database</h3>
        <ul className="data-list">
          {data.map((item) => (
            <li key={item._id} className="data-item">
              <div><strong>Full Name:</strong> {item.name}</div>
              <div><strong>Age:</strong> {item.age}</div>
            </li>
          ))}
        </ul>

        <h3>Add New Record</h3>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            placeholder="Enter Name"
            value={newRecord.name}
            onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Age"
            value={newRecord.age}
            onChange={(e) => setNewRecord({ ...newRecord, age: e.target.value })}
            className="input-field"
          />
          <button type="submit" className="submit-btn">Add Record</button>
        </form>
      </div>
    </div>
  );
}

export default App;
