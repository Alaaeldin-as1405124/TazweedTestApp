import React from 'react';
import Modal from 'react-native-modal';
import Loading from './Loading';

export default class LoadingPrompt extends React.Component {
    render() {
        return (
            <Modal isVisible={this.props.show} hasBackdrop={false} coverScreen={false} style={{justifyContent: 'center',backgroundColor:'white'}}>
               <Loading/>
            </Modal>
        );
    }
}
