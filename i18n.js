import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translateAz from "./src/local/translate_az.json";
import translateAr from "./src/local/translate_ar.json";
import translateBg from "./src/local/translate_bg.json";
import translateCn from "./src/local/translate_cn.json";
import translateDe from "./src/local/translate_de.json";
import translateEn from "./src/local/translate_en.json";
import translateEs from "./src/local/translate_es.json";
import translateFr from "./src/local/translate_fr.json";
import translateGr from "./src/local/translate_gr.json";
import translateIn from "./src/local/translate_in.json";
import translateIt from "./src/local/translate_it.json";
import translateJp from "./src/local/translate_jp.json";
import translateKz from "./src/local/translate_kz.json";
import translatePk from "./src/local/translate_pk.json";
import translatePl from "./src/local/translate_pl.json";
import translateRu from "./src/local/translate_ru.json";
import translateTh from "./src/local/translate_th.json";
import translateTr from "./src/local/translate_tr.json";
import tramslateUa from "./src/local/translate_ua.json";
import translateUz from "./src/local/translate_uz.json";

i18n.use(initReactI18next).init({
    resources: {
        az: {translation: translateAz},
        ar: {translation: translateAr},
        bg: {translation: translateBg},
        cn: {translation: translateCn},
        de: {translation: translateDe},
        en: {translation: translateEn},
        es: {translation: translateEs},
        fr: {translation: translateFr},
        gr: {translation: translateGr},
        in: {translation: translateIn},
        it: {translation: translateIt},
        jp: {translation: translateJp},
        kz: {translation: translateKz},
        pk: {translation: translatePk},
        pl: {translation: translatePl},
        ru: {translation: translateRu},
        th: {translation: translateTh},
        tr: {translation: translateTr},
        ua: {translation: tramslateUa},
        uz: {translation: translateUz}
    },
    language: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {escapeValue: false}
})

export default i18n