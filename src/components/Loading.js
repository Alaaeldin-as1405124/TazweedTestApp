import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'black'}}>Loading, please wait</Text>
                <ActivityIndicator />
            </View>
        );
    }
}
