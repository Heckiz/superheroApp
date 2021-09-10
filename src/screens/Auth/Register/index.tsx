import React, {FC} from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import * as Yup from 'yup';
import {AuthProps} from '../../../navigation/types';

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}
const validationSchema = Yup.object().shape({
  email: Yup.string().email('*Invalid email').required('*Email is required'),
  password: Yup.string()
    .min(4, '*Too Short!')
    .max(15, '*Too Long!')
    .required('*Password is required'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    '*Passwords must match',
  ),
});

const Register: FC<AuthProps> = ({navigation}) => {
  const initialValues: FormValues = {
    email: '',
    password: '',
    passwordConfirm: '',
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgoundImage}
        source={{
          uri: 'https://wallpapers-hub.art/wallpaper-images/152827.jpg',
        }}
      />
      <View style={styles.formContent}>
        <Text style={styles.title}>Superhero App</Text>

        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={() => navigation.navigate('Login')}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.textError}>{errors.password}</Text>
              )}
              <TextInput
                placeholder="Confirm password"
                style={styles.input}
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                value={values.passwordConfirm}
                secureTextEntry={true}
              />
              {touched.passwordConfirm && errors.passwordConfirm && (
                <Text style={styles.textError}>{errors.passwordConfirm}</Text>
              )}
              <TouchableOpacity
                style={styles.submitContainer}
                onPress={handleSubmit}>
                <Text style={styles.submitButton}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <View style={styles.navContainer}>
          <Text style={styles.navText}>Do you already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navLink}>SIGN IN</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Register;
