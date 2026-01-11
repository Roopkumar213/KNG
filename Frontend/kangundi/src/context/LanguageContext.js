import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        nav: { heritage: "Heritage", experiences: "Experiences", itineraries: "Itineraries", gallery: "Gallery", events: "Events", bouldering: "Bouldering", contact: "Contact" },
        home: { subtitle: "Where ancient granite meets living heritage.", cta_heritage: "Explore Heritage", cta_bouldering: "Climb Stones" },
        bouldering: {
            title: "KANGUNDI BOULDERS",
            subtitle: "Granite. Friction. Flow. Climb the pristine tors of the Deccan.",
            book_btn: "Book a Guide",
            download_btn: "Download Topo"
        }
    },
    te: {
        nav: { heritage: "వారసత్వం", experiences: "అనుభవాలు", itineraries: "యాత్రాలు", gallery: "చిత్రమాలిక", events: "కార్యక్రమాలు", bouldering: "బౌల్డరింగ్", contact: "సంప్రదించండి" },
        home: { subtitle: "పురాతన గ్రానైట్ మరియు సజీవ వారసత్వం కలిసే చోట.", cta_heritage: "వారసత్వాన్ని అన్వేషించండి", cta_bouldering: "రాళ్ళను అధిరోహించండి" },
        bouldering: {
            title: "కంగుంది బౌల్డర్స్",
            subtitle: "గ్రానైట్. రాపిడి. ప్రవాహం. దక్కన్ పీఠభూమి రాళ్ళను అధిరోహించండి.",
            book_btn: "గైడ్ బుక్ చేయండి",
            download_btn: "టోపో డౌన్‌లోడ్"
        }
    },
    ta: {
        nav: { heritage: "பாரம்பரியం", experiences: "அனுபவங்கள்", itineraries: "பயணத் திட்டங்கள்", gallery: "கேலரி", events: "நிகழ்வுகள்", bouldering: "பவுல்டரிங்", contact: "தொடர்பு" },
        home: { subtitle: "பண்டைய கிரானைட் மற்றும் வாழும் பாரம்பரியம் சந்திக்கும் இடம்.", cta_heritage: "பாரம்பரியம்", cta_bouldering: "ஏறுதல்" },
        bouldering: {
            title: "கங்குந்தி பாறைகள்",
            subtitle: "கிரானைட். உராய்வு. ஓட்டம். தக்காண பீடபூமி பாறைகளை ஏறுங்கள்.",
            book_btn: "வழிகாட்டி பதிவு",
            download_btn: "வரைபடம் பதிவிறக்கம்"
        }
    },
    hi: {
        nav: { heritage: "विरासत", experiences: "अनुभव", itineraries: "यात्रा कार्यक्रम", gallery: "चित्रशाला", events: "कार्यक्रम", bouldering: "बोल्डर्इंग", contact: "संपर्क" },
        home: { subtitle: "जहां प्राचीन ग्रेनाइट और जीवित विरासत का मिलन होता है।", cta_heritage: "विरासत देखें", cta_bouldering: "चढ़ाई करें" },
        bouldering: {
            title: "कंगुंधी बोल्डर्स",
            subtitle: "ग्रेनाइट. घर्षण. प्रवाह. दक्कन की चट्टानों पर चढ़ें।",
            book_btn: "गाइड बुक करें",
            download_btn: "टोपो डाउनलोड"
        }
    },
    kn: {
        nav: { heritage: "ಪರಂಪರೆ", experiences: "ಅನುಭವಗಳು", itineraries: "ಪ್ರವಾಸಗಳು", gallery: "ಚಿತ್ರಸಂಪುಟ", events: "ಕಾರ್ಯಕ್ರಮಗಳು", bouldering: "ಬೌಲ್ಡರಿಂಗ್", contact: "ಸಂಪರ್ಕ" },
        home: { subtitle: "ಗ್ರಾನೈಟ್ ಬಂಡೆಗಳು ಮತ್ತು ಪರಂಪರೆಯ ಸಂಗಮ.", cta_heritage: "ಪರಂಪರೆ ನೋಡಿ", cta_bouldering: "ಬಂಡೆ ಏರಿ" },
        bouldering: {
            title: "ಕಂಗುಂದಿ ಬೌಲ್ಡರ್ಸ್",
            subtitle: "ಗ್ರಾನೈಟ್. ಘರ್ಷಣೆ. ಹರಿವು. ಡೆಕ್ಕನ್ ಬಂಡೆಗಳನ್ನು ಏರಿ.",
            book_btn: "ಗೈಡ್ ಬುಕ್ ಮಾಡಿ",
            download_btn: "ನಕ್ಷೆ ಡೌನ್‌ಲೋಡ್"
        }
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => localStorage.getItem('site_lang') || 'en');

    const t = (keyStr) => {
        const keys = keyStr.split('.');
        let value = translations[language];
        for (const key of keys) {
            value = value?.[key];
        }
        return value || keyStr;
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('site_lang', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
