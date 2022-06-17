import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MahasiswaContext } from "../Context/MahasiswaContext";

const Tugas14Form = () => {

    const { state } = useContext(MahasiswaContext)

    let { dataMahasiswa, setDataMahasiswa, fetchStatus, setFetchStatus } = state

    useEffect(() => {
        let fetchData = async () => {
          let {data} = await axios.get(`https://backendexample.sanbercloud.com/api/student-scores`)
    
          let result = data.map((res) => {
            let {
              course,
              id,
              name,
              score,
            } = res 
    
            return {
              course,
              id,
              name,
              score,
            }
          })
          setDataMahasiswa([...result])
        }
    
        if(fetchStatus) {
          fetchData()
          setFetchStatus(false)
        }
    
    } , [fetchStatus, setFetchStatus])
  
    const handleSubmit = (event) => {
        event.preventDefault()
    
        let {name, course, score} = input
    
        axios.post(`https://backendexample.sanbercloud.com/api/student-scores`, {name, course, score})
        .then((res) => {
          setFetchStatus(true)
        })
        .catch((err) => {
          console.log(err)
        })
    
        setInput ({
          name : "",
          course : "",
          score : 0
        })
    }

    const [input, setInput] = useState ({
        name : "",
        course : "",
        score : 0
    })

    const handleChange = (event) => {
        let nameOfInput = event.target.name
        let valueOfInput = event.target.value
    
        setInput({...input, [nameOfInput] : valueOfInput})
    }
    
    return (
      <>
        <div className='container-form'>
        <h1>Form Nilai Mahasiswa</h1>
        <form onSubmit={handleSubmit}>
          <label>Nama</label>
          <input onChange={handleChange} value={input.name} type="text" name="name"/>
          <label>Mata Kuliah</label>
          <input onChange={handleChange} value={input.course} type="text" name="course"/>
          <label>Nilai</label>
          <input onChange={handleChange} value={input.score} type="number" name="score"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
      </>
    )
  }
  
  export default Tugas14Form