import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        padding: 5,
        borderRadius: 3,
        textAlign:'left'
    },
    topContainer:{
        flex: 1,
    },
    bottomContainer: {
        flex: 3,
        justifyContent: 'center',
        alignContent:'flex-start',
        padding: 10,
    },
    logoStyle:{
        alignSelf: 'center',
        margin:25
    }
});

export default styles;
