import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Tugas10 from "../tugas10/tugas10"
import Tugas11 from "../tugas11/tugas11"
import Tugas12 from "../tugas12/tugas12"
import Tugas13 from "../tugas13/tugas13"
import Tugas14 from "../tugas14/Tugas14List"
import Nav from "../Nav"

const Routes = () => {

  return (
    <>
      <BrowserRouter>
        <Nav/>

        <Switch>
            <Route path="/tugas10" component={Tugas10} />
            <Route path="/tugas11" component={Tugas11} />
            <Route path="/tugas12" component={Tugas12} />
            <Route path="/tugas13" component={Tugas13} />
            <Route path="/tugas14" component={Tugas14} />
        </Switch>

      </BrowserRouter>
    </>
  )
}

export default Routes
