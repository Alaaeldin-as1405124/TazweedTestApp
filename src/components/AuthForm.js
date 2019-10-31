import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    TextInput,
    AsyncStorage,
} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../theme';
import baseService from '../services/baseService';

export default class AuthForm extends React.Component {

    render() {

        return (
            <View style={styles.topContainer}>
                <View style={{flex: 1}}>
                    <Image source={require('../imgs/logo.png')} style={{alignSelf: 'center', margin: 25}}/>
                </View>
                <View style={styles.bottomContainer}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text => this.props.onChange('username', text)}
                        placeholder={'Enter your username'}
                        value={this.props.username}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text => this.props.onChange('password', text)}
                        placeholder={'Enter your password'}
                        value={this.props.password}
                        secureTextEntry={true}
                    />

                    <Button title="Login" onPress={() => this.props.login()}/>


                </View>
                <View style={{flex: 1}}>
                    <Button title="Register" onPress={() => this.props.register()}/>

                </View>
            </View>
        );
    }
}


