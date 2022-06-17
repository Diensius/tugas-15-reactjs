import React from "react";
import { MahasiswaProvider } from "./Context/MahasiswaContext";
import MahasiswaForm from "./MahasiswaForm";
import MahasiswaList from "./MahasiswaList"

const Mahasiswa = () => {

    return(
        <>
            <MahasiswaProvider>
                <MahasiswaList/>
                <MahasiswaForm/>
            </MahasiswaProvider>
        </>
    )
}

export default Mahasiswa