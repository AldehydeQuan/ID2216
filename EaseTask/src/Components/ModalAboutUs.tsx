import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const ModalAboutUs = ({ isVisible, onClose }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.policyText}>test for about us</Text>
            <TouchableOpacity style={styles.optionButton} onPress={onClose}>
            <Icon name="close-outline" size={20} color="#000" />
                <Text style={styles.optionText}>Close</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  policyText: {
    marginTop: 200,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default ModalAboutUs;