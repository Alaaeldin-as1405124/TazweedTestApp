import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import baseService from '../services/baseService';
import Loading from './Loading';
import {Button, Card} from 'react-native-elements';
import Translation from '../../i18n';
import colors from '../theme';
import {Searchbar} from 'react-native-paper';
import Empty from './Empty';

export default class Sellers extends React.Component {

    state = {
        sellers: [],
        sellersFiltered: [],
        loading: true,
        searchValue: '',
    };

    componentWillMount(): void {
        baseService.getSellers().then((sellers) => {
            //console.log('sellers are ',sellers)
            this.setState({loading: false, sellers, sellersFiltered: sellers});
        }).catch((err) => this.setState({loading: false}));
    }

    moveToBooking = (singleSeller) => {
        this.props.navigation.navigate('Booking', singleSeller);
    };
    search = (searchValue) => {
        //keep state sync with the searched value
        this.setState({searchValue});
        try {
            let {sellers} = this.state;
            if (searchValue == '') {
                //get all sellers
                this.setState({sellersFiltered: sellers});
            } else {
                //do search
                let sellersFiltered = sellers.filter((singleSeller) => Translation.locale === 'en' ? singleSeller.name.toLowerCase().includes(searchValue.toLowerCase()) : singleSeller.nameAr.toLowerCase().includes(searchValue.toLowerCase()));
                //set the state to the filtered sellers
                this.setState({sellersFiltered});
            }
        } catch (err) {
            console.log('error happened in search', err);
        }

    };

    render() {
        if (this.state.loading) {
            return <Loading/>;
        }
        return (
            <View style={{flex: 1}}>
                <Searchbar
                    placeholder={Translation.t('search')}
                    onChangeText={searchValue => this.search(searchValue)}
                    value={this.state.searchValue}
                />

                {this.state.sellersFiltered.length > 0 ? this.state.sellersFiltered.map((singleSeller, index) => {
                    return (
                        <View key={index}>
                            <Card title={Translation.locale === 'en' ? singleSeller.name : singleSeller.nameAr}>
                                <View style={{marginBottom: 0}}>
                                    <View style={{
                                        marginBottom: 10,
                                        flexDirection: 'row'
                                    }}>

                                        <Text>{Translation.locale === 'en' ? singleSeller.desc : singleSeller.descAr}</Text>


                                    </View>
                                    <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                        <Button title={Translation.t('bookAppointment')}
                                                onPress={() => this.moveToBooking(singleSeller)}
                                                buttonStyle={{backgroundColor: colors.buttonColor}}/>

                                    </View>


                                </View>


                            </Card>
                        </View>
                    );

                }) : <Empty text={Translation.t('sellersText')}/>}
            </View>
        );
    }
}
