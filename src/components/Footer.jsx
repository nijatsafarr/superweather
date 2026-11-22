import { Link } from "@tanstack/react-router";
import Superweather from "../assets/sunrise.png"
import brand from "../assets/brand.png"
import { useTranslation } from "react-i18next";

export default function Footer() {
  const {t} = useTranslation()
  return(
    <>
    <footer className="flex flex-col w-full h-auto sm:py-7 justify-between text-white" id="footer">
      <div className="flex-1 sm:flex flex-col sm:flex-row w-full items-center justify-between px-4 sm:px-10 md:px-24 lg:px-36">
      <Link href="/">
      <figure className="flex my-4 gap-3 items-center ">
      <img src={Superweather} alt="Superweather Logo" className="size-8 sm:size-10 object-contain"/>
      
      <p className="font-[Michroma] font-bold sm:text-2xl md:text-3xl">Superweather</p>
    </figure>
  </Link>
    <div className="flex flex-col my-5 text-lg sm:gap-5">
      <Link to={"/about"}>{t("footer.about")}</Link>
      <Link to={"/forecast"}>{t("footer.forecast")}</Link>
      <Link to={"/privacy-policy"}>{t("footer.privacyPolicy")}</Link>
    </div>
    </div>      
    <hr className="border-t border-white w-full mt-5" />
    <div className="flex flex-col sm:flex-row text-sm sm:text-base py-2 sm:py-0 items-center justify-between px-4 sm:px-10 md:px-24">
      <p>{t("footer.copyright")}</p>
      <div className="flex items-center gap-4 uppercase">
      <img src={brand} alt="" className="size-10 rounded-md mt-2"/>
      <p>Nijat Safarov</p>
    </div>
    </div>
</footer>
    </>
  )  
}