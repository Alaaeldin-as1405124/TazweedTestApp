import {AsyncStorage} from 'react-native';
import {Platform} from 'react-native';

const WebApiBaseUrl = `http://${Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2'}:8000/api`;//fix local http issue in android
export default class BaseService {
    static async getToken() {
        return await AsyncStorage.getItem('token');
    }

    static async getSellers() {
        try {
            const response = await fetch(`${WebApiBaseUrl}/sellers/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await this.getToken(),

                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                return response.ok;
            }
        } catch (err) {
            console.log(err);
        }


    }

    static async addAppointment(appointment) {
        try {
            const response = await fetch(`${WebApiBaseUrl}/appointments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await this.getToken(),

                },
                body: JSON.stringify(appointment),
            });

            return response.ok;
        } catch (err) {
            console.log(err);
        }


    }

    static async getMyAppointments() {
        try {
            const response = await fetch(`${WebApiBaseUrl}/myAppointments/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await this.getToken(),

                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                return response.ok;
            }
        } catch (err) {
            console.log(err);
        }


    }


    static async login(user) {
        try {
            const authUser = await fetch(`${WebApiBaseUrl}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //,'Authorization': token
                },
                body: JSON.stringify(user),
            });

            if (authUser.ok) {
                return await authUser.json();
            } else {
                return authUser.ok;
            }
        } catch (err) {
            console.log(err);
        }

    }

    static async register(user) {
        try {
            const authUser = await fetch(`${WebApiBaseUrl}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });


            return authUser.ok;
        } catch (err) {
            console.log(err);
        }

    }

}
