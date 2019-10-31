import {AsyncStorage} from 'react-native';

const WebApiBaseUrl = `http://127.0.0.1:8000/api`;
export default class BaseService {
    static async getToken() {
        return await AsyncStorage.getItem('token');
    }

    static async getSellers() {
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

    }

    static async addAppointment(appointment) {
        const response = await fetch(`${WebApiBaseUrl}/appointments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await this.getToken(),

            },
            body: JSON.stringify(appointment),
        });

        return response.ok;


    }

    static async getMyAppointments() {
        const response = await fetch(`${WebApiBaseUrl}/myAppointments/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await this.getToken(),

            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            return response.ok;
        }


    }


    static async login(user) {

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
    }

    static async register(user) {

        const authUser = await fetch(`${WebApiBaseUrl}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });


        return authUser.ok;
    }

}
