import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NewsDataType} from "@/types";
import {Colors} from "@/constants/Colors";
import Loading from "@/components/Loading";
import {Link} from "expo-router";

type NewsItemProps = {
    item: NewsDataType,
}

const NewsItem = (props: NewsItemProps) => {
    const {item} = props
    return (
        <Link href={`/news/${item.article_id}`} asChild >
            <TouchableOpacity>
                <View style={styles.itemContainer}>
                    <Image source={{uri: item.image_url}} style={styles.image}/>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemCategory}>{item.category}</Text>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <View style={styles.itemSourceInfo}>
                            <Image source={{uri: item.source_icon}} style={styles.itemSourceImage}/>
                            <Text style={styles.itemSourceName}>{item.source_name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    image: {
        width: 90,
        height: 100,
        borderRadius: 20,
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
        gap: 10,
        justifyContent: "space-between"
    },
    itemCategory: {
        fontSize: 12,
        color: Colors.darkGrey,
        textTransform: "capitalize",
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.black,
    },
    itemSourceInfo: {
        flexDirection: 'row',
        gap: 8,
        alignItems: "center"
    },
    itemSourceImage: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    itemSourceName: {
        fontSize: 10,
        color: Colors.darkGrey,
        fontWeight: "400"
    }

})

export default NewsItem;

