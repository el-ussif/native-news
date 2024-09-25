import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, View, ViewToken} from 'react-native';
import {Colors} from "@/constants/Colors";
import {NewsDataType} from "@/types";
import SliderItem from "@/components/SliderItem";
import {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import Animated from 'react-native-reanimated'
import {ReanimatedScrollEvent} from "react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes";
import Pagination from "@/components/Pagination";
import Categories from "@/components/Categories";

type BreakingNewsProps = {
    newsData: Array<NewsDataType>
}

const BreakingNews = (props: BreakingNewsProps) => {
    const {newsData} = props
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [data, setData] = useState(newsData);
    const scrollX = useSharedValue(0)
    const ref = useAnimatedRef<Animated.FlatList<any>>();


    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event: any)=> {
            scrollX.value = event.contentOffset.x
        }
    })

    const onViewAbilityItemsChanged = ({viewableItems}: { viewableItem: ViewToken }) => {
        if (viewableItems?.[0]?.index) {
            setPaginationIndex(viewableItems?.[0]?.index % data?.length)
        }
    }

    const viewAbilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    const viewAbilityConfigCallbackPairs = useRef([
        { viewAbilityConfig, onViewAbilityItemsChanged }
    ])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking news</Text>

            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    data={newsData}
                    keyExtractor={(_, key)=> key}
                    renderItem={({item, index}) => <SliderItem scrollX={scrollX} newsDatum={item} index={index}/>}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScrollHandler}
                    horizontal={true}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        //setData([...data, ...newsData])
                    }}
                    viewabilityConfigCallbackPairs={
                        viewAbilityConfigCallbackPairs.current
                    }
                />

                <Pagination items={data} scrollX={scrollX} paginationIndex={paginationIndex}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        justifyContent: 'center'
    }
})

export default BreakingNews;

