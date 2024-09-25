import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import {NewsDataType} from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Pagination from "@/components/Pagination";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets()
  const [news, setNews] = useState<NewsDataType>();
  const [breakingNews, setBreakingNews] = useState<NewsDataType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    getBreakingNews().then(() => {})
    getNews().then(() => {})
    return () => {

    };
  }, []);


  const getBreakingNews = async () => {
    setIsLoading(true)
    const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&removeduplicate=1&size=7`;
    const response = await axios.get(url)
    if (response?.data) {
      setBreakingNews(response?.data?.results??[])
    }
    setIsLoading(false)
  }

  const getNews = async (category = '') => {
    setNews([])
    const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en,fr${category? '&category='+category: ''}&removeduplicate=1&size=10`;
    try {
      const response = await axios.get(url)
      if (response?.data) {
        setNews(response?.data?.results??[])
      }
    } catch (e) {
      console.log("Error", e);
    }
  }


  const onCategoryChanged = async (category: string) => {
    await getNews(category)
  }

  return (
    <ScrollView style={[styles.container, {paddingTop: safeTop}]} showsVerticalScrollIndicator={false}>
      <Header/>
      <SearchBar/>
      {
        isLoading ? (
            <Loading size='large'/>
        ) : (
            <BreakingNews newsData={breakingNews}/>
        )
      }

      <Categories onCategoryChanged={onCategoryChanged}/>

      <NewsList newsList={news}/>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
})
