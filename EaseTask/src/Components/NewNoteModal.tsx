import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createNote } from '../Utils/database_utils';
import Headbar from './Headbar';
import DV from './defaultValues';

const NewNoteModal = ({isVisible, onClose}) => {
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date())
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [location, setLocation] = useState('');


    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, showDatePicker remains true
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios'); // For iOS, showTimePicker remains true
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const handleCreateNote = () => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const day = date.getDate();
        const timeNote = time.toLocaleTimeString(); // Extract time as a string
        console.log('Note created:', { name, tag, date, time, location, text });

        // Call the createTask function to insert the Note into the database
        createNote(name, tag, year, month, day, time, location, text);

        // Reset input fields and close modal
        setName('');
        setTag('');
        setDate(new Date());
        setTime(new Date());
        setText('');
        setLocation('');
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Headbar showIcons={false} headBarText={"New Note"} subHeadBarText={"Create a new Note"} onSearchPress={null} onFiltersPress={null} onSettingsPress={null} />
            <View style={styles.container}>
                <Text style={DV.styles.normalText}>Note Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Note Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={DV.styles.normalText}>Tag</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tag"
                    value={tag}
                    onChangeText={setTag}
                />
                <View style={styles.dateTimeContainer}>
                    <Text style={DV.styles.normalText}>Date</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.buttonTime]}>
                        <Text style={styles.buttonText}>{"PICK DATE"}</Text>
                    </TouchableOpacity>
                    {showDatePicker ? (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    ) : null}
                    <Text style={DV.styles.normalText}>Time</Text>               
                    <TouchableOpacity onPress={() => setShowTimePicker(true)} style={[styles.buttonTime]}>
                        <Text style={styles.buttonText}>{"PICK TIME"}</Text>
                    </TouchableOpacity>
                    {showTimePicker ? (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                        />
                    ) : null}
                </View>

                <Text style={DV.styles.normalText}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                />

                <Text style={DV.styles.normalText}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Note Description"
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={handleCreateNote} style={[styles.buttonAction]}>
                        <Text style={styles.buttonText}>{"CREATE Note"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={[styles.buttonAction]}>
                        <Text style={styles.buttonText}>{"GO BACK TO MAIN MENU"}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    dateTimeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonTime: {
        width: 100,
        height: 30,
        marginBottom: 20,
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#bcbcbc',
        justifyContent: 'center'
    },
    buttonAction: {
        width: 200,
        height: 50,
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#bcbcbc',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
});

export default NewNoteModal;