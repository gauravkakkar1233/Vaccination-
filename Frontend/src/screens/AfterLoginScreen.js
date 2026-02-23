import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AfterLoginStyles from '../styles/AfterLoginStyles';

export default function AfterLoginScreen({ navigation }) {
    const [userName, setUserName] = useState('');
    const [schedule] = useState([
        { age: 'At Birth', vaccine: 'BCG', status: 'Pending' },
        { age: 'At Birth', vaccine: 'OPV-0', status: 'Pending' },
        { age: '6 Weeks', vaccine: 'DPT-1', status: 'Pending' },
        { age: '6 Weeks', vaccine: 'OPV-1', status: 'Pending' },
        { age: '6 Weeks', vaccine: 'Hepatitis B-2', status: 'Pending' },
        { age: '10 Weeks', vaccine: 'DPT-2', status: 'Pending' },
        { age: '10 Weeks', vaccine: 'OPV-2', status: 'Pending' },
        { age: '14 Weeks', vaccine: 'DPT-3', status: 'Pending' },
        { age: '14 Weeks', vaccine: 'OPV-3', status: 'Pending' },
        { age: '14 Weeks', vaccine: 'Hepatitis B-3', status: 'Pending' },
    ]);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                if (name) setUserName(name);
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };
        fetchUserName();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userName');
            navigation.replace('BeforeLogin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={[AfterLoginStyles.tableRow, index === schedule.length - 1 && AfterLoginStyles.tableRowLast]}>
            <Text style={AfterLoginStyles.tableCell}>{item.age}</Text>
            <Text style={AfterLoginStyles.tableCell}>{item.vaccine}</Text>
            <Text style={[AfterLoginStyles.tableCell, item.status === 'Pending' ? AfterLoginStyles.statusPending : AfterLoginStyles.statusDone]}>
                {item.status}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={AfterLoginStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fbff" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={AfterLoginStyles.header}>
                    <Text style={AfterLoginStyles.welcomeText}>Welcome, {userName || 'Mom'}</Text>
                </View>

                {/* Child Info */}
                <View style={AfterLoginStyles.childCard}>
                    <Text style={AfterLoginStyles.childTitle}>My Child</Text>
                    <Text style={AfterLoginStyles.childInfo}>Name: Aarav</Text>
                    <Text style={AfterLoginStyles.childInfo}>DOB: Jan 15, 2024</Text>
                    <Text style={AfterLoginStyles.childInfo}>Age: 2 Months</Text>
                    <Text style={AfterLoginStyles.childInfo}>Blood Group: B+</Text>
                </View>

                {/* Next Vaccine */}
                <View style={AfterLoginStyles.nextVaccineCard}>
                    <Text style={AfterLoginStyles.nextVaccineTitle}>Next Vaccine</Text>
                    <Text style={AfterLoginStyles.nextVaccineName}>DPT-2</Text>
                    <Text style={AfterLoginStyles.dueText}>Due in: 5 Days</Text>
                    <TouchableOpacity style={AfterLoginStyles.markDoneButton} onPress={() => Alert.alert('Info', 'Feature coming soon!')}>
                        <Text style={AfterLoginStyles.markDoneText}>Mark as Done</Text>
                    </TouchableOpacity>
                </View>

                {/* Progress */}
                <View style={AfterLoginStyles.progressCard}>
                    <Text style={AfterLoginStyles.progressTitle}>Progress</Text>
                    <Text style={AfterLoginStyles.progressText}>7 / 15</Text>
                </View>

                {/* Vaccination Schedule Table */}
                <Text style={AfterLoginStyles.scheduleTitle}>Vaccination Schedule</Text>
                <View style={AfterLoginStyles.tableHeader}>
                    <Text style={AfterLoginStyles.tableHeaderCell}>Age</Text>
                    <Text style={AfterLoginStyles.tableHeaderCell}>Vaccine</Text>
                    <Text style={AfterLoginStyles.tableHeaderCell}>Status</Text>
                </View>
                <FlatList
                    data={schedule}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                {/* Logout */}
                <TouchableOpacity
                    style={{
                        margin: 20,
                        padding: 16,
                        backgroundColor: '#ef4444',
                        borderRadius: 10,
                        alignItems: 'center',
                    }}
                    onPress={handleLogout}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={AfterLoginStyles.bottomNav}>
                <TouchableOpacity style={AfterLoginStyles.navItem} onPress={() => Alert.alert('Info', 'Set Reminders - coming soon!')}>
                    <FontAwesome name="bell-o" size={22} color="#555" />
                    <Text style={AfterLoginStyles.navText}>Set Reminders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={AfterLoginStyles.navItem} onPress={() => Alert.alert('Info', 'Documents - coming soon!')}>
                    <FontAwesome name="file-o" size={22} color="#555" />
                    <Text style={AfterLoginStyles.navText}>Documents</Text>
                </TouchableOpacity>
                <TouchableOpacity style={AfterLoginStyles.navItem} onPress={() => Alert.alert('Info', 'Edit Profile - coming soon!')}>
                    <FontAwesome name="user-o" size={22} color="#555" />
                    <Text style={AfterLoginStyles.navText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={AfterLoginStyles.navItem} onPress={() => Alert.alert('Info', 'Basic Info - coming soon!')}>
                    <FontAwesome name="info-circle" size={22} color="#555" />
                    <Text style={AfterLoginStyles.navText}>Basic Info</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
