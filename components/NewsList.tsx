import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NewsDataType} from "@/types";
import {Colors} from "@/constants/Colors";
import Loading from "@/components/Loading";
import {Link} from "expo-router";
import NewsItem from "@/components/NewsItem";

type NewsListProps = {
    newsList: NewsDataType[],
}

const NewsList = (props: NewsListProps) => {
    const {newsList} = props
    return (
        <View style={styles.container}>
            {
                !newsList?.length ? (
                    <Loading size={'large'}/>
                ): (
                    newsList?.length && newsList.map((item, key) =>  <NewsItem key={key} item={item}/>)
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 20,

    }
})

export default NewsList;

