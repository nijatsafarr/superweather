import { useEffect, useState } from "react"
import { useAppContext } from "../routes/__root.jsx"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { XMarkIcon } from "@heroicons/react/24/outline"
import swApi from "../api/api.js"
import weatherIcons from "../utils/weatherIcons.js"
import desktopAd2 from "../assets/a81e2a146e5f623438454b22bef64040.jpg"
import desktopAd1 from "../assets/d1263b0286b3ba80390a178d88bc5592.jpg"
import mobileAd1 from "../assets/ad3.jpg"
import mobileAd2 from "../assets/ads4.png"
import mobileAd3 from "../assets/mobilead3.png"
import mobileAd4 from "../assets/mobilead4.png"
import moonPhase from "../utils/moonphase.jsx"


export default function Home() {
  const mobileAds = [
    { ad: mobileAd1, link: "https://edition.cnn.com/travel" },
    { ad: mobileAd2, link: "https://www.flypgs.com/en?gclsrc=aw.ds&ds_rl=1250899&ds_rl=1263089&gad_source=1&gad_campaignid=10147384226&gbraid=0AAAAADscbGyAJ8m12gL39yCuIEhpFCYzv&gclid=CjwKCAiAqabXBhBUEiwAw_SQpW_dcQWGi55dlkus7US5V0-eyzojEKs_qd5Fe3RugWiMlLdKnTB_QBoCXbIQAvD_BwE" },
    { ad: mobileAd3, link: "https://www.ikea.com/" },
    { ad: mobileAd4, link: "https://www.turkishairlines.com/en-int/" }
  ]
  const desktopAds = [
    { ad: desktopAd1, link: "https://www.turkishairlines.com/en-int/" },
    { ad: desktopAd2, link: "https://www.ikea.com/" }
  ]

  const [weather, setweather] = useState(null)
  const [mobileAd, setMobileAd] = useState(0)
  const [desktopAd, setDesktopAd] = useState(0)
  const [adClose, setAdClose] = useState(true)
  const { city, theme } = useAppContext()
  const { t } = useTranslation()

  useEffect(() => {
    async function superWeather() {
      try {
        const data = await swApi(city)
        setweather(data)
      } catch (error) {
        console.log(error);
        throw error
      }
    }
    superWeather()
  }, [city])

  useEffect(() => {
    const adInterval = setInterval(() => {
      setMobileAd(Math.floor(Math.random() * mobileAds.length))
      setDesktopAd(Math.floor(Math.random() * desktopAds.length))
    }, 8000)

    return () => clearInterval(adInterval)
  })
  if (!weather?.daily) {
    return <p>Weather data is loading...</p>
  }
  const moon = moonPhase(weather.daily.moon_phase[0])

  if (weather) {
    const currentTime = new Date().getHours()
    return (
      <>
        <main className="flex">
          <div className="flex-1 min-w-0 w-full items-center justify-center" style={{ background: theme ? "#07093a" : "#e4e5f9", color: theme ? "black" : "white", minHeight: "100vh" }}>

            <aside className="flex flex-col relative w-auto h-auto lg:hidden mt-18 md:mt-22 mb-2 mx-5 sm:mx- md:mx-16 bg-white">
              {adClose ? (
                <>
                  <svg className="relative left-68 sm:translate-x-96 md:left-54" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><g fill="none" stroke="#00b5ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M10 13H6m4 2v-4a2 2 0 0 0-4 0v4m8-.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z"></path><rect width={20} height={14} x={2} y={5} rx={3}></rect></g></svg>
                  <button onClick={() => setAdClose(false)} className="absolute top-0.5 sm:top-0 right-1 flex items-center justify-center size-3 sm:size-3.5 rounded-full bg-black/60 text-white hover:bg-black">
                    <XMarkIcon />
                  </button>
                  <Link to={mobileAds[mobileAd].link} target="_blank">
                    <img key={mobileAds[mobileAd].ad} src={mobileAds[mobileAd].ad} className="w-full h-auto object-cover items-center justify-center" />
                  </Link>
                </>) : (
                <p className="text-xs text-center p-4 text-gray-400">Ad Closed</p>
              )}
            </aside>

            <object>
              <iframe className="w-full h-full sm:h-[400px] md:h-[600px]" src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=°C&metricWind=default&zoom=3&overlay=temp&product=ecmwf&level=surface&lat=26.274&lon=48.516&message=true"></iframe>
            </object>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-10 md:py-36 sm:px-5">
              <div className="flex flex-col sm:flex-row w-64 sm:w-lg md:w-xl mx-auto h-auto items-center justify-around gap-5 rounded-3xl p-5 bg-indigo-900">
                <img src={`https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${weatherIcons(weather.current.weather_code, weather.current.is_day, weather.current.wind_speed_10m)}`} className="h-24 sm:h-64 sm:w-64 md:h-72 md:w-72" alt="Weather Icons" />
                <section className="flex flex-col gap-3">
                  <div className="flex sm:flex-col gap-4 items-center sm:items-start justify-center">
                  <h5 className="text-base sm:text-4xl font-bold text-white">{weather ? weather.name : "Data Loading..."}</h5>
                  <p className="font-light text-base sm:text-4xl text-white">{Math.round(weather.current.temperature_2m)} °C</p>
                  </div>
                  <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 32 32"><path fill="#fff" d="M17.5 19.508V8.626h-4v10.88c-1.403.728-2.374 2.18-2.374 3.87a4.376 4.376 0 0 0 8.751.001c0-1.69-.97-3.142-2.376-3.868zm3-14.26c0-2.756-2.244-5-5-5s-5 2.245-5 5v12.727a7.3 7.3 0 0 0-2.375 5.4c0 4.066 3.31 7.377 7.376 7.377s7.375-3.31 7.375-7.377c0-2.086-.878-4.03-2.375-5.402V5.25zm.375 18.13A5.38 5.38 0 0 1 15.5 28.75a5.38 5.38 0 0 1-5.373-5.373c0-1.795.896-3.443 2.376-4.438V5.25c0-1.653 1.343-3 2.997-3s3 1.346 3 3v13.69a5.33 5.33 0 0 1 2.375 4.437zm1.21-14.752l4.5 2.598V6.03z" /></svg>
                    <p className="text-base text-white">{Math.round(weather.current.apparent_temperature)} °C</p>
                  </div>
                  <div className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width={25} height={28} viewBox="0 0 24 24"><path fill="#fff" d="M6.999 18.938Q5 16.875 5 13.803q0-1.36.62-2.74q.619-1.38 1.547-2.648q.93-1.269 2.006-2.392q1.077-1.124 2-1.956q.18-.161.393-.249q.212-.087.434-.087t.434.087t.393.25q.923.83 2 1.955q1.077 1.123 2.006 2.391t1.548 2.649t.619 2.74q0 3.072-2.002 5.135Q14.994 21 11.996 21t-4.998-2.062m7.823-2.113q.294-.292.294-.707q0-.416-.291-.71q-.292-.292-.707-.292q-.416 0-.71.29t-.292.707t.29.709t.707.294t.709-.291m-5.375.206q.204 0 .357-.146l5.08-5.081q.147-.153.147-.357t-.146-.35t-.347-.147t-.347.146l-5.095 5.095q-.146.146-.146.347t.146.347t.35.146m1.145-4.437q.294-.291.294-.707t-.291-.709t-.707-.294t-.709.292q-.293.29-.293.706t.29.71t.707.293q.416 0 .71-.291"></path></svg>
                    <p className="text-base text-white">{weather.current.relative_humidity_2m} %</p>
                  </div>
                  <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 16 16"><path fill="#fff" d="M9 9a3 3 0 1 1-2.585 4.523a1 1 0 0 1 1.724-1.015A1 1 0 1 0 9 11H2a1 1 0 1 1 0-2zm1.64-7.893a3.5 3.5 0 0 1 4.333 2.96A3.5 3.5 0 0 1 11.5 8H2a1 1 0 0 1 0-2h9.5a1.5 1.5 0 1 0-1.473-1.787a1 1 0 0 1-1.963-.384a3.5 3.5 0 0 1 2.577-2.722" /></svg>
                    <p className="text-base text-white">{weather.current.wind_speed_10m} km/h</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-4xl">{moon.icon}</span>
                    <p className="text-base text-white">{t(`weeklyForecast.moonPhase.${moon.key}`)} </p>
                  </div>
                  
                </section>
              </div>


              <aside className="relative hidden sm:hidden lg:block items-center justify-center md:w-64 md:mx-10 bg-white">
                {adClose ? (
                  <>
                    <svg className="relative left-53" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><g fill="none" stroke="#00b5ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M10 13H6m4 2v-4a2 2 0 0 0-4 0v4m8-.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z"></path><rect width={20} height={14} x={2} y={5} rx={3}></rect></g></svg>
                    <button onClick={() => setAdClose(false)} className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-black/60 text-white hover:bg-black">
                      <XMarkIcon />
                    </button>
                    <Link to={desktopAds[desktopAd].link} target="_blank">
                      <img key={desktopAds[desktopAd].ad} src={desktopAds[desktopAd].ad} className="w-auto h-auto mt-1.5" />
                    </Link>
                  </>) : (
                  <p className="text-xs text-center p-4 text-gray-400">Ad Closed</p>
                )}
              </aside>

            </div>

            <div className="flex flex-col w-[90%] h-auto mx-auto my-10 gap-5 rounded-3xl bg-indigo-900">
              <p className="uppercase font-mono px-4 pt-2 text-white">{t("hourlyForecast.title")}</p>
              <div className="flex items-center justify-between gap-3 p-4 overflow-x-auto text-white" id="hourlyScrollbar">
                {weather.hourly.time.slice(currentTime, currentTime + 24).map((time, index) => {
                  currentTime + index
                  return (
                    <section key={time} className="flex flex-col min-w-28 h-56 object-contain shrink-0 items-center justify-center gap-2 p-4 rounded-xl bg-white/15">
                      <h5 className="h-5">{index == 0 ? t("hourlyForecast.now") : new Date(time).toLocaleTimeString("en-UK", { hour: "2-digit", minute: "2-digit", timeZone: weather.timezone })}</h5>
                      <img src={`https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${weatherIcons(weather.hourly.weather_code[currentTime + index], weather.hourly.is_day[currentTime + index], weather.hourly.wind_speed_10m[currentTime + index])}`} />
                      <div className="flex h-5 items-center">{Math.round(weather.hourly.temperature_2m[index])} °C</div>
                      <div className="flex h-5 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><path fill="#fff" d="M9.75 14a.5.5 0 0 1 0 1h-3.5a.5.5 0 0 1 0-1zm2-2a.5.5 0 0 1 0 1h-7.5a.5.5 0 0 1 0-1zm.75-2a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0-2a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zM7.647 1.147a.5.5 0 0 1 .707 0c.262.261 1.41 1.45 2.495 3.002c.59.845 1.184 1.83 1.598 2.851H3.555c.414-1.02 1.008-2.006 1.598-2.85a24 24 0 0 1 2.494-3.003"></path></svg>
                        {weather.hourly.relative_humidity_2m[index]} %</div>
                    </section>)
                })}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}