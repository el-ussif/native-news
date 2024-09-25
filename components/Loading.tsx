import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View} from 'react-native';

const Loading = (props: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<ActivityIndicator> & Readonly<ActivityIndicatorProps>) => {
    return (
        <View style={styles.container}>
             <ActivityIndicator {...props}/>
            <Text>
                Loading....
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        flex: 1,
    },
})

export default Loading;

