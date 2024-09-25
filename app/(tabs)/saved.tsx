import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {router, Stack} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import Loading from "@/components/Loading";
import NewsItem from "@/components/NewsItem";
import {useIsFocused} from "@react-navigation/native";

type Props = {}

const Page = (props: Props) => {
  const [bookMarkNews, setBookMarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused()

  useEffect(() => {
    fetchBookmarkNews().then(res => {})
    return () => {

    };
  }, [isFocused]);


  const fetchBookmarkNews = async () => {
    await AsyncStorage.getItem('bookmarks').then(async (token) => {
      const res = JSON.parse(token?? null as string);
      if (res) {
        setIsLoading(true)
        const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${res.join(',')}`;
        try {
          const response = await axios.get(url)
          if (response?.data) {
             setBookMarkNews(response?.data?.results??[])
          }
        } catch (e) {
          console.log("Error", e);
        }
        setIsLoading(false)
      }
    })
  }
  return (
      <>
        <Stack.Screen
            options={{
              headerShown: true
            }}
        />
        <View style={styles.container}>
          {
            isLoading ? (
                <Loading/>
            ) : (
                <FlatList
                  data={bookMarkNews}
                  keyExtractor={(_, key) => key}
                  renderItem={({item}) => <NewsItem item={item}/>}
                />
            )
          }
        </View>
      </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
})
