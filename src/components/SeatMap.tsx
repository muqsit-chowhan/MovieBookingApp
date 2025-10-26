import React from 'react';
import { View, StyleSheet } from 'react-native';
import { seatSelection, series } from '../assets/svg';
import { SvgXml } from 'react-native-svg';
import { getHeight, getWidth } from '../utils/resizeUtils';

const SeatMap: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <SvgXml xml={series} width={getWidth(5)} height={getHeight(18)}  style={{top:23}} />
                <SvgXml xml={seatSelection} width={getWidth(85)} height={getHeight(100)}/>
            </View>
        </View>
    );
};

export default SeatMap;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
    },
    subContainer: {
        width: getWidth(100),
        height: 250,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    text: {
        color: '#A0A0A0',
    },
});
