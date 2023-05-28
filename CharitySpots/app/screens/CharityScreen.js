import React, {useState} from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, RefreshControl} from 'react-native';

import AppScreen from '../components/AppScreen';
import AppColors from '../config/AppColors';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppIcon from "../components/AppIcon"; 

function CharityScreen(props) {
    // Define the initial state for the data
    const [data, setData] = useState([
        // Hardcoded array of initial data objects
        {
            id: '1',
            title:"Blood Donation",
            subtitle:"Australian Red Cross Lifeblood collects around 1.5 million blood donations each year. Most of this is used to help people with medical conditions that require blood or blood products regularly. For example, 34% of donated red blood cells are used to help treat people with cancer and blood diseases.",
            image:require("../assets/bloodDonation.jpg"),
            category:"Blood Donation",        
        },
        {
            id: '2',
            title:"Türkiye-Syria Earthquakes Appeal",
            subtitle:"Donations to the Türkiye-Syria Earthquakes Appeal will help provide immediate and longer-term relief to communities affected by the earthquake. That support may include: emergency relief assistance such as search and rescue and first aid services, health, shelter and non-food items.",
            image:require("../assets/disasterFund.jpg"),
            category:"Emergency",
             
        },
        {
            id: '3',
            title:"Help a Kid Get Back To School!",
            subtitle:"This fund is designed for donors who believe in the transformative power of education and who want to improve educational opportunities for all children and adolescents. Charities in this fund work to increase access to education and promote literacy, numeracy and other life skills that create self sufficiency and improve overall wellbeing. ",
            image:require("../assets/disasterFund.jpg"),
            category:"Education",
             
        },
        {
            id: '4',
            title:"Support Breast Cancer Research",
            subtitle:"This study explored the fraction of cancer cases attributable to modifiable risk factors in the UK, finding that nearly four in ten (37.7%) cancer cases in 2015 in the UK were attributable to known risk factors. Researchers identified not breastfeeding as one such risk factor; amongst women, not breastfeeding was attributed to 2,582 cancer cases in 2015.",
            image:require("../assets/healthFund.jpg"),
            category:"Health",
             
        },
        // Additional data objects
    // ...
    ]);
    // Handler for deleting an item from the data array
    const handleDelete = (itemId) => {
        setData(prevData => prevData.filter(item => item.id !== itemId));
      };
// Handler for editing an item in the data array
      const handleEdit = (itemId, newTitle, newSubtitle) => {
        setData(prevData =>
          prevData.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                title: newTitle,
                subtitle: newSubtitle,
              };
            }
            return item;
          })
        );
      };
      
      // State and handler for the refresh functionality
      const [refreshing, setRefreshing] = useState(false);

      const onRefresh = () => {
        setRefreshing(true);
        // Simulate a delay for the refreshing indicator
        setTimeout(() => {
          // Set the data back to the initial hardcoded values
          setData([
            {
              id: '1',
              title: "Blood Donation",
              subtitle: "Australian Red Cross Lifeblood collects around 1.5 million blood donations each year. Most of this is used to help people with medical conditions that require blood or blood products regularly. For example, 34% of donated red blood cells are used to help treat people with cancer and blood diseases.",
              image: require("../assets/bloodDonation.jpg"),
              category: "Blood Donation",
            },
            {
              id: '2',
              title: "Türkiye-Syria Earthquakes Appeal",
              subtitle: "Donations to the Türkiye-Syria Earthquakes Appeal will help provide immediate and longer-term relief to communities affected by the earthquake. That support may include: emergency relief assistance such as search and rescue and first aid services, health, shelter and non-food items.",
              image: require("../assets/disasterFund.jpg"),
              category: "Emergency",
            },
            {
              id: '3',
              title: "Help a Kid Get Back To School!",
              subtitle: "This fund is designed for donors who believe in the transformative power of education and who want to improve educational opportunities for all children and adolescents. Charities in this fund work to increase access to education and promote literacy, numeracy and other life skills that create self sufficiency and improve overall wellbeing. ",
              image: require("../assets/disasterFund.jpg"),
              category: "Education",
            },
            {
              id: '4',
              title: "Support Breast Cancer Research",
              subtitle: "This study explored the fraction of cancer cases attributable to modifiable risk factors in the UK, finding that nearly four in ten (37.7%) cancer cases in 2015 in the UK were attributable to known risk factors. Researchers identified not breastfeeding as one such risk factor; amongst women, not breastfeeding was attributed to 2,582 cancer cases in 2015.",
              image: require("../assets/healthFund.jpg"),
              category: "Health",
            },
            // Additional data objects
        // ...
          ]);
          setRefreshing(false);
        }, 1000); // Adjust the delay time as needed
      };

    return (
        <AppScreen style={styles.container}>
      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AppCard
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            category={item.category}
            onSwipeLeft={() => (
              <View style={styles.deleteView}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <AppIcon name="trash-can" size={40} iconColor={AppColors.black} />
                </TouchableOpacity>
              </View> 
            )}
            onPress={() => {
              // Handle the edit functionality here
              const newTitle = 'New Title'; // Replace with the desired new title
              const newSubtitle = 'New Subtitle'; // Replace with the desired new subtitle
              handleEdit(item.id, newTitle, newSubtitle);
            }}       
          />
        )}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      /> 
    </AppScreen>
        );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:AppColors.primaryColor,
        flex:1,
        marginTop:0,
        
    },
    deleteView: {
        backgroundColor: AppColors.red,
        width: 35,
        marginBottom: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    
})

export default CharityScreen;
