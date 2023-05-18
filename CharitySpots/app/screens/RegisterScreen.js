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

const schema = Yup.object().shape(
    {
        fullname: Yup.string().required().label("*Full Name"),
        email: Yup.string().required().email().label("*Email"),
        password: Yup.string().required().min(6).max(10).label("*Password"),
    }
);

function RegisterScreen(props) {
    return (
        <AppScreen style={styles.container}>
            <View style={styles.welcomeContainer}>
                    <MaterialCommunityIcons
                        name="charity"
                        size={80}
                        color={AppColors.color1}/>
                </View>
                <Formik
                    initialValues={{fullname:'', email:'', password:'',}}
                    onSubmit = {values=> console.log(values)}
                    validationSchema={schema}
                >
                    {({handleChange, handleSubmit, errors, setFieldTouched, touched})=>(
                        <>
                    <View style={styles.textInputContainer}>
                    <AppTextInput
                    autoCorrect={false}
                    icon="account"
                    placeholder="Full Name"
                    onBlur = {() => setFieldTouched ("fullname")}
                    onChangeText = {handleChange("fullname")}
                    />
                    {touched.fullname && <AppText style={{color:'red', fontSize: 15, marginStart: 10}}>{errors.fullname}</AppText>}
                    <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    placeholder="Email Address"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onBlur = {() => setFieldTouched ("email")}
                    onChangeText = {handleChange("email")}
                    />
                    {touched.email && <AppText style={{color:'red', fontSize: 15, marginStart: 10}}>{errors.email}</AppText>}
                    <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                    onBlur = {() => setFieldTouched ("password")}
                    onChangeText ={handleChange("password")}
                    />
                    {touched.password && <AppText style={{color:'red', fontSize: 15, marginStart: 10}}>{errors.password}</AppText>}
                    </View>
                    <AppButton 
                    title="Sign Up" 
                    color='color2'
                    onPress={handleSubmit}
                    />  
                    <AppButton 
                    title="Login" 
                    color='color2'
                    style={{backgroundColor: 'transparent', marginTop: 10}}
                    onPress={handleSubmit}
                    />    
                        </>
                    )}
                </Formik>    
        </AppScreen>
            
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: AppColors.primaryColor,
        padding: 25,
    },
    welcomeContainer:{
        backgroundColor: AppColors.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    textInputContainer:{
        marginVertical: 100,     
    }
})

export default RegisterScreen;