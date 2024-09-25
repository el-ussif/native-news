import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import {Colors} from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";
import Checkbox from "@/components/Checkbox";
import {useNewsCategories} from "@/hooks/useNewsCategories";
import {useNewsCountries} from "@/hooks/useNewsCountries";
import {Link} from "expo-router";

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets()
  const {newsCategories, toggleNewsCategory} =  useNewsCategories()
  const { countryList, toggleCountry } = useNewsCountries()
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>
      <SearchBar setSearchQuery={setSearchQuery} withHorizontalPadding={false}/>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {
          newsCategories.map((item, key)=> {
            return (
                <Checkbox
                    key={key} label={item.title}
                    checked={item.selected}
                    onPress={()=>{
                      toggleNewsCategory(+item?.id)
                      setCategory(item.slug)
                    }}
                />
            )
          })
        }
      </View>

      <Text style={styles.title}>Countries</Text>
      <View style={styles.listContainer}>
        {
          countryList.map((item, key)=> {
            return (
                <Checkbox
                    key={key} label={item.name}
                    checked={item.selected}
                    onPress={()=>{
                      toggleCountry(item.code)
                      setCountry(item.code)
                    }}
                />
            )
          })
        }
      </View>

      <Link href={{
        params: {
          query: searchQuery,
          country,
          category
        },
        pathname: `/news/search`,
      }} asChild>
        <TouchableOpacity>
          <View style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Search</Text>
          </View>
        </TouchableOpacity>
      </Link>

    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal : 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    color: Colors.white,
  },
  searchBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600"
  },
})
