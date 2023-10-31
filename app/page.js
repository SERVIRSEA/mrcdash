"use client"
import Navbar from "./components/Navbar"
import MapLayout from './components/MapLayout'
import './global.css'

export default function Home(){
    return(
      <div>
        <Navbar />
        <MapLayout />
      </div>
    )
}