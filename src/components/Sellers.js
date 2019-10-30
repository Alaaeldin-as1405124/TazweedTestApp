import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';
import baseService from '../services/baseService';
import Loading from './Loading';
import {Button, Card} from 'react-native-elements';

import Translation from '../../i18n';

export default class Sellers extends React.Component {

    state={
        sellers:[],
        loading:true
    };
    componentWillMount(): void {
        baseService.getSellers().then((sellers)=>{
            console.log('sellers are ',sellers)
            this.setState({loading:false,sellers})
        }).catch((err)=>this.setState({loading:false}))
    }

    moveToBooking = (singleSeller) =>{
        this.props.navigation.navigate('Booking',singleSeller);
    }
    render() {
        if(this.state.loading)
            return <Loading/>;
        return (
            <View style={{flex:1}}>
                {this.state.sellers.length > 0 ? this.state.sellers.map((singleSeller)=>{
                    return(
                        <View>
                            <Card
                                title={Translation.locale === 'en' ? singleSeller.name : singleSeller.nameAr}
                            >
                                <View style={{marginBottom: 0}}>
                                    <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>

                                        <Text >{Translation.locale === 'en' ? singleSeller.desc : singleSeller.descAr}</Text>
                                        <Button title={'Book now'} onPress={()=>this.moveToBooking(singleSeller)}/>


                                    </View>



                                </View>


                            </Card>
                        </View>
                        )

                }) : <Text>There is no sellers yet</Text>}
            </View>
        );
    }
}
