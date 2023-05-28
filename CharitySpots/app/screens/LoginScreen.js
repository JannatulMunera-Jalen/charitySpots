import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Formik} from 'formik';
import * as Yup from 'yup';

import AppColors from '../config/AppColors';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AuthUser from '../config/AuthUser';
// Validation schema using Yup
const loginSchema = Yup.object().shape(
    {
        email: Yup.string().required().email().label("*Email"),
        password: Yup.string().required().min(6).max(10).label("*Password"),
    }
);

const LoginScreen = ({ startApp }) => {
    // Login handler function
    const handleLogin = async (values, { setErrors }) => {
        try {
            const loggedIn = await AuthUser.login(values.email, values.password);
            console.log(`Logged in: ${loggedIn}`);
            
            if (loggedIn) {
              startApp();
            } else {
              setErrors({ submit: 'Invalid email or password' });
            }
          } catch (error) {
            console.error(error);
            setErrors({ submit: 'Login failed' });
          }
    };

    return (
        <AppScreen style={styles.container}>
            <View style={styles.welcomeContainer}>
                {/* Welcome section */}
                    <MaterialCommunityIcons
                        name="charity"
                        size={80}
                        color={AppColors.color1}/>
                </View>
                {/* Formik form for handling login */}
                <Formik
                    initialValues={{email:'', password:'',}}
                    onSubmit = {handleLogin}
                    validationSchema={loginSchema}
                >
                    {({values, handleChange, handleSubmit, errors, handleBlur, touched})=>(
                        <>
                    <View style={styles.textInputContainer}>
                        {/* Email input */}
                    <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    placeholder="Email Address"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={values.email}
                    onBlur = {handleBlur('email')}
                    onChangeText = {handleChange("email")}
                    />
                    {errors.email && touched.email && (<AppText style={styles.errorText}>{errors.email}</AppText>)}
                     {/* Password input */}
                    <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                    value={values.password}
                    onBlur = {handleBlur("password")}
                    onChangeText ={handleChange("password")}
                    />
                    {errors.password && touched.password && (<AppText style={styles.errorText}>{errors.password}</AppText>)}
                    </View>
                     {/* Login button */}
                    <AppButton 
                    title="Login" 
                    color='color2'
                    onPress={handleSubmit}
                    />
                    {errors.submit && <AppText style={styles.errorText}>{errors.submit}</AppText>}   
                        </>
                    )}
                </Formik>    
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: AppColors.primaryColor,
        padding: 25,
        marginTop:0,
    },
    welcomeContainer:{
        backgroundColor: AppColors.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    textInputContainer:{
        marginVertical: 50,     
    },
    errorText:{
        color:'red', 
        fontSize: 15, 
        marginStart: 10,
    },

    
})

export default LoginScreen;
