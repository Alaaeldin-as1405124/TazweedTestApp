
import React, {Component} from 'react';
import {Index} from './src/';
import i18n from 'react-native-i18n'

export default class App extends Component {
  //this localization here to update the whole app language dynamically
  state = {
    locale: i18n.locale,
  };

  setLocale = locale => {
    this.setState({ locale });
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };

  render() {
    return (
        <Index
            screenProps={{
              t: this.t,
              locale: this.state.locale,
              setLocale: this.setLocale,
            }}
        />
    );

  }

}


