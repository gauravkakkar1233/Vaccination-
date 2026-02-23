import React, { useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { landingStyles } from '../styles/landingStyles';

export default function BeforeLoginScreen({ navigation }) {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) navigation.replace('AfterLogin');
        };
        checkAuth();
    }, [navigation]);
    return (
        <SafeAreaView style={landingStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fbff" />
            <ScrollView style={landingStyles.container} showsVerticalScrollIndicator={false}>
                {/* HERO SECTION */}
                <View style={landingStyles.heroSection}>
                    <Text style={landingStyles.heroTitle}>
                        Track Your Baby's Vaccination Journey{'\n'}with <Text style={landingStyles.highlight}>Confidence</Text>
                    </Text>
                    <Text style={landingStyles.heroSubtitle}>
                        Never miss a vaccine. Get reminders, government schedule updates, and expert guidance — all in one place.
                    </Text>
                    <Image
                        source={require('../../assets/images/hero.png')}
                        style={landingStyles.heroImage}
                        resizeMode="contain"
                    />
                </View>

                {/* FEATURES SECTION */}
                <View style={landingStyles.section}>
                    <Text style={landingStyles.sectionTitle}>Why Mothers Trust Us</Text>
                    <View style={landingStyles.card}>
                        <Text style={landingStyles.cardTitle}>Vaccine Reminders</Text>
                        <Text style={landingStyles.cardText}>Timely alerts for upcoming vaccines.</Text>
                    </View>
                    <View style={landingStyles.card}>
                        <Text style={landingStyles.cardTitle}>Govt. Approved Schedule</Text>
                        <Text style={landingStyles.cardText}>Based on Indian Pediatric Guidelines.</Text>
                    </View>
                    <View style={landingStyles.card}>
                        <Text style={landingStyles.cardTitle}>Growth Tracking</Text>
                        <Text style={landingStyles.cardText}>Track your baby's development.</Text>
                    </View>
                    <View style={landingStyles.card}>
                        <Text style={landingStyles.cardTitle}>Secure & Private</Text>
                        <Text style={landingStyles.cardText}>Your data is safe with us.</Text>
                    </View>
                </View>

                {/* CTA SECTION - Login and Sign Up Buttons */}
                <View style={[landingStyles.section, landingStyles.authButtonsContainer]}>
                    <Text style={landingStyles.sectionTitle}>Start Protecting Your Baby Today</Text>
                    <TouchableOpacity
                        style={landingStyles.signupButton}
                        onPress={() => navigation.navigate('SignUp')}
                        activeOpacity={0.8}
                    >
                        <Text style={landingStyles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={landingStyles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                        activeOpacity={0.8}
                    >
                        <Text style={landingStyles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
                </View>

                {/* FOOTER */}
                <View style={landingStyles.footer}>
                    <Text style={landingStyles.footerText}>Data Secured | Pediatric Expert Approved | Terms</Text>
                    <Text style={landingStyles.footerTextSmall}>© 2026 Healthy Mom and Healthy Baby</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
