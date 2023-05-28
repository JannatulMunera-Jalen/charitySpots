import React, { useState } from 'react';
import AppButton from '../components/AppButton';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppPicker from '../components/AppPicker';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppColors from '../config/AppColors';
import AppIcon from '../components/AppIcon';

// Define an array of categories
const categories = [
    {label: "Emergency", value: 1, icon:"car-brake-alert",backgroundColor:"orange"},
    {label: "Blood Donations", value: 2, icon:"blood-bag", backgroundColor:"red"},
    {label: "Education", value: 3, icon:"school", backgroundColor:"blue"},
    {label: "Health", value: 4, icon:"bottle-tonic-plus", backgroundColor:"green"},
];

// Define the NewCategoryScreen component
function NewCategoryScreen({navigation}) {
    // useState state
    const[title, setTitle] = useState(""); // State variable for category title
    const[subTitle, setSubTitle] = useState(""); // State variable for category subtitle
    const[category,setCategory] = useState(""); // State variable for selected category
    const[image,setImage] = useState(null); // State variable for selected image

    // Errors state
    const[titleError, setTitleError] = useState(""); // State variable for category title error
    const[subTitleError, setSubTitleError] = useState(""); // State variable for category subtitle error
    const[categoryError, setCategoryError] = useState(""); // State variable for category selection error
    const[imageError, setImageError] = useState(""); // State variable for image selection error

    // Function to open the image picker
    let openImagePickerAsync = async () => {
        // Request permission to access the camera roll
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false){
            // Display an alert if permission is not granted
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if(pickerResult.canceled === true){
            // Return if the image picker was canceled
            return;
        }
        
        // Set the selected image
        setImage({path: pickerResult.uri});
        console.log(pickerResult);
    }

    // Function to perform error checks on form inputs
    const doErrorCheck = () => {
        setTitleError(title.length>0 ? "" : "*Please enter a valid category name"); // Check for title error
        setSubTitleError(subTitle.length>0 ? "" : "*Field cannot be empty"); // Check for subtitle error
        setCategoryError(category ? "" : "*A category must be picked"); // Check for category selection error
        setImageError(image ? "" : "*Please pick an image"); // Check for image selection error
        
        // Return a boolean value indicating if all inputs are valid
        return (title.length > 0) && (subTitle.length > 0) && (category) && (image) ? true : false;
    }

    // Function to add the new category
    const addCharity = () => {
        let commonData = GroupDataManager.getInstance();
        let user = commonData.getUserID();

        const charities = commonData.getCharities(user);
        const charityID = charities.length+1;
        const newCharity = {
            title: title,
            subtitle: subTitle,
            category: category.label,
            charityid: charityID,
            userid: user,
            image: image.path,
        };

        console.log(newCharity);
        commonData.addCharity(newCharity);
    }

    // Render the NewCategoryScreen component
    return (
        <AppScreen style={{ backgroundColor: AppColors.primaryColor }}>
            {/* Title input */}
            <AppTextInput
                icon="shape-plus"
                placeholder="Category Name"
                value={title}
                onChangeText={(inputText) => setTitle(inputText)}
            />
            {titleError.length > 0 ? <AppText style={{margin: 5, color: "red", fontSize: 16}}>{titleError}</AppText> : <></>}

            {/* Subtitle input */}
            <AppTextInput
                icon="account-group"
                placeholder="Notes"
                value={subTitle}
                onChangeText={(inputText) => setSubTitle(inputText)}
            />
            {subTitleError.length > 0 ? <AppText style={{margin: 5, color: "red", fontSize: 16}}>{subTitleError}</AppText> : <></>}

            {/* Category picker */}
            <AppPicker
                selectedItem={category}
                onSelectItem={item => setCategory(item)}
                data={categories}
                icon="apps"
                placeholder="Categories"
            />
            {categoryError.length > 0 ? <AppText style={{margin: 5, color: "red", fontSize: 16}}>{categoryError}</AppText> : <></>}

            {/* Image picker */}
            <TouchableOpacity style={styles.cameraButton} onPress={openImagePickerAsync}>
                <AppIcon name="camera" size={80} iconColor={AppColors.color1} backgroundColor={AppColors.primaryColor}/> 
                {image && <Image source={{uri: image.path}} style={{height: 80, width: 80, marginLeft: 20}}/>}
            </TouchableOpacity>

            {imageError.length > 0 ? <AppText style={{margin: 5, color: "red", fontSize: 16}}>{imageError}</AppText> : <></>}

            {/* Add Category button */}
            <AppButton
                title="Add Category"
                color="color1"
                style={styles.addButton}
                onPress={() => {
                    if(doErrorCheck()) {
                        // Uncomment the following line to add the category
                        // addCharity();
                    }
                }}
            />
        </AppScreen>
    );
}

// Styles
const styles = StyleSheet.create({
    cameraButton: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        flexDirection: "row",
    },
    addButton: {
        marginVertical: 20,
    },
})

export default NewCategoryScreen;
