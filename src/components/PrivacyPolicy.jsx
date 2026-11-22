import { useTranslation } from "react-i18next"
import { useAppContext } from "../routes/__root"
import { LanguageIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { EyeIcon } from "@heroicons/react/16/solid"

export default function PrivacyPolicy() {
    const {theme} = useAppContext()
    const {t} = useTranslation()
  return(
    <>
    <div style={{background: theme ? "#07093a" : "#e4e5f9", color: theme ? "white" : "#07093a", minHeight: "100vh", paddingTop: "20px"}}>
     <h1 className="flex text-xl text-center items-center justify-center mx-auto w-72 h-12 rounded-2xl bg-indigo-900" style={{background: theme ? "#e4e5f9" : "#07093a", color: theme ? "#07093a": "#e4e5f9"}}>{t("privacyPolicy.title")}
      </h1>
      <h1 className="" style={{color: theme ? "#07093a" : "#e4e5f9"}}></h1>   
      
      <div className="mx-7 sm:mx-12 lg:mx-32">
        
      <p className="text-base sm:text-lg text-justify mt-10">{t("privacyPolicy.intro1")}</p>
      <p className="text-lg text-justify py-2">{t("privacyPolicy.intro2")}</p>
      <h3 className="text-lg py-2">{t("privacyPolicy.intro3")}</h3>
      <p className="font-bold text-lg py-2">{t("privacyPolicy.infoCollect")}</p>
      <p className="text-lg ">{t("privacyPolicy.infoCollectDesc")}</p>
      <ul className="text-lg py-3">{t("")}
        <div className="flex gap-3 items-center">
        <MagnifyingGlassIcon className="size-5"/>
        <li className="font-semibold">{t("privacyPolicy.cityInfo")}</li>
        </div>
        <li className="ml-7">{t("privacyPolicy.cityInfoDesc")}</li>
         <div className="flex gap-3 items-center">
        <LanguageIcon className="size-5"/>
        <li className="font-semibold">{t("privacyPolicy.langPreferences")}</li>
        </div>
        <li className="ml-7">{t("privacyPolicy.langPreferencesDesc")}</li>
         <div className="flex gap-3 items-center">
        <EyeIcon className="size-5"/>
        <li className="font-semibold">{t("privacyPolicy.displayPreferences")}</li>
        </div>
        <li className="ml-7">{t("privacyPolicy.displayPreferencesDesc")}</li>
      </ul>
      <p className="font-bold text-lg py-3">{t("privacyPolicy.infoGoals")}</p>
      <ul className="text-lg list-disc">{t("privacyPolicy.infoGoalsDesc")}
        <li className="ml-8 pt-1.5">{t("privacyPolicy.1")}</li>
        <li className="ml-8 pt-1.5">{t("privacyPolicy.2")}</li>
        <li className="ml-8 pt-1.5">{t("privacyPolicy.3")}</li>
        <li className="ml-8 pt-1.5">{t("privacyPolicy.4")}</li>
        <li className="ml-8 pt-1.5">{t("privacyPolicy.5")}</li>
      </ul>
      <p className="font-bold text-lg pt-5 py-2">{t("privacyPolicy.three-partyServices")}</p>
       <p className="text-lg py-1">{t("privacyPolicy.three-partyDesc-1")}</p>
       <p className="text-lg py-1">{t("privacyPolicy.three-partyDesc-2")}</p>
       <p className="text-lg py-3">{t("privacyPolicy.three-partyDesc-3")}</p>
       <p className="font-bold text-lg py-3">{t("privacyPolicy.cookies")}</p>
       <p className="text-lg py-1">{t("privacyPolicy.cookiesDesc1")}</p>
       <p className="text-lg py-1">{t("privacyPolicy.cookiesDesc2")}</p>
       <p className="font-bold text-lg py-2">{t("privacyPolicy.children'sPrivacy")}</p>
       <p className="text-lg pb-10">{t("privacyPolicy.children'sPrivacyDesc")}</p>
        </div>
      </div>
    </>
  )  
}