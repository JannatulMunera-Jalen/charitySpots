// Import necessary components and modules
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppColors from '../config/AppColors';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AuthUser from '../config/AuthUser';

// Define the validation schema for form inputs
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required().label('*Full Name'),
  email: Yup.string().required().email().label('*Email'),
  password: Yup.string().required().min(6).max(10).label('*Password'),
});

// Define the RegisterScreen component
const RegisterScreen = ({ startApp }) => {
  const initialValues = {
    fullname: '',
    email: '',
    password: '',
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.welcomeContainer}>
        <MaterialCommunityIcons
          name="charity"
          size={80}
          color={AppColors.color1}
        />
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const registerSuccess = await AuthUser.register(values);

          startApp();

          if (registerSuccess) {
            resetForm({});
          } else {
            console.error('Registration Failed');
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.textInputContainer}>
              <AppTextInput
                autoCorrect={false}
                icon="account"
                placeholder="Full Name"
                onBlur={handleBlur('fullname')}
                onChangeText={handleChange('fullname')}
                value={values.fullname}
              />
              {errors.fullname && touched.fullname && <AppText style={{ color: 'red', fontSize: 15, marginStart: 10 }}>{errors.fullname}</AppText>}
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                placeholder="Email Address"
                keyboardType="email-address"
                textContentType="emailAddress"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {errors.email && touched.email && <AppText style={{ color: 'red', fontSize: 15, marginStart: 10 }}>{errors.email}</AppText>}
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              {errors.password && touched.password && <AppText style={{ color: 'red', fontSize: 15, marginStart: 10 }}>{errors.password}</AppText>}
            </View>
            <AppButton
              title="Sign Up"
              color="color2"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </AppScreen>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primaryColor,
    padding: 25,
  },
  welcomeContainer: {
    backgroundColor: AppColors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  textInputContainer: {
    marginVertical: 100,
  },
});

export default RegisterScreen;
