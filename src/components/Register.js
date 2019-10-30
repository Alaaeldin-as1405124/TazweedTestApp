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

export default class Register extends React.Component {
    static navigationOptions = {
        title: 'Register',
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

    register = async () =>{
        if(this.state.username === '' || this.state.password === '')
        {
            alert('All fields are required');
            return;
        }
        let result = await baseService.register({...this.state});
        if(result){
            alert('Registered successfully ');
            this.props.navigation.navigate('Login',{...this.state});
            this.setState({username:'',password:''})
        }
        else{
            alert('Failed to register')
        }
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

                    <Button title="Register" onPress={() => this.register()}/>


                </View>
            </View>
        );
    }
}
