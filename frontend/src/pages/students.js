import React from 'react'
import { useEffect, useState } from 'react'

function Students() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function fetchStudents(){
            setLoading(true)
            const response = await fetch("http://localhost:3001/students")
            const data =  await response.json()
            setStudents(data)
            setLoading(false)
        }
        fetchStudents()
    }, [])
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>
        <h1>Students</h1>
        <ul>
            {students.map((student)=>(
                <li key={student._id}>{student.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default Students