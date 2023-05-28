import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, TextInput, StyleSheet, Linking, Alert } from 'react-native';

import AppColors from '../config/AppColors';
import AppText from '../components/AppText';
import charities from '../assets/charities.json';

const moreInfoScreen = ({navigation, route }) => {
  // State for controlling the donation modal visibility and donation amount
  const [donateModalVisible, setDonateModalVisible] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

  // Function to open the donation modal
  const openDonateModal = () => {
    setDonateModalVisible(true);
  };

  // Function to close the donation modal and display an alert
  const closeDonateModal = () => {
    setDonateModalVisible(false);
    // Displaying an alert box after closing the modal
    Alert.alert('Donation Received', 'Thank you for your kind donation!');
  };

  // Function to handle changes in the donation amount input
  const handleDonationAmountChange = (amount) => {
    setDonationAmount(amount);
  };

  // Find the selected charity from the list
  const charity = charities.find(item => item.charity_identifier === route.params.charity.charity_identifier);

  // Function to open the phone number link using Linking API
  const openPhoneNumberLink = () => {
    Linking.openURL(`tel:${charity.charity_phone}`);
  };

  // Function to open the website link using Linking API
  const openWebsiteLink = () => {
    Linking.openURL(charity.charity_website);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          {/* Charity logo */}
          <Image
            style={styles.logo}
            source={{ uri: charity.charity_logo }}
            resizeMode="contain"
          />
          {/* Charity name */}
          <AppText style={styles.charityName}>{route.params.charity.charity_title}</AppText>
          {/* Phone number */}
          <TouchableOpacity onPress={openPhoneNumberLink}>
            <AppText style={styles.charityInfo}>{route.params.charity.charity_phone}</AppText>
          </TouchableOpacity>
          {/* Website link */}
          <TouchableOpacity onPress={openWebsiteLink}>
            <AppText style={styles.charityInfo}>{route.params.charity.charity_website}</AppText>
          </TouchableOpacity>
          {/* Charity description */}
          <AppText style={styles.description}>
            {route.params.charity.charity_description}
          </AppText>
        </View>
      </ScrollView>
      {/* Donate button */}
      <TouchableOpacity style={styles.donateButton} onPress={openDonateModal}>
        <AppText style={styles.donateButtonText}>Donate</AppText>
      </TouchableOpacity>
      {/* Donation modal */}
      <Modal visible={donateModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AppText style={styles.modalTitle}>Enter Donation Amount</AppText>
            {/* Donation amount input */}
            <TextInput
              style={styles.donationInput}
              placeholder="Amount"
              keyboardType="numeric"
              value={donationAmount}
              onChangeText={handleDonationAmountChange}
            />
            {/* Donate button in the modal */}
            <TouchableOpacity style={styles.donateButton} onPress={closeDonateModal}>
              <AppText style={styles.donateButtonText}>Donate</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for the main container
  container: {
    backgroundColor: AppColors.primaryColor,
    flex: 1,
  },
  // Styles for the content container inside the ScrollView
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  // Styles for the content container
  contentContainer: {
    alignItems: 'center',
  },
  // Styles for the charity logo
  logo: {
    width: 200,
    height: 200,
  },
  // Styles for the charity name
  charityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  // Styles for the charity info (phone number and website)
  charityInfo: {
    fontSize: 16,
    marginTop: 10,
    color: AppColors.color1,
    textDecorationLine: 'underline',
  },
  // Styles for the charity description
  description: {
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  // Styles for the donate button
  donateButton: {
    backgroundColor: AppColors.color1,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  // Styles for the donate button text
  donateButtonText: {
    color: AppColors.color6,
    fontSize: 25,
    fontWeight: 'bold',
  },
  // Styles for the donation modal container
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // Styles for the donation modal content
  modalContent: {
    backgroundColor: AppColors.color6,
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 8,
  },
  // Styles for the donation modal title
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Styles for the donation amount input
  donationInput: {
    borderWidth: 1,
    borderColor: AppColors.color2,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
});

export default moreInfoScreen;
