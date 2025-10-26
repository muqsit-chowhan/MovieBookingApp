import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { notAvaialable, regular, selected, vip } from '../assets/svg';
import { getWidth } from '../utils/resizeUtils';

const Detail: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: getWidth(70), borderWidth: 0, justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
                <View style={styles.item}>
                    <SvgXml xml={selected} width={18} height={18} />

                    <Text style={styles.text}>Selected</Text>
                </View>

                <View style={styles.item}>
                    <SvgXml xml={notAvaialable} width={18} height={18} />

                    <Text style={styles.text}>Not available</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: getWidth(70), borderWidth: 0, justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
                <View style={styles.item}>
                    <SvgXml xml={vip} width={18} height={18} />

                    <Text style={styles.text}>VIP (150$)</Text>
                </View>

                <View style={[styles.item, { left: 10 }]}>
                    <SvgXml xml={regular} width={18} height={18} />

                    <Text style={styles.text}>Regular (50 $)</Text>
                </View>
            </View>
          

        </View>
    );
};

export default Detail;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        marginBottom: 10,
        top:10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 10
    },
    box: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginRight: 6,
    },
    text: {
        color: '#8F8F8F',
        fontSize: 14,
        fontWeight: 'bold'
    },
});
