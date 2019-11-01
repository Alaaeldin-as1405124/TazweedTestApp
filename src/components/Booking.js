import React from 'react';
import {
    ActivityIndicator, Picker,
    Text,
    View,
    StyleSheet, TouchableOpacity, TextInput, ScrollView,
} from 'react-native';
import {Button, Card, CheckBox} from 'react-native-elements';
import {Caption} from 'react-native-paper';
import Translation from '../../i18n';
import colors from '../theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-ranges';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import {RadioButton} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import baseService from '../services/baseService';

export default class Booking extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: Translation.locale === 'en' ? navigation.state.params.name : navigation.state.params.nameAr,
    });


    state = {
        seller: this.props.navigation.state.params,
        date: new Date(),
        show: false,
        selectedIndex: 0,
    };

    convertTime = (time) => {
        return moment(time, 'HH:mm').format('h:mm A');
    };


    componentWillUnmount(): void {
        this.setState({show:false})
    }

    renderDateModal = () => {
        return (
            <Modal isVisible={this.state.show} animationType="slide" hasBackdrop={true} coverScreen={true}>
                <View style={styles.modalContent}>
                    <CalendarPicker
                        minDate={moment()}
                        maxDate={moment(new Date()).add(7, 'days')}
                        onDateChange={(date) => {
                            this.setState({show: false, date: date._d});
                        }}
                    />
                </View>
            </Modal>
        );
    };

    bookNow = async () => {
        const {seller, date, selectedIndex} = this.state;
        //add appointment
        let appointment = {
            sellerId: seller.userId,
            appointmentDate: date.toDateString(),
            time: this.getTimeFormatFromTimeSlot(seller.timeSlots[selectedIndex]),

        };
        let result = await baseService.addAppointment(appointment);
        if (result) {
            alert(Translation.t('bookingDone'));
            this.props.navigation.navigate('Appointments');
        } else {
            alert(Translation.t("bookingFail"));
            //report the issue to the server or something
        }

    };
    getTimeFormatFromTimeSlot = (singleTimeSlot) => {
        return this.convertTime(singleTimeSlot.startTime) + ' to ' + this.convertTime(singleTimeSlot.endTime);
    };

    render() {
        let {seller} = this.state;
        if(seller.timeSlots.length ===0){
            return(
                <View style={styles.centeredContainer}>
                    <Text style={{color: 'black'}}>{Translation.t('noTimeSlots')}</Text>
                </View>
            )
        }
        return (

            <ScrollView style={{flex: 1}}>
                {this.renderDateModal()}

                <Card title={Translation.t('selectDateTime')} >
                    <View>
                        <View>
                            <Caption>{Translation.t('selectDate')}</Caption>
                            <Button buttonStyle={styles.buttonStyle}
                                    title={this.state.date.toDateString()}
                                    titleStyle={{color: 'black'}}
                                    onPress={() => this.setState({show: true})}/>
                        </View>


                        <Caption>{Translation.t('selectTime')}</Caption>
                        {seller.timeSlots.map((singleTimeSlot, index) => {
                            return (
                                <View>
                                    <CheckBox
                                        title={this.getTimeFormatFromTimeSlot(singleTimeSlot)}
                                        checkedColor={colors.buttonColor}
                                        checked={this.state.selectedIndex === index}
                                        onPress={() => this.setState({selectedIndex: index})}
                                    />
                                </View>


                            );
                        })}

                        <Button title={Translation.t('bookNow')} onPress={() => this.bookNow()} buttonStyle={{backgroundColor:colors.buttonColor}}/>


                    </View>

                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    buttonStyle: {
        backgroundColor: 'transparent', borderWidth: 2,
        borderColor:colors.buttonColor
    },
    centeredContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

});
