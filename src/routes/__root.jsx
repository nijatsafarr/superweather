import { createRootRoute, Outlet } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

export const AppContext = createContext(null)
export const useAppContext = ()=>useContext(AppContext)

export const Route = createRootRoute({
    component: rootComponent,
})

function rootComponent() {
    const [city, setCity] = useState("Baku")
    const [theme, setTheme] = useState(()=>{return localStorage.getItem("theme")=="true"})
    useEffect(()=>{localStorage.setItem("theme", theme);},[theme])
  
    return(
    <>
    <AppContext.Provider value={{city, setCity, theme, setTheme}}>
    <Navbar setCity={setCity} theme={theme} setTheme={setTheme}/>
    <aside>
    <Outlet/>
    </aside>
    <Footer/>
    </AppContext.Provider>
    </>
  )  
}