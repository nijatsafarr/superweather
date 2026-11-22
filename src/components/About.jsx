import { useTranslation } from "react-i18next"
import { useAppContext } from "../routes/__root"

export default function About() {
  const {theme} = useAppContext()
  const {t, i18n} = useTranslation()

  return(
    <>
    <div style={{background: theme ? "#07093a" : "#e4e5f9", color: theme ? "white" : "#07093a", minHeight: "100vh"}}>
     <div className="flex items-center justify-center mx-auto w-64 h-12 rounded-2xl bg-indigo-900" style={{background: theme ? "#e4e5f9" : "#07093a"}}>
      <h1 className="font-mono text-3xl text-center text-white" style={{color: theme ? "#07093a" : "#e4e5f9"}}>{t("about.title")}</h1>   
      </div>
      <div className="mx-7 sm:mx-12 lg:mx-32">
      <p className="text-base sm:text-lg text-justify mt-10"><span className="font-bold font-[Michroma]">SuperWeather</span> - {t("about.intro1")}</p>
      <p className="text-lg text-justify pt-4">{t("about.intro2")}</p>
      <h3 className="font-bold text-xl pt-5">{t("about.platformFeatures")}</h3>
      <p className="font-semibold text-lg py-3">{t("about.currentWeather")}</p>
      <p className="text-lg ">{t("about.currentWeatherDesc")}</p>
      <p className="font-semibold text-lg py-3">{t("about.dailyForecast")}</p>
      <p className="text-lg">{t("about.dailyForecastDesc")}</p>
      <p className="font-semibold text-lg py-3">{t("about.globalCity")}</p>
      <p className="text-lg">{t("about.globalCityDesc")}</p>
       
       <p className="font-semibold text-lg py-3">{t("about.forecastMap")}</p>
       <p className="text-lg">{t("about.forecastMapDesc")}</p>
       <p className="font-semibold text-lg py-3">{t("about.customize")}</p>
       <p className="text-lg">{t("about.customizeDesc1")}</p>
       <p className="text-lg py-2">{t("about.customizeDesc2")}</p>
       <p className="font-semibold text-lg py-3">{t("about.ourMission")}</p>
       <p className="text-lg py-2">{t("about.ourMissionDesc")}</p>
       <p className="text-lg py-3">{t("about.subtitle")}</p>
       </div>
    </div>
    </>
  )
}