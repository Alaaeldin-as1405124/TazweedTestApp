import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';
import colors from '../theme';
import {Button} from 'react-native-elements';
import baseService from '../services/baseService';
import styles from '../styles';
import Translation from '../../i18n';

export default class Register extends React.Component {

    state = {
        username: '',
        password: '',
        type: 1,
    };
    onChange = (key, value) => {
        this.setState({[key]: value});
    };

    register = async () => {
        let {username, password} = this.state;
        if (username === '' || password === '') {
            alert(Translation.t('fieldsRequired'));
            return;
        }

        let result = await baseService.register({...this.state});
        if (result) {
            alert(Translation.t('regDone'));
            this.props.navigation.navigate('Login', {username, password});
            this.setState({username: '', password: ''});
        } else {
            alert(Translation.t('regFail'));
        }

    };

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

                    <Button title={Translation.t('register')} onPress={() => this.register()}
                            buttonStyle={{backgroundColor: colors.buttonColor}}/>


                </View>
            </View>
        );
    }
}
