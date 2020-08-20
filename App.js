import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";
import { AsyncStorage } from "react-native";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setText("");
      setTodos((prevTodos) => {
        return [{ text, key: Math.random().toString() }, ...prevTodos];
      });
      let obj = { text: text, key: Math.random().toString() };
      console.log("ami new data", obj);
      AsyncStorage.setItem("todos", JSON.stringify(obj));
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     let user = await AsyncStorage.getItem("todos");
  //     console.log("haha", user);
  //     // setTodos([
  //     //   {text: user.map((x) => x.task),
  //     //   key: user.map((y) => y.key)}
  //     // ])
  //   }
  //   fetchMyAPI();
  // }, []);

  const displayData = async () => {
    try {
      let user = await AsyncStorage.getItem("todos");
      console.log('ball', user)
      let parsed = await JSON.parse(user);
      console.log("parsed data", parsed);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    displayData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler} />
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  scrollView: {},
});
