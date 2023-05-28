import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AppListItems from '../components/AppListItems';
import AppScreen from '../components/AppScreen';
import AppColors from '../config/AppColors';
import AppIcon from '../components/AppIcon';
import AuthUser from '../config/AuthUser';
import { TextInput } from 'react-native-gesture-handler';
import AppText from '../components/AppText';

const HomeScreen = ({handleLogout}) => {
    // State to store the past user
    const [pastUser, setPastUser] = useState(null);

    useEffect(() => {
         // Fetch the past user when the component mounts
        async function fetchPastUser(){
            try{
                const user = await AuthUser.getPastUser();
                if(user) {
                    // Set the fetched user in the state
                    setPastUser(user);
                }
                else{
                    console.error('User is null or undefined');
                }
            } catch (error){
                console.error('Error fetching past user:',error);
            }
        }
        fetchPastUser();
    }, []);
  // Function to get the initials from the full name
    const getInitials = (fullName) => {
        const names= fullName.split(' ');
        return names
            .map((name) => name.charAt(0))
            .join('')
            .toUpperCase();
    };

    return (
        <AppScreen style={styles.container}>
                <View style={styles.welcomeContainer}>
                     {/* Welcome section */}
                    <MaterialCommunityIcons
                        name="charity"
                        size={80}
                        color={AppColors.color1}
                    />
                </View>
                {/* Profile section */}
                {pastUser && (
                    <View style={styles.profileContainer}>
                        <View style={styles.profileImage}>
                            <AppText>{getInitials(pastUser.fullname)}</AppText>
                        </View>
                        <AppText style={styles.nameText}>{pastUser.fullname}</AppText>
                        <AppText style={styles.emailText}>{pastUser.email}</AppText>
                    </View>
                )}
                <View style={styles.linksContainer}>
                    <AppListItems title="Log Out" IconComponent={<AppIcon name= "logout-variant" size={50} iconColor={AppColors.primaryColor} backgroundColor={AppColors.color1}/>} onPress={handleLogout}/>               
                </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container:{       
        backgroundColor: AppColors.primaryColor,
    },
    button:{
        flexDirection: "row",
        padding: 10,
    },
    textContainer:{
        flexDirection: "column",
        marginLeft: 20,
    },
    welcomeContainer:{
        backgroundColor: AppColors.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    profileContainer:{
        marginTop:50,
        height: 100,
        backgroundColor: "AppColors.color6",
        justifyContent: "center",
    },
    linksContainer:{
        marginVertical: 110, // Adjust the spacing as needed
        backgroundColor: "AppColors.color6",
        height: 210,
        justifyContent: "space-around",
        paddingLeft: 10,
    },
    profileImage:{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: AppColors.color6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        marginLeft: 140,
    },
    nameText:{
        fontSize:30,
        fontWeight:'bold',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 120,
    },
    emailText:{
        fontSize:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 120,
    }

    
})

export default HomeScreen;