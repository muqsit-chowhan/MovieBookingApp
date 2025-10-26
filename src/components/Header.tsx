import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { backButton } from '../assets/svg';
import { SvgXml } from 'react-native-svg';

interface MovieHeaderProps {
    title: string;
    releaseDate: string;
    onBack?: () => void;
}

const Header: React.FC<MovieHeaderProps> = ({ title, releaseDate, onBack }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: 90 }]}>
            <View style={styles.header}>

                <SvgXml xml={backButton} style={styles.backButton} width={40} height={40} onPress={onBack} />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        {title.length > 10 ? `${title.substring(0, 15)}...` : title}
                    </Text>
                    <Text style={styles.subHeader}>{releaseDate}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EDEDED',
        bottom: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 30,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        bottom: 25
    },
    textContainer: {
        alignItems: 'center',
        bottom: 20,
        gap: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    subHeader: {
        fontSize: 15,
        color: '#61C3F2',
        fontWeight: '700',
    },
});

export default Header;
