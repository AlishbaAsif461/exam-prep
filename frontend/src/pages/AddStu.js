import React from "react";
import { useState } from "react";

const AddStu = () => {
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [age, setAge] = useState("");
  const [subjects, setSubjects] = useState("");
  const [feeStatus, setFreeStatus] = useState("UNPAID");
  const [Class, setClass] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents the page from reloading on form submission
    const studentData = {
      name,
      phno,
      age,
      subjects: subjects.split(",").map((subj) => subj.trim()), //convert comma-separated subjects into an array.The trim() method is used here to remove any extra spaces that might exist at the beginning or end of each subject when the user enters the comma-separated list.
      feeStatus,
      Class,
    };
    try {
      const response = await fetch("http://localhost:3001/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        setMessage("Student Added successfully");
      } else {
        setMessage("Failed to add student");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error occured while adding student");
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Subjects (comma separated):</label>
          <input
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />
        </div>
        <div>
          <label>Fee Status:</label>
          <select
            value={feeStatus}
            onChange={(e) => setFreeStatus(e.target.value)}
          >
            <option value="UNPAID">UNPAID</option>
            <option value="PAID">PAID</option>
          </select>
        </div>
        <div>
          <label>Class:</label>
          <input
            type="text"
            value={Class}
            onChange={(e) => setClass(e.target.value)}
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddStu;
