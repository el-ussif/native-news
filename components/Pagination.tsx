import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {NewsDataType} from "@/types";
import Animated, {SharedValue} from "react-native-reanimated";
import {Colors} from "@/constants/Colors";

type PaginationProps = {
    items: NewsDataType[],
    paginationIndex: number,
    scrollX: SharedValue<number>,
}
const { width } = Dimensions.get('screen')

const Pagination = (props: PaginationProps) => {
    const {items, paginationIndex, scrollX} = props

    return (
        <View style={[styles.itemWrapper]}>
            {
                items?.map((_, key) => {
                    return(<Animated.View key={key} style={[styles.dot, {backgroundColor: paginationIndex == key? Colors.tint: Colors.darkGrey}]}/>)
                })
            }

        </View>
    );
}

const styles = StyleSheet.create({
    itemWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        height: 40,
        flexDirection: 'row'
    },
    dot: {
        backgroundColor: '#333',
        marginHorizontal: 2,
        borderRadius: 8,
        height: 8,
        width: 8,
    }
})

export default Pagination;

