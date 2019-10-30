import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    Image,
    TextInput,
    AsyncStorage
} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../theme';
import baseService from '../services/baseService';

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Login',
        headerTitleStyle: {
            color: colors.barTitleColor,
            fontSize: 20,
            fontWeight: '400',
        },
        headerStyle: {
            backgroundColor: colors.primary,
        },
    };

    state = {
        username: '',
        password: '',
    };
    onChange = (key, value) => {
        this.setState({[key]: value});
    };

    login =async () => {
      let result = await baseService.login({...this.state});
        if (result) {
            //alert('you have logged in :D' + response.token)
            //we need to save the token somewhere
            await AsyncStorage.setItem('token', result.token);
            this.props.navigation.navigate('App');
        } else {
            alert('Wrong creds');
        }
    };
    register = () => {
        this.props.navigation.navigate('Register');
    };

    componentWillMount(): void {
        console.log('compoentnn will mounnt ')
        //we have to check if username/password has been passed
        let passedData = this.props.navigation.state.params;
        if(passedData && passedData.username){
            this.setState({username:passedData.username,password:passedData.password})
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.log(' iam recing poropss sss',this.props.navigation.state)
    }

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{flex: 1}}>
                    <Image source={require('../imgs/logo.png')} style={{alignSelf: 'center'}}/>
                </View>
                <View style={{flex: 3, justifyContent: 'center', padding: 10}}>

                    <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            margin: 5,
                            padding: 5,
                            borderRadius: 3,
                        }}
                        onChangeText={text => this.onChange('username', text)}
                        placeholder={'Enter your username'}
                        value={this.state.username}
                    />
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            margin: 5,
                            padding: 5,
                            borderRadius: 3,
                        }}
                        onChangeText={text => this.onChange('password', text)}
                        placeholder={'Enter your password'}
                        value={this.state.password}
                        secureTextEntry={true}
                    />

                    <Button title="Login" onPress={() => this.login()}/>


                </View>
                <View style={{flex: 1}}>
                    <Button title="Register" onPress={() => this.register()}/>

                </View>
            </View>
        );
    }
}
