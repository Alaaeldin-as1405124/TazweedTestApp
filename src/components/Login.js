import React from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    AsyncStorage, TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../theme';
import baseService from '../services/baseService';
import styles from '../styles';
import Translation from '../../i18n';

export default class Login extends React.Component {

    state = {
        username: '',
        password: '',
    };

    onChange = (key, value) => {
        this.setState({[key]: value});
    };

    login = async () => {
        let {username,password} = this.state;
        if (username === '' || password === '') {
            alert(Translation.t('fieldsRequired'));
            return;
        }
        let result = await baseService.login({...this.state});
        if (result) {
            //we need to save the token to local storage
            await AsyncStorage.setItem('token', result.token);
            this.props.navigation.navigate('App');
        } else {
            alert(Translation.t('wrongCred'));
        }
    };

    moveToRegister = () => {
        this.props.navigation.navigate('Register');
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        //we have to check if username/password has been passed
        let passedData = nextProps.navigation.state.params;
        if (passedData && passedData.username) {
            this.setState({username: passedData.username, password: passedData.password});
        }
    }

    render() {
        return (
            <View style={styles.topContainer}>
                <View style={{flex: 1}}>
                    <Image source={require('../imgs/logo.png')} style={styles.logoStyle}/>
                </View>
                <View style={styles.bottomContainer}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text => this.onChange('username', text)}
                        placeholder={Translation.t('username')}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text => this.onChange('password', text)}
                        placeholder={Translation.t('password')}
                        value={this.state.password}
                        secureTextEntry={true}
                    />

                    <Button title={Translation.t('login')} onPress={() => this.login()}
                            buttonStyle={{backgroundColor: colors.buttonColor}}/>

                    <TouchableOpacity onPress={() => this.moveToRegister()} style={{padding: 5}}>
                        <Text style={{fontSize: 16}}>{Translation.t('noAccount')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
