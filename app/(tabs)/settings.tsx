import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {Stack} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";

type Props = {}

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);


  const toggleSwitch = () => {
    setIsEnabled((prevState => !prevState))
  }
  return (
      <>
        <Stack.Screen
            options={{
              headerShown: true
            }}
        />
        <View style={styles.container}>
          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>
              About
            </Text>
            <MaterialIcons color={Colors.lightGrey} name={"arrow-forward-ios"} size={16}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>
              Send feed back
            </Text>
            <MaterialIcons color={Colors.lightGrey} name={"arrow-forward-ios"} size={16}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>
              Privacy Policy
            </Text>
            <MaterialIcons color={Colors.lightGrey} name={"arrow-forward-ios"} size={16}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>
              Terms of use
            </Text>
            <MaterialIcons color={Colors.lightGrey} name={"arrow-forward-ios"} size={16}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch}>
            <Text style={styles.itemBtnText}>
              Dark Mode
            </Text>
            <Switch
              onValueChange={toggleSwitch}
              value={isEnabled}
              trackColor={{false: '#767577', true: '#3E3E3E'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#F4F3F4'}
              ios_backgroundColor="#3E3E3E"
              style={{transform: [{scale: 0.6}], marginBottom: -15, marginRight: -8}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBtn}>
            <Text style={[styles.itemBtnText, {color: Colors.red}]}>
              Logout
            </Text>
            <MaterialIcons color={Colors.red} name={"logout"} size={16}/>
          </TouchableOpacity>
        </View>
      </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: Colors.background
  },
  itemBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
})
