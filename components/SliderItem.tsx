import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NewsDataType} from "@/types";
import {Extrapolation, interpolate, SharedValue, useAnimatedStyle} from "react-native-reanimated";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "@/constants/Colors";
import Animated from "react-native-reanimated";
import {Link} from "expo-router";

type SliderItemProps = {
    newsDatum: NewsDataType,
    index: number,
    scrollX: SharedValue<number>,
}
const { width } = Dimensions.get('screen')

const SliderItem = (props: SliderItemProps) => {
    const {newsDatum, index, scrollX} = props
    //@ts-ignore
    const rnStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index-1) * width, index * width, (index+1) * width],
                        [-width * 0.15, 0, width * 0.15],
                        Extrapolation.CLAMP
                    )
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index-1) * width, index * width, (index+1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    )
                }
            ]
        };
    });


    return (
        <Link href={`/news/${newsDatum.article_id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={[styles.itemWrapper, rnStyle]}>
                    <Image style={styles.image} source={{uri: newsDatum.image_url}}/>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0, 0.8)']}
                        style={styles.background}
                    >
                        <View style={styles.sourceInfo}>
                            {
                                newsDatum.source_icon && (
                                    <Image source={{uri: newsDatum.source_icon}} style={styles.sourceIcon}/>
                                )
                            }
                            <Text style={styles.sourceInfoText}>{newsDatum.source_name}</Text>
                        </View>
                        <Text numberOfLines={2} style={styles.title}>{newsDatum.title}</Text>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        //borderWidth: 2,
    },
    image: {
        height: 180,
        borderRadius: 20,
        width: width - 60,
    },
    background: {
        position: 'absolute',
        top: 0,
        right:0,
        left: 30,
        height: 180,
        borderRadius: 20,
        width: width - 60,
        padding: 20,
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
    },
    sourceInfo: {
        flexDirection: 'row',
        gap: 10,
        top: 85,
        position: 'absolute',
        paddingHorizontal: 20,
        alignItems: "center"
    },
    sourceInfoText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: "600"
    },
    title: {
        color: Colors.white,
        fontWeight: "600",
        top: 120,
        position: "absolute",
        paddingHorizontal: 20,
    }
})

export default SliderItem;

