import React from "react";
import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phno, setPhno] = useState("");
  const [age, setAge] = useState("");
  const [subjects, setSubjects] = useState("");
  const [feeStatus, setFreeStatus] = useState("UNPAID");
  const [Class, setClass] = useState("");
  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      const response = await fetch("http://localhost:3001/students");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    }
    fetchStudents();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  async function delStu(id) {
    try {
      const response = await fetch(
        `http://localhost:3001/delete-student/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setStudents((prev) => {
          return prev.filter((stu) => stu._id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updateStu(e) {
    e.preventDefault();
    try {
      const updatedData = {
        name,
        phno,
        age,
        subjects: subjects.split(",").map((subj) => subj.trim()),
        feeStatus,
        Class,
      };
      console.log(updatedData);
      console.log(id);
      const response = await fetch(
        `http://localhost:3001/update-student/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudents((prev) => [...prev, data.student]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students?.map((student) => (
          <div>
            <li key={student._id}>{student.name}</li>
            <button
              onClick={() => {
                delStu(student._id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setForm(true);
                setId(student._id);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </ul>

      {form && (
        <form onSubmit={updateStu}>
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
      )}
    </div>
  );
}

export default Students;
