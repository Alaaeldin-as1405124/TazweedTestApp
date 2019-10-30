import React from 'react';
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
 import colors from './theme';
import AuthLoading from './components/AuthLoading';
import {Platform, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Login from './components/Login';
import Register from './components/Register';
import Appointments from './components/Appointments';
import Sellers from './components/Sellers';
import Seller from './components/Seller';
import Booking from './components/Booking';
import Translation from '../i18n/index'

//stack navigator means multiple related screens can be navigated up or down as we want (Activities)


const HomeStack = createStackNavigator({

        Home: {screen: Sellers},
        Seller: {screen: Seller},
        Booking: {screen: Booking},
    }, {
        defaultNavigationOptions: ({navigation}) => ({
            headerTintColor: 'white',
            title:Translation.t(navigation.state.routeName),
            headerRightContainerStyle: {padding: 10},
            headerTitleStyle: {
                color: colors.barTitleColor,
                fontSize: 20,
                fontWeight: '400',
            },
            headerStyle: {
                backgroundColor: colors.primary,
            },
        }),
    },
);
const AppointmentsStack = createStackNavigator({

        Appointments: {screen: Appointments},
    }, {
        defaultNavigationOptions: ({navigation}) => ({
            headerTintColor: 'white',
            title:Translation.t(navigation.state.routeName),
            headerRightContainerStyle: {padding: 10},
            headerTitleStyle: {
                color: colors.barTitleColor,
                fontSize: 20,
                fontWeight: '400',
            },
            headerStyle: {
                backgroundColor: colors.primary,
            },
        }),
    },
);


const AuthStack = createStackNavigator({

        Login: {screen: Login},
        Register: {screen: Register},
    }, {
        defaultNavigationOptions: ({navigation}) => ({
            headerTintColor: 'white',
            headerRightContainerStyle: {padding: 10},
            title:Translation.t(navigation.state.routeName),
            headerTitleStyle: {
                color: colors.barTitleColor,
                fontSize: 20,
                fontWeight: '400',
            },
            headerStyle: {
                backgroundColor: colors.primary,
            },
        }),
    },
);




const AppStack = createBottomTabNavigator({

    Home: {screen: HomeStack},
    Appointments: {screen: AppointmentsStack},

}, {
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#694fad'},
    animationEnabled: true,
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let IconComponent = Ionicons;
            let iconName;

            if (routeName === 'Home') {
                iconName = 'home';
            }
            else if (routeName === 'Search') {
                iconName = 'search';
            }
            else  {
                iconName = 'cog';
            }
            //if (Platform.OS === 'ios') {
            //  iconName = `ios-${iconName}`;
            //} else {
            //   iconName = `md-${iconName}`;
            //}

            // You can return any component that you like here!
            return <Icon name={iconName} size={18} color={tintColor}/>;
            //return <Icon name={"user"} size={25} color={tintColor} />;
        },
        tabBarPosition: 'bottom',
        swipeEnabled: true, optimizationsEnabled: true,
        tabBarLabel:({focused, tintColor}) => {
            const {routeName} = navigation.state;
            return <Text style={{color:'white',textAlign:'center'}}>{Translation.t(routeName)}</Text>
        },


    }),
    tabBarOptions: {
        inactiveTintColor: 'gray',
        indicatorStyle: {backgroundColor: 'white'},
        showLabel: true,
        showIcon: true,
        scrollEnabled: false,
        style: {backgroundColor: colors.barBackground},
    },

});


export const Index = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: AppStack,
        AuthStack:AuthStack
    },
    {
        initialRouteName: 'AuthLoading',
    }));
