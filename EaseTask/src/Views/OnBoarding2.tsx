import React, { useState } from "react";
import { StyleSheet , Text, View, TouchableOpacity, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import DV from "../Components/defaultValues";
import ModalPolicy from '../Components/ModalPolicy';
import Navigator from '..';

const OnBoarding2 = () => {
    const style = DV.styles;

    const header = "Welcome";
    const caption = "Your information\nis yours";
    const text = "All your information is encrypted"
    const buText = "Sign in with Google"
    const checkText = "I accept the terms and privacy policy"
    const [modalVisible, setModalVisible] = useState(false);

    const handleButton = () => {
        console.log('Press!');
        <Navigator />
    }

    const [isChecked,setIsChecked] = useState(false);

    const handleCheckbox = () => {
        console.log(`checkbox pressed`);
        setIsChecked(!isChecked);
      };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleTextClick = () => {
        console.log(`Text pressed`);
        setModalVisible(true);
    };

    return (
        <View style={StyleSheet.compose(style.onBoardingBackGround, styles.background)}>
            <Text style={StyleSheet.compose(style.onBoardingHeader, style.headerCaptionText)}>{header}</Text>
            <Image
            source={require('../Assets/OnBoarding2.png')}
            style={styles.image}
            resizeMode="contain" // Optional: Adjust the resizeMode as needed
              />
            <Text style={StyleSheet.compose(style.normalText, style.onBoardingCaption)}>{caption}</Text>
            <Text style={StyleSheet.compose(style.smallText, style.onBoardingText)}>{text}</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleCheckbox()} style={[styles.checkbox]}>
                    {/* Display a checked or unchecked icon based on the isChecked prop */}
                    {isChecked ? (
                    <AntDesign name="checkcircle" size={DV.normalIconSize} color="green" />
                    ) : (
                    <AntDesign name="checkcircleo" size={DV.normalIconSize} color="grey" />
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTextClick}>
                    <Text style={styles.checkboxText}>{checkText}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={() => handleButton()} 
                style={[styles.button]} 
                disabled={!isChecked}
            >
                <Text style={styles.buttonText}>{buText}</Text>
            </TouchableOpacity>
            <ModalPolicy 
            isVisible={modalVisible}
            onClose={handleCloseModal}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: '#5352ED88',
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox:{
        flexDirection: 'row', // Change to row to display items horizontally
        alignItems: 'center', // Center items vertically
        marginBottom: 10, // Adjust spacing if needed
    },
    checkboxText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
        paddingVertical: 20,
        marginLeft: 10, // Add left margin for spacing between icon and text
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    button:{
        width: 230,
        height: 48,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 200,
    },
    image:{
        width: 300, 
        height: 300, 
    }
})

export default OnBoarding2
