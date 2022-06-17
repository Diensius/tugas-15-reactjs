import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MahasiswaContext } from "./Context/MahasiswaContext";

const MahasiswaList = () => {

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
          <table class="table p-4 bg-white shadow rounded-lg">
            <thead>
              <tr class="text-gray-700">
                <th class="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">No</th>
                <th class="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Nama</th>
                <th class="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Mata Kuliah</th>
                <th class="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Nilai</th>
                <th class="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Indeks Nilai</th>
                <th class="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
                {dataMahasiswa !== null && (
                  <>
                    {dataMahasiswa.map((res, index) => {
                      return (
                        <tr class="text-gray-700" key={res.id}>
                          <td class="border p-4 dark:border-dark-5">{index + 1}</td>
                          <td class="border p-4 dark:border-dark-5">{res.name}</td>
                          <td class="border p-4 dark:border-dark-5">{res.course}</td>
                          <td class="border p-4 dark:border-dark-5">{res.score}</td>
                          <td class="border p-4 dark:border-dark-5">{handleIndexScore(res.score)}</td>
                          <td class="border p-4 dark:border-dark-5">
                            <button onClick={handleEdit} value={res.id} type="button" class="py-2 px-4  bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Edit
                            </button>
                            <button onClick={handleDelete} value={res.id} type="button" class="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Delete
                            </button>
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
  
  export default MahasiswaList