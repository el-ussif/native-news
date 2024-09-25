import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing, FadeInRight, FadeInDown,
} from 'react-native-reanimated';
import {Colors} from "../constants/Colors";
import {StatusBar} from "expo-status-bar";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <StatusBar style="light"/>
        <ImageBackground source={require('@/assets/images/getting-started.jpg')} style={{flex: 1}} resizeMethod={'cover'}>
            <View style={styles.wrapper}>
                <Animated.Text
                    style={styles.text}
                    entering={FadeInRight.delay(300).duration(500)}
                >
                    Stay updated !
                </Animated.Text>
                <Animated.Text
                    style={styles.description}
                    entering={FadeInRight.delay(700).duration(500)}
                >
                    Get breaking news and personalized updates directly to your feed.
                </Animated.Text>
                <Animated.View
                    style={styles.btn}
                    entering={FadeInDown.delay(1200).duration(500)}
                >
                    <TouchableOpacity  onPress={() => router.replace("/(tabs)")}>
                        <Animated.Text style={styles.btnText}>
                            Get Started
                        </Animated.Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 50,
        paddingHorizontal: 30,
        gap: 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    text: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    description: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1.2,
        lineHeight: 22,
    },
    btn: {
      backgroundColor: Colors.tint,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    },
    btnText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'

    }
});
