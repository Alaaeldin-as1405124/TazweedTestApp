import I18n from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';


I18n.fallbacks = true;
I18n.translations = {
  en,
  ar
};
I18n.missingBehaviour='guess';


export default I18n;
