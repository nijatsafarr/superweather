import { useEffect, useState } from "react"
import { useAppContext } from "../routes/__root"
import { useTranslation } from "react-i18next"
import swApi from "../api/api"
import weatherIcons from "../utils/weatherIcons"
import placeImages from "../api/locationImgApi"
import WeeklyHumidity from "../utils/humidity_chart"
import WeeklyWindRadar from "../utils/windRadar_chart"
import moonPhase from "../utils/moonphase"

export default function Forecast() {
const [weather, setWeather] = useState(null)
const [localtime, setLocaltime] = useState(new Date())
const [placeImg, setPlaceImg] = useState(null)
const { city, theme } = useAppContext()
const {i18n, t} = useTranslation()

useEffect(()=>{
  async function dailyForecast() {
    try {
      const data = await swApi(city)
      setWeather(data)
    } catch (error) {
      console.log(error);
      throw error
    }}
  dailyForecast()
}, [city])

useEffect(() => {
  async function getImg() {
    try {
      const result = await placeImages(city)
      setPlaceImg(result)
    } catch (error) {
      console.log(error)
      setPlaceImg(null)
    }}
  getImg()
}, [city])

useEffect(()=> {
  const time = setInterval(()=> {
   setLocaltime(new Date()) 
  })
  return ()=> clearInterval(time)
})

const dateLangs = {
  ar:"ar-AR", az:"az-AZ", bg:"bg-BG", cn:"zh-CN", de:"de-DE", en:"en-GB", 
  es:"es-ES", fr:"fr-FR", gr:"el-GR", in:"hi-IN", it:"it-IT", jp:"ja-JP", 
  kz:"kk-KZ", pk:"ur-PK", pl:"pl-PL", ru:"ru-RU", th:"th-TH", tr:"tr-TR", 
  ua:"uk-UA", uz:"uz-UZ" 
}
const dateLang = dateLangs[i18n.language.split("-")[0]] || "en-GB"
if (!weather?.daily) {
  return <p>Weather data is loading...</p>
}
const moon = moonPhase(weather.daily.moon_phase[0])
  if (weather) {
  return(
    <>
    <div style={{background: theme ? "#07093a" : "#e4e5f9", color: theme ? "white" : "#e4e5f9"}} className="py-20 md:py-28">
    <div className="flex flex-col w-[90%] md:w-3/5 h-auto mx-auto p-3 md:p-5 rounded-2xl bg-indigo-900">
    <div className="flex items-end justify-between h-40 sm:h-56 md:h-80 rounded-2xl" style={{backgroundImage: placeImg?.image ? `linear-gradient(to top, rgba(0,0,0,0.4), transparent 40%), url(${placeImg.image})` : "none", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
    <h1 className="flex items-center font-semibold text-sm md:text-2xl gap-2 md:gap-3 py-4 md:py-10 px-3 md:px-5 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-6 lg:size-8" viewBox="0 0 14 14"><path fill="#fff" fillRule="evenodd" d="M7 0c2.622 0 4.806 2.184 4.806 4.805c0 .856-.294 1.7-.705 2.464c-.413.768-.959 1.484-1.501 2.094a16 16 0 0 1-1.521 1.49a9 9 0 0 1-.546.433a3 3 0 0 1-.195.13a1 1 0 0 1-.174.083a.54.54 0 0 1-.405-.03a1 1 0 0 1-.098-.053a3 3 0 0 1-.196-.133a9 9 0 0 1-.545-.435A16 16 0 0 1 4.4 9.352c-.542-.612-1.088-1.33-1.5-2.095c-.411-.762-.706-1.603-.706-2.452C2.194 2.184 4.378 0 7 0m0 6.24a1.435 1.435 0 1 1 0-2.87a1.435 1.435 0 0 1 0 2.87m3.1 3.916q.276-.31.55-.65h1.343c.2 0 .38.12.46.303l1.497 3.495a.5.5 0 0 1-.46.697H.51a.5.5 0 0 1-.46-.697l1.498-3.495a.5.5 0 0 1 .46-.303h1.355q.266.33.537.636c.662.746 1.33 1.376 1.85 1.821c.26.223.487.402.661.528q.13.095.232.157q.049.03.11.06q.03.014.079.03a.55.55 0 0 0 .414-.03q.06-.029.11-.059q.101-.061.231-.155c.174-.126.4-.304.661-.525c.52-.442 1.19-1.069 1.851-1.813" clipRule="evenodd"></path></svg>
      {weather ? weather.name : "Data Loading..."}</h1>
      <span className="mx-3 md:mx-5 mb-2 md:mb-5 text-sm md:text-lg text-end text-white">
      <p>{localtime.toLocaleDateString(dateLang, {weekday:"long"})}</p>
      <p>{localtime.toLocaleTimeString(dateLangs, {timeZone: weather.timezone, timeStyle:"short"})}</p>
      </span>
      </div>
      
      <section className="flex flex-col gap-3 py-5">
      {weather.daily.time.map((date, index)=>{
        return(
       <div key={date} className="flex uppercase items-center justify-between p-5 rounded-2xl bg-white/20">
        <h4 className="font-[Michroma] font-extrabold text-white">{index === 0 ? t("weeklyForecast.day") : new Date(date + "T00:00:00").toLocaleDateString(dateLang, {weekday: "long"})}</h4>
        <img src={`https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${weatherIcons(weather.daily.weather_code[index], weather.daily.wind_speed_10m)}`} className="size-14 items-center justify-center" alt="" />
        <div>  
        <p className="">{Math.round(weather.daily.temperature_2m_max[index])} °C</p>
        </div>
        </div>
       ) })
      }
      </section>
      <section className="flex flex-col gap-3 p-4">
          <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M14.01 2.2h-.04c-.64-.13-1.3-.2-1.97-.2C6.49 2 2 6.49 2 12s4.49 10 10 10c.66 0 1.32-.07 1.95-.19h.07c4.42-.91 7.69-4.69 7.96-9.14c.02-.22.03-.43.03-.66s0-.44-.02-.61c-.27-4.5-3.55-8.28-7.97-9.19ZM4 12c0-3.95 2.89-7.24 6.66-7.88C9.02 5.96 8 8.81 8 12s1.02 6.04 2.66 7.88C6.89 19.24 4 15.96 4 12"></path></svg>
          <h1 className="uppercase text-base font-semibold">{t("weeklyForecast.moonPhase.title")}</h1>
        </span>
        <div className="flex gap-5 items-center justify-center">{moon.icon}
          <p className="text-white">{t(`weeklyForecast.moonPhase.${moon.key}`)}</p>
        </div>
      </section>
      <section className="flex flex-col justify-center p-4">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="#fff" d="M23.476 13.993L16.847 3.437a1.04 1.04 0 0 0-1.694 0L8.494 14.044A10 10 0 0 0 7 19a9 9 0 0 0 18 0a10.06 10.06 0 0 0-1.524-5.007M16 26a7.01 7.01 0 0 1-7-7a8 8 0 0 1 1.218-3.943l.935-1.49l10.074 10.074A6.98 6.98 0 0 1 16 26.001"></path></svg>
          <h1 className="uppercase text-base font-semibold">{t("weeklyForecast.weeklyHumidity")}</h1>
        </span>
      {weather && <WeeklyHumidity weather={weather} />}
      </section>
      <section className="flex flex-col p-4">
        <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><path fill="#fff" d="M9 9a3 3 0 1 1-2.585 4.523a1 1 0 0 1 1.724-1.015A1 1 0 1 0 9 11H2a1 1 0 1 1 0-2zm1.64-7.893a3.5 3.5 0 0 1 4.333 2.96A3.5 3.5 0 0 1 11.5 8H2a1 1 0 0 1 0-2h9.5a1.5 1.5 0 1 0-1.473-1.787a1 1 0 0 1-1.963-.384a3.5 3.5 0 0 1 2.577-2.722"></path></svg>
          <h1 className="uppercase text-base font-semibold">{t("weeklyForecast.weeklyWind")}</h1>
        </span>
      {weather && <WeeklyWindRadar weather={weather} />}
      </section>
    </div>
    </div>
    </>
  )  
 }}