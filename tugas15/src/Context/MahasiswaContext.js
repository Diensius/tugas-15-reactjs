import React, { createContext, useState } from "react";
import axios from "axios";

export const MahasiswaContext = createContext()

export const MahasiswaProvider = props => {

    const [dataMahasiswa, setDataMahasiswa] = useState([])
    const [fetchStatus, setFetchStatus] = useState(true)

    const handleEdit = (event) => {
        let idData = parseInt(event.target.value)
    }
  
    const handleDelete = (event) => {
        let idData = parseInt(event.target.value)
    
        axios.delete(`https://backendexample.sanbercloud.com/api/student-scores/${idData}`)
        .then((res) => {
          setFetchStatus(true)
        })
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

    let handleFunction = {
        handleEdit,
        handleDelete,
        handleIndexScore,
    }

    let state = {
        dataMahasiswa, 
        setDataMahasiswa, 
        fetchStatus, 
        setFetchStatus
    }

    return(
        <MahasiswaContext.Provider value={{state, handleFunction}}>
            {props.children}
        </MahasiswaContext.Provider>
    )
}

