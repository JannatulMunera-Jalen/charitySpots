// Required React Native imports
import React from 'react';
import { Text, TouchableOpacity, StyleSheet , View} from 'react-native';

// Custom file imports
import AppColors from '../config/AppColors';

// AppButton component
function AppButton({title, color="primaryColor", onPress, style}) {
    // Render a TouchableOpacity that triggers the onPress function when pressed
    return (
        <TouchableOpacity onPress={onPress}>
            {/* View container for the button */}
            <View style={[styles.button, style, {backgroundColor: AppColors[color]}]}>
                {/* Text inside the button */}
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

// Styles for the AppButton component
const styles = StyleSheet.create({
    button: {
        backgroundColor: AppColors.primaryColor,
        borderRadius: 20,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: AppColors.white,
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})

export default AppButton;
