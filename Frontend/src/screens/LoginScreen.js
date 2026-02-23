import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    Alert,
    ScrollView,
    useWindowDimensions,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiPost } from '../config/apiRequest';

const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
        window.alert(`${title}: ${message}`);
    } else {
        Alert.alert(title, message);
    }
};

const MIN_TOUCH_TARGET = 44;

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { width, height } = useWindowDimensions();
    const isSmallScreen = height < 600 || width < 360;

    const handleLogin = async () => {
        if (!email || !password) {
            showAlert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const { response, data } = await apiPost('/api/auth/login', { email, password });

            if (response.ok) {
                await AsyncStorage.setItem('userToken', data.token);
                if (data.user && data.user.name) {
                    await AsyncStorage.setItem('userName', data.user.name);
                }
                showAlert('Success', data.message);
                navigation.replace('AfterLogin');
            } else if (response.status === 404) {
                navigation.navigate('SignUp', { showSignUpAlert: true });
            } else {
                showAlert('Login Failed', data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            showAlert('Connection Error', error.message || 'Check that your phone and PC are on the same Wi-Fi and the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={[styles.scrollContainer, isSmallScreen && styles.scrollContainerSmall]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                >
                    <View style={[styles.headerContainer, isSmallScreen && styles.headerContainerSmall]}>
                        <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Welcome Back</Text>
                        <Text style={[styles.subtitle, isSmallScreen && styles.subtitleSmall]}>Sign in to continue your vaccination journey</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#94a3b8"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <TouchableOpacity style={[styles.forgotPassword, { minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }]} activeOpacity={0.7}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.loginButton, { minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }]} onPress={handleLogin} activeOpacity={0.8} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Log In</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.footerContainer, isSmallScreen && styles.footerContainerSmall]}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }} activeOpacity={0.7}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
        justifyContent: 'center',
        minHeight: '100%',
    },
    scrollContainerSmall: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerContainer: {
        marginBottom: 40,
    },
    headerContainerSmall: {
        marginBottom: 24,
    },
    titleSmall: {
        fontSize: 26,
    },
    subtitleSmall: {
        fontSize: 14,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        lineHeight: 24,
    },
    formContainer: {
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#0f172a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 24,
    },
    footerContainerSmall: {
        marginTop: 24,
        marginBottom: 20,
    },
    footerText: {
        color: '#64748b',
        fontSize: 15,
    },
    signupText: {
        color: '#3b82f6',
        fontSize: 15,
        fontWeight: '700',
    },
});
