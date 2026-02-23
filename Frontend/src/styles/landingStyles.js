import { StyleSheet } from 'react-native';

export const landingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fbff',
    },
    heroSection: {
        padding: 20,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2d3a4a',
        marginBottom: 10,
        textAlign: 'center',
    },
    highlight: {
        color: '#ff6b81',
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
        lineHeight: 20,
        textAlign: 'center',
    },
    heroImage: {
        width: 260,
        height: 260,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    primaryButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    secondaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#2d3a4a',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2d3a4a',
    },
    cardText: {
        fontSize: 13,
        color: '#555',
    },
    ctaButton: {
        backgroundColor: '#ff6b81',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    ctaButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#3498db',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signupButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    signupButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    authButtonsContainer: {
        gap: 10,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#777',
    },
    footerTextSmall: {
        fontSize: 10,
        color: '#aaa',
        marginTop: 5,
    },
});
