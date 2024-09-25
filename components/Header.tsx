import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    source={{
                        uri: 'https://randomuser.me/api/portraits/men/16.jpg'
                    }}
                    style={styles.userImage}
                />
                <View style={{gap: 3}}>
                    <Text style={styles.welcomeText}> Welcome </Text>
                    <Text style={styles.usernameText}> El Ussif Awanou!</Text>
                </View>
            </View>

            <TouchableOpacity onPress={()=> {}}>
                <Ionicons name="notifications-outline" size={24} color={Colors.black}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,

    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    welcomeText: {
        fontSize: 12,
        color: Colors.darkGrey,
    },
    usernameText: {
        fontSize: 14,
        color: Colors.darkGrey,
    }

})

export default Header;

