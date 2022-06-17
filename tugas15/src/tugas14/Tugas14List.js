import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MahasiswaContext } from "../Context/MahasiswaContext";

const Tugas14List = () => {

    const { state, handleFunction } = useContext(MahasiswaContext)

    let { dataMahasiswa, setDataMahasiswa, fetchStatus, setFetchStatus } = state
    let { handleEdit, handleDelete, handleIndexScore } = handleFunction
  
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
                            <button onClick={handleEdit} value={res.id}>Edit</button>
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
      </>
    )
  }
  
  export default Tugas14List