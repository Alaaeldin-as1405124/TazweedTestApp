import React from 'react';
import {
    ActivityIndicator, Picker,
    Text,
    View,
    Platform,
} from 'react-native';
import {Button, Card, CheckBox} from 'react-native-elements';
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

export default class Booking extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: Translation.locale === 'en' ? navigation.state.params.name : navigation.state.params.nameAr,
    });


    state = {
        seller: this.props.navigation.state.params,
        timeSlot: '',
        value: 0,
        date: new Date(),
        show: false,
    };

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    };

    getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd + ' 00:00';
    };
    convertTime = (time) => {
        return moment(time, 'HH:mm').format('h:mm A');
    };

    dropDownData = () => {
        let seller = {...this.state.seller};
        if (seller && seller.timeSlot) {
            let timeSlots = [];
            seller.timeSlot.forEach((singleTimeSlot) => timeSlots.push(this.convertTime(singleTimeSlot.startTime) + ' to ' + this.convertTime(singleTimeSlot.endTime)));
            return timeSlots;
        }

    };

    render() {
        let seller = this.state.seller;
        return (

            <View style={{flex: 1}}>
                <Modal isVisible={this.state.show}
                       animationType="slide"
                       hasBackdrop={true}
                       coverScreen={false}
                >

                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}>
                        <CalendarPicker
                            minDate={moment()}
                            maxDate={moment(new Date()).add(7, 'days')}
                            todayBackgroundColor="#f2e6ff"
                            selectedDayColor="#7300e6"
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={() => this.setState({show: false})}

                        />
                    </View>
                </Modal>
                <Card
                    title={'Select appointment date'}
                >
                    <View style={{marginBottom: 0, padding: 5}}>
                        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                            <Button title={'Choose date'} onPress={() => this.setState({show: true})}/>

                            <RadioButton.Group
                                onValueChange={value => this.setState({value})}
                                value={this.state.value}
                                style={{borderWidth: 2, borderColor: 'black'}}
                            >
                                {seller.timeSlots.map((singleTimeSlot, index) => {
                                    return (


                                        <View style={{flexDirection: 'row', borderWidth: 2, borderColor: 'black'}}>
                                            <RadioButton value={index}/>
                                            <Text>{this.convertTime(singleTimeSlot.startTime) + ' to ' + this.convertTime(singleTimeSlot.endTime)}</Text>

                                        </View>


                                    );
                                })}
                            </RadioButton.Group>

                            <Button title={'Book now'} onPress={() => this.bookNow()}/>


                        </View>


                    </View>


                </Card>
            </View>
        );
    }
}
