import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BeforeLoginScreen from '../screens/BeforeLoginScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AfterLoginScreen from '../screens/AfterLoginScreen';
import RegisterChildScreen from '../screens/RegisterChildScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="BeforeLogin"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            >
                <Stack.Screen name="BeforeLogin" component={BeforeLoginScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="AfterLogin" component={AfterLoginScreen} />
                <Stack.Screen name="RegisterChild" component={RegisterChildScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
