import React from 'react';
import {
    AsyncStorage,
} from 'react-native';
import Loading from './Loading';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.authNavHandler();
    }


    authNavHandler = async () => {
        //redirections
        try {
            let token = await AsyncStorage.getItem('token');
            if (token) {
                this.props.navigation.navigate('App');
            }
            else
                this.props.navigation.navigate('AuthStack');
        } catch (e) {
            console.log(e);
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <Loading/>
        );
    }
}
