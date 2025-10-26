import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../utils/resizeUtils';
import { close } from '../assets/svg';
import { SvgXml } from 'react-native-svg';

const SelectionInfo: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.rowInfo}>
                <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center',borderWidth:0 }}>
                    <Text style={styles.count}>4 /</Text>
                    <Text style={styles.row}>3 row</Text>
                </View>

                <View style={{ borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <SvgXml xml={close} width={12} height={12} />
                </View>
            </View>
        </View>
    );
};

export default SelectionInfo;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    rowInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A6A6A61A',
        borderRadius: 15,
        width:getWidth(30),
        height:getHeight(4.5),
        left: 15,
        justifyContent: 'space-between',
        paddingHorizontal:10
    },
    count: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 4,
    },
    row: {
        color: 'black',
        fontSize: 12,
        fontWeight: '400'
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
});
