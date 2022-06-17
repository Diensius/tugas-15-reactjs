import React, { useState } from 'react';
import "../App.css";



const List = () => {

  let [dataBuah, setDataBuah] = useState([
    {nama: "Nanas", hargaTotal: 100000, beratTotal: 4000 },
    {nama: "Manggis", hargaTotal: 350000, beratTotal: 10000},
    {nama: "Nangka", hargaTotal: 90000, beratTotal: 2000},
    {nama: "Durian", hargaTotal: 400000, beratTotal: 5000},
    {nama: "Strawberry", hargaTotal: 120000, beratTotal: 6000}
  ])

  const [input, setInput] = useState ({
    nama : "",
    hargaTotal : 0,
    beratTotal : 0
  })

  const [currentIndex, setCurrentIndex] = useState(-1)

  const handleChange = (event) => {
    let nameOfInput = event.target.name
    let valueOfInput = event.target.value

    setInput({...input, [nameOfInput] : valueOfInput})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let {nama, hargaTotal, beratTotal} = input
    let newData = dataBuah

    newData = [...dataBuah, {nama, hargaTotal, beratTotal}]

    setDataBuah([...newData])

    setInput({
      nama : "",
      hargaTotal : 0,
      beratTotal : 0
    })

    if(currentIndex === -1) 
    {
      newData = [...dataBuah, input]
    } 
    else 
    {
      newData[currentIndex] = input
    }
 
    setDataBuah(newData)
    setInput("")
  }

  const handleDelete = (event) => {
    let index = parseInt(event.target.value)
    let deletedItem = dataBuah[index]
    let newData = dataBuah.filter((e) => {return e !== deletedItem})
    setDataBuah(newData)
  }

  const handleEdit = (event) => {
    let index = parseInt(event.target.value)
    let editValue = dataBuah[index]
    setInput(editValue)
    setCurrentIndex(event.target.value)
  }
  
  return (
    <>
      <h1>Daftar Harga Buah</h1>
      <div className='container-table'>
        <table id='table-buah'>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga Total</th>
              <th>Berat Total</th>
              <th>Harga per kg</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
              {dataBuah !== null && (
                <>
                  {dataBuah.map((e, index) => {
                    return (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{e.nama}</td>
                          <td>{e.hargaTotal}</td>
                          <td>{e.beratTotal}</td>
                          <td>{e.hargaTotal / (e.beratTotal / 1000)} kg</td>
                          <td>
                            <button onClick={handleEdit} value={index}>Edit</button>
                            <button onClick={handleDelete} value={index}>Delete</button>
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
        <form onSubmit={handleSubmit}>
          <label>Nama</label>
          <input onChange={handleChange} value={input.nama} type="text" name="nama"/>
          <label>Harga Total</label>
          <input onChange={handleChange} value={input.hargaTotal} type="number" name="hargaTotal"/>
          <label>Berat Total</label>
          <input onChange={handleChange} value={input.beratTotal} type="number" name="beratTotal"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </>
  )
}

export default List
