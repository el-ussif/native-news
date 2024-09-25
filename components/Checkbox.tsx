import React, {Component, useRef, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import Animated, {FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming} from 'react-native-reanimated'

type CategoryProps = {
    label: string;
    checked: boolean;
    onPress: ()=>void;
}

const Checkbox = (props: CategoryProps) => {
    const {label, checked, onPress} = props;
    const rnAnimatedContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(checked ? "rgba(239, 142, 82, 0.1)" : 'transparent', { duration: 150}),
            borderColor: withTiming(checked ? Colors.tint : Colors.black, { duration: 150}),
            paddingLeft: 16,
            paddingRight: checked ? 10 : 16
        }
    }, [checked])
    const rnTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(checked ? Colors.tint : Colors.black, { duration: 150}),
        }
    }, [checked])

    const handleSelectCategory = (index:number)=> {
        //onPress(currentCategory.slug)
    }
    return (
        <Animated.View
            style={[styles.container, rnAnimatedContainerStyle]}
            onTouchEnd={onPress}
            layout={LinearTransition.springify().mass(0.8)}
        >
            <Animated.Text style={[styles.label, rnTextStyle]}> {label} </Animated.Text>
            {
                checked && (
                    <Animated.View
                        style={styles.iconWrapper}
                        entering={FadeIn.duration(350)}
                        exiting={FadeOut}
                    >
                        <AntDesign name={"checkcircle"} size={14} color={Colors.tint}/>
                    </Animated.View>
                )
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Colors.black,
        // paddingHorizontal: 16,
        borderRadius: 32,
    },
    label: {
        fontSize: 14
    },
    itemsWrapper: {
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    iconWrapper: {
        marginLeft: 8,
        height: 14,
        width: 14,
    }
})

export default Checkbox;

