import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './hospitalManage.css';



const HospitalManage = () => {
  const [doctorData, setDoctorData] = useState([]);
  useEffect(() => {
    fetch('doctors.csv')
      .then(response => response.text())
      .then(csvString => {
        Papa.parse(csvString, {
          header: true,
          complete: (result) => {
            setDoctorData(result.data);
          }
        });
      });
  }, []);
  const [qrCodeResult, setQrCodeResult] = useState('');

  const handleInputChange = (e) => {
    setDoctorData({...doctorData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Doctor Data Submitted: ${JSON.stringify(doctorData)}`);
  };

  const handleScanDummy = () => {
    // Dummy function for QR code scanning
    setQrCodeResult('Dummy QR Code Result');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    parseCSV(file);
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        console.log("Parsed CSV data: ", result.data);
        setDoctorData(result.data); // Assuming the CSV has headers
      },
      header: true
    });
  };

  return (
    <div className="hospital-manage-container">
      <form onSubmit={handleSubmit} className="hospital-manage-form">
        <label>
          Name:   
          <input 
            type="text" 
            name="name" 
            value={doctorData.name} 
            onChange={handleInputChange} 
          />
        </label>
        <br />
        <label>
          Specialization:   
          <input 
            type="text" 
            name="specialization" 
            value={doctorData.specialization} 
            onChange={handleInputChange} 
          />
        </label>
        <br />
        <label>
          Contact Number:   
          <input 
            type="text" 
            name="contactNumber" 
            value={doctorData.contactNumber} 
            onChange={handleInputChange} 
          />
        </label>
        <br />
        <button type="submit" className="hospital-manage-button">Submit</button>
      </form>

      <div style={{ marginTop: '10px' }}>
      <button onClick={handleScanDummy} className="hospital-manage-button">Simulate QR Scanner</button>
        {qrCodeResult && <div>Scanned Result: {qrCodeResult}</div>}
      </div>

      {/* Table to display doctors data */}
      <div style={{ marginTop: '20px' }}>
        <h1>Doctors Information</h1>
        <table border="1" className="hospital-manage-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>UID</th>
            <th>Specialization</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {doctorData.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.Name}</td>
              <td>{doctor.UID}</td>
              <td>{doctor.Spec}</td>
              <td>{doctor.Contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    
  );
};

export default HospitalManage;