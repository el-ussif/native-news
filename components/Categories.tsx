import React, {Component, useRef, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";

type CategoryProps = {
    onCategoryChanged: (category) => void,
}

const Categories = (props: CategoryProps) => {
    const {onCategoryChanged} = props;
    const scrollRef: any = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRef = useRef<TouchableOpacity[]|null[]>([]);

    const handleSelectCategory = (index:number)=> {
        const selected = itemRef.current[index];
        setActiveIndex(index)
        selected.measure((x) => {
            scrollRef.current?.scrollTo({x: x-20, y: 0, animated: true})
        })
        console.log("index", index);
        const currentCategory = newsCategoryList[index];
        console.log("currentCategory", currentCategory.slug);
        onCategoryChanged(currentCategory.slug)
    }
    return (
        <View>
            <Text style={styles.title}>
                Trending Right Now
            </Text>

            <ScrollView
                ref={scrollRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemsWrapper}
            >
                {
                    newsCategoryList.map((category, key) => {
                        return (
                            <TouchableOpacity
                                ref={(el) => {
                                    itemRef.current[key] = el;
                                }}
                                key={key} style={[styles.item, activeIndex === key ? styles.itemActive : '']}
                                onPress={() => {
                                    handleSelectCategory(key)
                                }}
                            >
                                <Text style={[activeIndex === key ? styles.itemTextActive: styles.itemText]}>{category.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,

    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    itemsWrapper: {
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    itemActive: {
        borderColor: Colors.tint ,
        backgroundColor: Colors.tint,
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5

    },
    itemTextActive: {
        fontSize: 14,
        color: Colors.white,
        letterSpacing: 0.5,
        fontWeight: "600"
    }
})

export default Categories;

