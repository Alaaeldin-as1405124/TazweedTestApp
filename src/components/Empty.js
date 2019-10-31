import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Translation from '../../i18n'

export default class Empty extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>{Translation.t('notFound')} {this.props.text ? this.props.text : Translation.t('result')} </Text>
            </View>
        );
    }
}
