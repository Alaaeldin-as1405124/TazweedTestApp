import React from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import {Button, Card, ListItem} from 'react-native-elements';
import baseService from '../services/baseService';
import Empty from './Empty';
import Loading from './Loading';
import Translation from '../../i18n';
import colors from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

export default class Appointments extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight:
            <Icon
                style={{padding: 5}}
                name="filter"
                size={15}
                color="white"
                onPress={navigation.getParam('filter')}
            />,
        headerRightContainerStyle: {padding: 10},

    });
    state = {
        appointments: [],
        appointmentsFiltered: [],
        loading: true,
        filterModal: false,
        filterOptions: ['All', 'Pending', 'Accepted', 'Rejected', 'Past', 'Comings', 'Today'],
        filterCheckedIndex: 0,
    };

    componentWillMount(): void {
        //when component get loaded
        this.fetchAppointments();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        //after booking the appointment
        this.fetchAppointments();
    }

    componentDidMount(): void {
        this.props.navigation.setParams({filter: this.filter});
    }

    fetchAppointments = () => {
        baseService.getMyAppointments()
            .then((appointments) => this.setState({appointments, appointmentsFiltered: appointments, loading: false}))
            .catch((err) => {
                console.log(err);
                this.setState({loading: false});
            });
    };
    filter = () => {
        this.setState({filterModal: true});
    };
    getAppointmentIcon = (status) => {
        let icon = 'hourglass-half';
        let color = 'black';
        if (status === 'Accepted') {
            icon = 'calendar-check';
            color = 'green';

        } else if (status === 'Rejected') {
            icon = 'calendar-times';
            color = 'red';
        }

        return {
            icon,
            color,
        };

    };

    filterAppointments = (index) => {
        //keep the state sync with the selected index
        this.setState({filterCheckedIndex: index});
        let appointments = [...this.state.appointments];
        //filter by condition
        if (index === 1 || index === 2 || index === 3) {
            //pending or accepted or rejected
            appointments = appointments.filter((singleAppointment) => singleAppointment.status === this.state.filterOptions[index]);
        } else if (index === 4) {
            //Past if the appointment date is smaller than today's date
            appointments = appointments.filter((singleAppointment) => Date.parse(singleAppointment.appointmentDate)-Date.parse(new Date().toDateString())<0);
        } else if (index === 5) {
            //Coming if the appointment date is greater than today's date
            appointments = appointments.filter((singleAppointment) => Date.parse(singleAppointment.appointmentDate)-Date.parse(new Date().toDateString())>=0);
        } else if (index === 6) {
            //Today's appointments
            console.log('todays date ');
            appointments = appointments.filter((singleAppointment) => singleAppointment.appointmentDate === new Date().toDateString());
        }
        //by default it's all if no conditions matched and hide the filter modal
        this.setState({appointmentsFiltered: appointments, filterModal: false});
    };

    renderFilterModal = () => {
        return (
            <Modal isVisible={this.state.filterModal} hasBackdrop={true} coverScreen={false}
                   style={{justifyContent: 'center'}}
                   onBackdropPress={() => this.setState({filterModal: false})}>
                <ScrollView>
                    <ListItem title={Translation.t('selectFilter')} bottomDivider titleStyle={{alignSelf: 'center'}}/>

                    {this.state.filterOptions.map((singleOption, index) => {
                        return (
                            <ListItem title={Translation.t(singleOption.toLowerCase())}
                                      rightIcon={this.state.filterCheckedIndex === index &&
                                      <Icon style={{padding: 5}} name="check-circle" size={20}
                                            color={colors.buttonColor}/>}
                                      onPress={() => this.filterAppointments(index)}
                            />


                        );
                    })}

                </ScrollView>
            </Modal>

        );
    };

    render() {
        console.log('the apo', this.state.appointmentsFiltered);
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }
        return (
            <View style={{flex: 1}}>
                {this.renderFilterModal()}
                <ScrollView style={{flex: 1}}>
                    {this.state.appointmentsFiltered.length > 0 ? this.state.appointmentsFiltered.map((singleAppointment, index) => {
                        return (
                            <View key={index}>
                                <Card
                                    title={Translation.locale === 'en' ? singleAppointment.sellerId.name : singleAppointment.sellerId.nameAr}>
                                    <View style={{marginBottom: 0}}>
                                        <View style={{
                                            marginBottom: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>

                                            <View style={{flexDirection: 'column', flex: 1}}>
                                                <ListItem
                                                    title={'Date: ' + singleAppointment.appointmentDate}
                                                    leftIcon={<Icon
                                                        name="calendar-alt"
                                                        size={26}
                                                        color="black"
                                                    />}
                                                    bottomDivider
                                                />
                                                <ListItem
                                                    title={'Time: ' + singleAppointment.time}
                                                    leftIcon={<Icon
                                                        name="clock"
                                                        size={26}
                                                        color="black"
                                                    />}
                                                    bottomDivider
                                                />
                                                <ListItem
                                                    title={'Status: ' + singleAppointment.status}
                                                    leftIcon={<Icon
                                                        name={this.getAppointmentIcon(singleAppointment.status).icon}
                                                        size={26}
                                                        color={this.getAppointmentIcon(singleAppointment.status).color}
                                                    />}
                                                    bottomDivider
                                                />


                                                <View style={{flexDirection: 'row'}}>
                                                    <Text>Requested
                                                        at: {new Date(singleAppointment.requestDate).toDateString()}</Text>
                                                </View>
                                            </View>

                                        </View>


                                    </View>


                                </Card>
                            </View>
                        );
                    }) : <Empty text={Translation.t('appointmentsText')}/>}
                </ScrollView>


            </View>
        );
    }
}
