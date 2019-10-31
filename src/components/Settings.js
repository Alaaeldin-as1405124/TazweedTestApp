import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
    AsyncStorage, Modal,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Translation from '../../i18n';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../theme'
export default class Settings extends React.Component {
    state = {
        modal: false,
    };
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };
    changeLanguage = async (lang) => {
        Translation.locale = lang;

        //console.log('Language changed it was ' + this.props.screenProps.locale);
        this.props.screenProps.setLocale(lang);
        //console.log(this.props.screenProps);
        this.setState({modal: false});
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal animationType="fade" transparent={true} visible={this.state.modal}>
                    <View style={{
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: '#00000055',
                        padding: 10,
                    }}>
                        <ListItem
                            title={'عربي'}
                            onPress={() => this.changeLanguage('ar')}
                            bottomDivider
                            chevron
                        />
                        <ListItem
                            title={'English'}
                            onPress={() => this.changeLanguage('en')}
                            bottomDivider
                            chevron
                        />
                    </View>

                </Modal>

                <ListItem
                    title={Translation.t('appLanguage')}
                    leftIcon={<Icon
                        style={{padding: 5}}
                        name="language"
                        size={15}
                        color="black"
                    />}
                    bottomDivider
                    chevron
                    onPress={() => this.setState({modal: true})}
                />


                <Button title={Translation.t('logout')} onPress={() => this.logout()} buttonStyle={{backgroundColor:colors.buttonColor}}/>
            </View>
        );
    }
}
