import store from '../vuex/store'
import ru from './locales/ru.json'
import en from './locales/en.json'
import ua from './locales/ua.json'

const locales = {
    'ru-RU': ru,
    'en-US': en,
    'ua-Ua': ua,

}

export default function localizeFilter(key) {
    const locale = store.getters.locale || 'ru-RU'
    return locales[locale][key] || `[Localize error]: key ${key} not found`
}