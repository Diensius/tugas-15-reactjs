import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MahasiswaContext } from "./Context/MahasiswaContext";

const MahasiswaForm = () => {

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
          <button type="submit" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              Submit
          </button>
        </form>
      </div>
      </>
    )
  }
  
  export default MahasiswaForm