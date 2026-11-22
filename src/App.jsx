import { useEffect, useState } from 'react'
import './App.css'
import '../index.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'

function App() {
    const [city, setCity] = useState("Baku")
    const [theme, setTheme] = useState(()=>{return localStorage.getItem("theme")=="true"})

    useEffect(()=>{localStorage.setItem("theme", theme);},[theme]);

  return (
    <>
    <Navbar setCity={setCity} theme={theme} setTheme={setTheme}/>
    <Home city={city} theme={theme}/>
    <About/>
    </>
  )
}

export default App
