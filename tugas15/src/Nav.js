import React from "react"
import { Link } from "react-router-dom"

const Nav = () => {

  return (
    <>
      <ul>
        <li><Link to="/tugas10">Tugas 10</Link></li>
        <li><Link to="/tugas11">Tugas 11</Link></li>
        <li><Link to="/tugas12">Tugas 12</Link></li>
        <li><Link to="/tugas13">Tugas 13</Link></li>
        <li><Link to="/tugas14">Tugas 14</Link></li>
      </ul>
    </>
  )
}

export default Nav