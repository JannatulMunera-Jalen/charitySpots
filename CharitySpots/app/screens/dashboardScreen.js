import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Alert, Modal, TouchableHighlight } from 'react-native';

import AppColors from '../config/AppColors';
import charities from '../assets/charities.json';
import GroupDataManager from '../config/GroupDataManager';

const pagecolor = AppColors.color7;

export default function dashboardScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [previousTitle, setPreviousTitle] = useState('');
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [id, setID] = useState("");
  const titleInputRef = useRef(null);

  const charityMap = charities.reduce((acc, charity) => {
    acc.set(charity.charity_identifier, charity.charity_title);
    return acc;
  }, new Map());

  const [modalItems, setModalItems] = useState([...charityMap.keys()]); 

  useEffect(() => {
    if (route.params && route.params.group) {
      const { group } = route.params;
      setTitle(group.title);
      setPreviousTitle(group.title);
      setID(group.id);
      setItems(group.items);
    }
    setIsNew(route.params?.isNew);
    if (route.params?.isNew) {
      titleInputRef.current?.focus();
    }
  }, [route.params]);

  useEffect(() => {
    save();
  }, [title, items, save]);

  const handleDeleteConfirm = async () => {
    // Perform delete action here
    try {
      await GroupDataManager.removeGroup(id);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
  };

  const save = async () => {
    console.log(`Group Saved! Title: ${title}`);

    if (typeof title === 'string') {
      await GroupDataManager.updateGroup({
        title: title,
        items: items,
        id: id,
      });
    }
  };

  useEffect(() => {
    if (showConfirmation) {
      Alert.alert(
        'Delete Group',
        'This will delete the group permanently. Proceed?',
        [
          { text: 'Cancel', onPress: handleDeleteCancel },
          { text: 'Delete', onPress: handleDeleteConfirm, style: 'destructive' },
        ]
      );
    }
  }, [showConfirmation]);

  const toggleItem = (item) => {
    if (!items.includes(item)) {
      setItems([...items, item]);
    } else {
      setItems(items.filter(i => i !== item));
    }
  };

  
  const renderCards = () => {
    return items.map((item, index) => (
      <TouchableHighlight
        key={index}
        style={styles.card}
        onPress={() => 
          navigation.push('More Info', {
            charity: charities.find(charity => charity.charity_identifier === item),
          })
        }
        underlayColor={AppColors.color6}
      >
        <Text style={styles.cardText}>{charityMap.get(item)}</Text>
      </TouchableHighlight>
    ));
  };
  

  const renderModalItems = () => {
    return modalItems.map((item, index) => (
      <TouchableHighlight 
        key={index}
        style={items.includes(item) ? styles.highlightedItem : styles.modalItem} 
        underlayColor={pagecolor}
        onPress={() => {
          toggleItem(item);
          save();
        }}
      >
        <Text style={styles.modalItemText}>{charityMap.get(item)}</Text> 
      </TouchableHighlight>
    ));
  };

  return (
    <View style={styles.container}>
      {showConfirmation && <View style={styles.confirmationOverlay} />}
      <TextInput
        ref={titleInputRef}
        value={title}
        onChangeText={(text) => {
          setPreviousTitle(title);
          setTitle(text);
        }}
        style={styles.titleInput}
        placeholder="Group Title"
      />
      <ScrollView style={styles.cardContainer}>{renderCards()}</ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit Charities"
          color={AppColors.color1}
          onPress={() => setModalVisible(true)}
        />
        <Button
          title="Delete Group"
          color={AppColors.red}
          onPress={() => setShowConfirmation(true)}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Items</Text>
            <ScrollView>{renderModalItems()}</ScrollView>
            <Button
              title="Close"
              color={pagecolor}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppColors.primaryColor,
  },
  titleInput: {
    backgroundColor: AppColors.color6,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    color: AppColors.color1,
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: pagecolor,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
  },
  modalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
  },
  highlightedItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: pagecolor,
    borderRadius: 5,
  },
  modalItemText: {
    fontSize: 18,
  },
  confirmationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.color6,
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
});
