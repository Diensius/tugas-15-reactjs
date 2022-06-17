import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Tugas12 = () => {

  const [dataMahasiswa, setDataMahasiswa] = useState([])
  const [fetchStatus, setFetchStatus] = useState(true)

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

  const handleIndexScore = (params) => {
    if(params >= 80)
    {
      return "A";
    }
    else if(params >= 70 && params < 80)
    {
      return "B";
    }
    else if(params >= 60 && params < 70)
    {
      return "C";
    }
    else if(params >= 50 && params < 60)
    {
      return "D";
    }
    if(params < 50)
    {
      return "E";
    }
  }

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

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value)

    axios.delete(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
    .then((res) => {
      setFetchStatus(true)
    })
  }
  
  return (
    <>
      <h1>Daftar Nilai Mahasiswa</h1>
      <div className='container-table'>
        <table id='table-buah'>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Mata Kuliah</th>
              <th>Nilai</th>
              <th>Indeks Nilai</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
              {dataMahasiswa !== null && (
                <>
                  {dataMahasiswa.map((res, index) => {
                    return (
                      <tr key={res.id}>
                        <td>{index + 1}</td>
                        <td>{res.name}</td>
                        <td>{res.course}</td>
                        <td>{res.score}</td>
                        <td>{handleIndexScore(res.score)}</td>
                        <td>
                          <button>Edit</button>  
                          <button onClick={handleDelete} value={res.id}>Delete</button> 
                        </td>
                      </tr>
                    )
                  })}
                </>
              )}
          </tbody>
        </table>
      </div>

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

export default Tugas12
