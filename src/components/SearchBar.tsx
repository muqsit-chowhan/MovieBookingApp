import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { close, search } from '../assets/svg';
import { SvgXml } from 'react-native-svg';
import { getHeight } from '../utils/resizeUtils';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    onSubmitEditing,
    placeholder = 'TV shows, movies and more',
}) => {
    return (
        <View style={styles.searchBar}>
            <SvgXml xml={search} height={30} width={30} />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                onSubmitEditing={onSubmitEditing}
                placeholderTextColor={Colors.textSecondary}
                style={styles.input}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <SvgXml xml={close} height={15} width={15} />

                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        height: getHeight(7),
        borderRadius: 30,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
    },
});

export default SearchBar;
