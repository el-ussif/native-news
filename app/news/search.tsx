import React, {Component, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {router, Stack, useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {NewsDataType} from "@/types";
import axios from "axios";
import Loading from "@/components/Loading";
import NewsItem from "@/components/NewsItem";

const Page = () => {
    const {query, category, country} = useLocalSearchParams<{
        query: string,
        category: string,
        country: string
    }>()
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<NewsDataType>();

    useEffect(() => {
        getNews().then(() => {})
        return () => {

        };
    }, []);
    const getNews = async (category = '') => {
        setLoading(true)
        let categoryString = ""
        if (category?.length) {
            categoryString = `&category=${category}`
        }
        let countryString = ""
        if (country?.length) {
            countryString = `&country=${country}`
        }
        let queryString = ""
        if (query?.length) {
            queryString = `&q=${query}`
        }
        const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en,fr&removeduplicate=1${categoryString}${countryString}${queryString}`;
        try {
            const response = await axios.get(url)
            if (response?.data) {
                setNews(response?.data?.results??[])
            }
        } catch (e) {
            console.log("Error", e);
        }
        setLoading(false)
    }
    console.log(news);

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => {
                        return (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name={"arrow-back"} size={22}/>
                            </TouchableOpacity>
                        )
                    },
                    title: 'Search'
                }}
            />

            {
                loading ? (
                    <Loading size="large"/>
                ): (
                    <FlatList
                        data={news}
                        keyExtractor={(_, key) => key}
                        renderItem={({item}) => <NewsItem item={item}/>}
                        showsVerticalScrollIndicator={false}
                    />
                )
            }

        </>
    );
}

export default Page;
