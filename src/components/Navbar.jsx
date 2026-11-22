import {Disclosure, DisclosureButton, DisclosurePanel, Switch} from '@headlessui/react';
import {Bars3Icon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/outline'
import SuperWeather from '../assets/sunrise.png'
import { useState } from 'react';
import SelectLanguages from './langs';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

export default function Navbar({setCity, theme, setTheme}) {
  const [searchCity, setSearchCity] = useState("")
  const {t, i18n} = useTranslation()

  return(
   <Disclosure as="nav" className="w-full" id="navbar">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            <Link to="/">
              <div className="flex items-center gap-2 md:gap-3 text-white">
                <img src={SuperWeather} className='flex flex-row size-10 sm:size-8 md:size-14 lg:size-16'/>
                <p className="superweather text-sm sm:text-base lg:text-2xl font-bold">SuperWeather</p>
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-auto md:sm-3">
              <form onSubmit={(e)=>{e.preventDefault(), setCity(searchCity.trim())}} className='relative'>
              <input type="text" onSubmit={(e)=>{e.preventDefault(), setCity(searchCity.trim())}} value={searchCity} onChange={(e)=>{setSearchCity(e.target.value)}} placeholder={t("navbar.searchBar")} className="w-40 sm:w-30 lg:w-52 sm:h-8 lg:h-8.5 rounded-lg text-xs font-semibold pl-2 outline-0 bg-white"/>
              {searchCity &&(
                <button type="button" onClick={()=>setSearchCity("")} className="absolute right-8 top-1/2 -translate-y-1/2">
                  <XMarkIcon className="size-3"/>
                </button>
              )}
              <MagnifyingGlassIcon className="absolute right-2 top-1/2 -translate-y-1/2 size-5 text-indigo-700"/>
            </form>
            </div>
                
              <div className="hidden sm:flex sm:items-center sm:gap-4 text-white">
                <a href="/forecast" className="hover:text-sky-400 text-white">{t("navbar.forecast")}</a> 
                <a href="/about" className="hover:text-sky-400 text-white">{t("navbar.about")}</a>  
              </div>

              <div className="flex items-center gap-2 md:gap-5 shrink-0">
              <SelectLanguages/>
              <button onClick={()=>setTheme(!theme)}>
                {theme ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="#fff"><path fill="#fff" fillRule="evenodd" d="m18.78 18l-7.27-1.12l-6.46-.28c-1.26-1.6-2.08-3.24-2.08-5.43c0-5.22 3.39-7.89 5.81-8.48c0 0-1.48 5.02 2.3 9.69c3.25 3.24 6.92 2.22 8.84 1.7c.78-.22 1.27-.36 1.33-.1c.09.38-1.27 2.68-2.47 4.02" clipRule="evenodd" opacity=".2"/><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.79 16.24c-1.15-1.12-1.82-3.28-1.82-5.07a9.5 9.5 0 0 1 4.59-8.1c.9-.55 1.35-.82 1.62-.6c.27.2.09.8-.27 1.98c-.65 2.13-.86 5.3 2.1 8.01c2.5 2.3 5.77 2.02 7.88 1.5c.97-.24 1.46-.36 1.66-.11c.2.24 0 .65-.4 1.45a10 10 0 0 1-1.72 2.61"/><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1.3 17.63c.82-.57 3.15-1.57 6.31-1.57s6.93 2.02 10 2.02s4.5-1.1 5.1-1.69M3.8 20.53a9.6 9.6 0 0 1 4.97-.87c2.44.17 5.25 1.9 7.63 2.05c2.37.16 3.37-.45 4.02-.82"/></g></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75m0 5a5.75 5.75 0 1 0 0 11.5a5.75 5.75 0 0 0 0-11.5M5.46 4.399a.75.75 0 0 0-1.061 1.06l.707.707a.75.75 0 1 0 1.06-1.06zM22.75 12a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75m-3.149-6.54a.75.75 0 1 0-1.06-1.061l-.707.707a.75.75 0 1 0 1.06 1.06zM12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75m6.894-2.416a.75.75 0 1 0-1.06 1.06l.707.707a.75.75 0 1 0 1.06-1.06zM3.75 12a.75.75 0 0 1-.75.75H2a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75m2.416 6.894a.75.75 0 0 0-1.06-1.06l-.707.707a.75.75 0 0 0 1.06 1.06z"/></svg>}</button>
              </div>

              <div className="sm:hidden text-white">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-700">
                  <span className="sr-only">Open main menu</span>

                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>

            </div>
          </div>

          <DisclosurePanel className="sm:hidden text-white">
            <div className="space-y-1 px-4 pb-3 pt-2">
            <section className="ml-2 w-52 h-6 rounded-lg font-semibold text-base text-gray-700 bg-white">
             <form onSubmit={(e)=>{e.preventDefault(), setCity(searchCity.trim())}} className="relative w-full h-full">
              <input type="text" onSubmit={(e)=>{e.preventDefault(), setCity(searchCity.trim())}} value={searchCity} onChange={(e)=>{setSearchCity(e.target.value)}} placeholder="Enter a city..." className="outline-0 ml-1" />
              {searchCity && (
                <button type="button" onClick={()=>setSearchCity("")} className="absolute right-8 top-1/2 -translate-y-1/2">
                  <XMarkIcon className="size-3 text-gray-400"/>
                </button>
              )}
             </form>
             <MagnifyingGlassIcon className="relative left-44 bottom-6 size-6 text-indigo-700"/>
            </section>
              <DisclosureButton as="a" href="/forecast" className="block rounded-md px-3 py-2 hover:bg-slate-700">{t("navbar.forecast")}</DisclosureButton>
              <DisclosureButton as="a" href="/about" className="block rounded-md px-3 py-2 hover:bg-slate-700">{t("navbar.about")}</DisclosureButton>  
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure> 
  )  
}