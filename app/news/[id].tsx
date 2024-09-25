import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image, Alert,
} from 'react-native';
import {useLocalSearchParams, Stack, router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";
import Loading from "@/components/Loading";
import {Colors} from "@/constants/Colors";
import {NewsDataType} from "@/types";
import Moment from "moment"
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at atque aut cumque eligendi facere facilis illum, iusto numquam obcaecati omnis perferendis recusandae, tempore? Aliquam, aperiam, asperiores culpa distinctio eveniet ex fugit illo in libero magni, molestias nobis placeat possimus quas ratione reprehenderit vel voluptate. Ab accusamus asperiores at autem cum debitis ducimus eaque, eum modi non nulla provident quis ratione, recusandae saepe soluta tempore veritatis voluptatem? A architecto delectus dignissimos dolore dolorem dolorum eligendi eum ex explicabo fuga laboriosam laborum magnam maxime minima modi natus neque nobis non nostrum nulla odio optio quasi quo, quod quos ratione recusandae repellat repellendus reprehenderit, sapiente sunt tempora ullam vel velit veritatis voluptas voluptatum. A accusamus architecto earum fugit iusto mollitia, possimus quas similique voluptatibus! Adipisci aliquid animi consequuntur cupiditate dolorum eius eligendi eveniet incidunt inventore ipsa ipsam itaque iusto, magnam, minus nemo odio possimus praesentium provident repellat reprehenderit rerum saepe ut velit veniam voluptatibus? Accusamus aliquam amet animi, corporis doloribus dolorum fugiat impedit itaque, necessitatibus nesciunt optio quia quod, reprehenderit sequi temporibus? Exercitationem illo nam natus, officia pariatur placeat porro recusandae velit veritatis voluptatum. A ad blanditiis consequuntur debitis dolorum enim error eum expedita explicabo impedit in incidunt, ipsum itaque iusto laboriosam laborum magni minima natus nihil nulla officia pariatur possimus provident rem sed, soluta ullam. Accusantium assumenda consectetur consequatur distinctio facilis iure laborum omnis perferendis reprehenderit rerum? Corporis eum nulla obcaecati placeat quia repellendus unde ut. Accusamus aliquam aperiam architecto asperiores assumenda at aut cupiditate debitis delectus deserunt doloribus enim est, exercitationem fugit hic iste, laboriosam molestias nobis obcaecati officia provident quo sapiente temporibus ullam unde vero voluptates voluptatibus? Aliquid aperiam beatae commodi consequuntur deserunt doloremque eum exercitationem expedita explicabo maiores maxime, minima minus nam non quaerat quibusdam rem, sapiente ut veritatis voluptatum. Consequatur delectus ducimus eius eos est eveniet explicabo facere fugit ipsa ipsam labore, laudantium, maxime minima modi molestiae nam non numquam pariatur perferendis quam quibusdam quis quos suscipit temporibus veniam voluptas voluptates voluptatibus? Culpa esse et fugiat illo necessitatibus odit omnis soluta ut vel? Ad delectus dolore ex molestiae nemo possimus quos repellat sed tempora veritatis. Accusamus adipisci aliquam aliquid at atque autem cum deserunt dicta, distinctio dolorem, eligendi enim esse exercitationem expedita fuga in incidunt ipsum iste laboriosam magnam natus nemo perspiciatis porro quae quas quibusdam quos ratione rem repellat repudiandae rerum sapiente sed sint temporibus vitae voluptatibus voluptatum! At distinctio excepturi id incidunt modi molestias nisi odit quas qui repellendus saepe, soluta tempore? Blanditiis, dolore eius esse explicabo illum ipsam rerum tempore veritatis voluptas. Accusantium aliquid at consequuntur dicta nesciunt obcaecati odio optio quos repellat, vitae? Aliquam assumenda autem commodi consectetur dicta distinctio dolores eaque enim error est eum ex, explicabo fugiat impedit ipsum itaque magnam modi molestiae officia pariatur provident ratione rem repellat sapiente tempore temporibus totam! At consectetur hic possimus tempore temporibus? Accusamus ad aliquid, dignissimos exercitationem expedita, facilis inventore labore magnam nisi perspiciatis possimus quae quasi quia quidem rem repellat, suscipit? Beatae consectetur, consequuntur cum ea error id iste labore neque nihil nisi perspiciatis provident quasi quia quisquam soluta, sunt ullam. Accusantium animi, earum eligendi fuga ipsum labore libero maxime recusandae repellendus tenetur. Animi aperiam culpa dignissimos, doloremque eveniet excepturi expedita harum labore officia pariatur quidem, quis repellat vel! Accusamus amet aperiam at dolorum eveniet, exercitationem hic illo ipsum labore laboriosam, laborum libero, mollitia neque nobis numquam possimus quis recusandae repellat sint soluta suscipit tenetur vitae! Aut esse in reiciendis. Autem commodi dolorem dolores ea, enim expedita hic illum ipsam itaque laboriosam minima minus, molestias natus quia quisquam sed soluta tempora? Deserunt eveniet excepturi fugiat hic quod. A accusamus commodi et magni maiores neque nesciunt odit pariatur, perspiciatis recusandae rerum saepe sint tempora temporibus tenetur. Amet architecto doloremque eius error fugit iste iure iusto minus necessitatibus nihil, porro quibusdam repellat sed ut veritatis vitae voluptatem voluptatum? Assumenda consectetur, consequatur culpa dignissimos dolorum esse id impedit inventore magnam nam omnis optio velit voluptate! Culpa deleniti deserunt dicta eos error eveniet fuga, incidunt nam nobis porro recusandae sapiente soluta suscipit. Ad, animi architecto doloribus eos exercitationem maiores nobis? Assumenda eveniet in molestiae odio! Fuga ipsa similique vitae! Amet aspernatur at aut cumque, debitis eligendi expedita facere, harum inventore libero magni molestias neque, nostrum quasi quod saepe sit! Ab in nemo quas quis sapiente sed sit vitae voluptates! Ab aliquid assumenda atque autem consequuntur corporis cumque dignissimos dolorem doloremque dolores doloribus ducimus enim esse excepturi id labore minima molestiae nam nemo nobis numquam odit perferendis qui quia saepe sapiente sed sint, unde veniam, voluptatum? Aspernatur beatae debitis doloremque enim facere fuga pariatur? A debitis explicabo facere perferendis quos voluptate voluptatum. Aliquid beatae blanditiis delectus distinctio earum enim id ipsam laudantium minus modi necessitatibus nihil nostrum omnis optio, quidem sapiente soluta sunt vel, velit voluptatem! Delectus doloribus ea est explicabo illum inventore quasi quia reiciendis, unde! Aliquam asperiores assumenda corporis doloremque eveniet hic inventore molestias nemo officia, optio quibusdam quidem repudiandae suscipit. Accusantium ad dicta dolorem doloribus dolorum, est expedita, impedit, magni minus perspiciatis quae quod quos suscipit vel voluptate. Amet deserunt dolor eum, libero minus obcaecati praesentium quae recusandae totam voluptate? Corporis debitis ducimus ea eaque obcaecati porro quod voluptas. Atque corporis culpa delectus dolor eius eligendi, eos fuga harum illo inventore ipsa magni molestiae natus, nemo non nulla quasi qui quod ratione rem repellat sapiente sit tempora totam ullam, velit voluptas voluptatum! Id non numquam perferendis totam vel! Animi consequatur culpa distinctio eos error est excepturi fugiat illum impedit, iure laborum libero numquam odio quaerat qui quia quibusdam quo repellendus veniam veritatis voluptatem voluptates voluptatum. Ab adipisci alias cupiditate expedita illo inventore minus quae reiciendis veniam voluptatum. Adipisci amet, aperiam asperiores dignissimos ducimus earum eos esse est iste itaque magni minima molestias possimus quasi tempora? Aperiam aut debitis fugiat harum minima quaerat quasi ratione repellendus. Ab accusamus atque, commodi consequatur delectus deserunt ducimus eligendi enim harum incidunt ipsum itaque iusto laborum laudantium minima, nobis omnis quam quidem rem sit? Asperiores autem blanditiis consequuntur dolorum explicabo facilis ipsa molestiae necessitatibus neque officia officiis, repudiandae ullam voluptas."

const NewsDetails = (props) => {
    const {id } = useLocalSearchParams<{id: string}>()
    const [newsData, setNewsData] = useState<NewsDataType>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        getNewsData().then(async () => {})
        return () => {

        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            renderBook().then(() => {})
        }
    }, [isLoading]);

    const saveBookmark = async (newsId) => {
        setBookmarked(true)
        await AsyncStorage.getItem('bookmarks').then((token) => {
            const res = JSON.parse(token ?? null as string)
            if (!!res) {
                let data = res.find((value: string) => value === newsId);
                if (data == null) {
                    res.push(newsId)
                    AsyncStorage.setItem("bookmarks", JSON.stringify(res))
                    Alert.alert("Info", "News saved")
                }
            } else {
                let bookmarks = []
                bookmarks.push(newsId);
                AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks))
                Alert.alert("Info", "News saved")
            }
        })
    }

    const removeBookMark = async (newsId: string) => {
        setBookmarked(false)
        const bookmarks = await AsyncStorage.getItem("bookmarks").then((token:string|null) => {
            const resp = JSON.parse(token?? null as string)
            if (resp?.length) {
                return resp.filter((id: string) => id !== newsId)
            }
        })
        await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        Alert.alert("Info", "News removed")
    }

    const renderBook = async () => {
        await AsyncStorage.getItem("bookmarks").then((token) => {
            const res = JSON.parse(token ?? null as string);
            if (!!res) {
                let data = res.find((value: string) => value === newsData?.article_id);
                !!data ? setBookmarked(true) : setBookmarked(false)

            }
        })
    }

    const getNewsData = async () => {
        setIsLoading(true)
        const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
        try {
            const response = await axios.get(url)
            if (response?.data) {
                await setNewsData(response?.data?.results?.[0]??[])

                //await renderBook(response?.data?.results?.[0]?.article_id)
            }
        } catch (e) {
            console.log("Error", e);
        }
        setIsLoading(false)
    }
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
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={async () => {
                                bookmarked ? await removeBookMark(newsData.article_id) : await saveBookmark(newsData.article_id)
                            }}>
                                <Ionicons name={bookmarked ? "heart" : "heart-outline"} color={bookmarked ? Colors.tint : Colors.black} size={22}/>
                            </TouchableOpacity>
                        )
                    },
                    title: ''
                }}
            />

            {
                isLoading ? (
                    <Loading size='large'/>
                ) : (
                    <ScrollView style={styles.contentContainer}>
                        <Text style={styles.title}> {newsData.title} </Text>
                        <View style={styles.newsInfoWrapper}>
                            <Text style={styles.newsInfo}>{Moment(newsData?.pubDate).format("MMMM DD, hh:mm a")}</Text>
                            <Text style={styles.newsInfo}>{newsData?.source_name }</Text>
                        </View>


                        <Image source={{uri: newsData.image_url}} style={styles.newsImage}/>
                        <Text style={styles.newsContent}> {newsData.content !== 'ONLY AVAILABLE IN PAID PLANS' ? newsData.content : defaultContent} </Text>
                    </ScrollView>
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,

    },
    newsImage: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
    },
    newsInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    newsInfo: {
        fontSize: 12,
        color: Colors.darkGrey,
    },
    title: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: "600",
        marginVertical: 10,
        letterSpacing: 0.6
    },
    newsContent: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        letterSpacing: 0.8,
        textAlign: "justify"
    }
})

export default NewsDetails;

