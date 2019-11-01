import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';
import Translate from '../../i18n';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>{Translate.t('loading')}</Text>
                <ActivityIndicator/>
            </View>
        );
    }
}
