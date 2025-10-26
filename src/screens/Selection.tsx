import React from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import SeatMap from '../components/SeatMap';
import Detail from '../components/Detail';
import SeatSelectionInfo from '../components/SelectionInfo';
import ZoomControls from '../components/ZoomControls';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHeight, getWidth } from '../utils/resizeUtils';


type SelectionRouteProp = RouteProp<RootStackParamList, 'Selection'>;
type SelectionNavigationProp = StackNavigationProp<RootStackParamList, 'Selection'>;

const Selection: React.FC = () => {
    const navigation = useNavigation<SelectionNavigationProp>();
    const route = useRoute<SelectionRouteProp>();
    const { title } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={title}
                releaseDate={'Oct 27, 2025  I  12:30 hall 1'}
                onBack={() => navigation.goBack()}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <SeatMap />
                <View
                    style={{
                        borderWidth: 0,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        top: 60,
                    }}
                >
                    <ZoomControls />
                </View>
            </ScrollView>

            <View style={styles.bottomSectionWrapper}>
                <View style={styles.bottomSection}>
                    <Detail />
                    <SeatSelectionInfo />

                    <View
                        style={{
                            top: 0,
                            borderWidth: 0,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <View style={styles.rowInfo}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    borderWidth: 0,
                                }}
                            >
                                <Text style={styles.row}>Total Price</Text>
                                <Text style={styles.count}>$ 50</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.selectSeatsButton}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.selectSeatsText}>
                                Proceed To pay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Selection;

const styles = StyleSheet.create({
    container: {
        height: getHeight(100),
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    payButton: {
        backgroundColor: '#FA8FC2',
        paddingVertical: 14,
        borderRadius: 16,
        marginTop: 16,
    },
    payButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    rowInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A6A6A61A',
        borderRadius: 15,
        width: getWidth(25),
        height: getHeight(7),
        left: 15,
        justifyContent: 'center',
    },
    count: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 4,
    },
    row: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400',
    },
    totalLabel: {
        color: '#A0A0A0',
        fontSize: 12,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    selectSeatsButton: {
        backgroundColor: '#61C3F2',
        marginHorizontal: 20,
        marginVertical: 30,
        paddingVertical: 16,
        borderRadius: 14,
        height: 60,
        width: getWidth(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectSeatsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    bottomSectionWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingBottom: 0,
    },
    bottomSection: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        width: '100%',
    },
});
