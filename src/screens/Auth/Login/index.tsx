import React, {FC} from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from '../../../hooks/store';
import {Formik} from 'formik';
import styles from '../styles';
import * as Yup from 'yup';
import {AuthProps} from '../../../navigation/types';
import {logIn} from '../../../app/slices/auth/authSlice';

interface FormValues {
  email: string;
  password: string;
}
const validationSchema = Yup.object().shape({
  email: Yup.string().email('*Invalid email').required('*Email is required'),
  password: Yup.string()
    .min(4, '*Too Short!')
    .max(15, '*Too Long!')
    .required('*Password is required'),
});

const Login: FC<AuthProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {email: '', password: ''};
  const handleLogin = (text: string) => {
    dispatch(logIn(text));
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
          onSubmit={values => handleLogin(values.email)}>
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
              <TouchableOpacity
                style={styles.submitContainer}
                onPress={handleSubmit}>
                <Text style={styles.submitButton}>SIGN IN</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <View style={styles.navContainer}>
          <Text style={styles.navText}>Don't have an account yet?</Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.navLink}>SIGN UP HERE</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
