import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";

type Props = {
    withHorizontalPadding: boolean,
    setSearchQuery: Function
}

const SearchBar = ({withHorizontalPadding=true, setSearchQuery}: Props) => {
    return (
        <View style={[withHorizontalPadding&&{paddingHorizontal: 20}, styles.container]}>
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color={Colors.lightGrey}/>
                <TextInput
                    style={styles.searchText}
                    placeholderTextColor={Colors.lightGrey}
                    autoCapitalize='none'
                    placeholder="Search"
                    onChangeText={query => setSearchQuery(query)}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    searchBar: {
        backgroundColor: "#e4e4e4",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
    },
    searchText: {
        fontSize: 12,
        flex: 1,
        color: Colors.lightGrey
    }
})

export default SearchBar;

