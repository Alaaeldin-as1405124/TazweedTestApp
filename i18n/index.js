import I18n from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';
import { NativeModules } from 'react-native';

I18n.fallbacks = true;
I18n.translations = {
  en,
  ar
};
I18n.missingBehaviour='guess';


const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;
//we will get the device language in format of en_US or ar_EG ..etc
I18n.locale = deviceLanguage.split('_')[0];//set the current language to the device's language

export default I18n;
