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

export default function App() {
  const [todos, setTodos] = useState();

  const pressHandler = async (key) => {
    try {
      await fetch(
        "https://android-todo-app-backend.herokuapp.com/todos/" + key,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      await fetch("https://android-todo-app-backend.herokuapp.com/todos")
        .then((response) => response.json())
        .then((data) => {
          setTodos(data);
        });
    } catch (error) {
      alert("Something went wrong!", error);
    }
  };

  const submitHandler = async (text) => {
    if (text.length > 3) {
      setText("");
      try {
        await fetch("https://android-todo-app-backend.herokuapp.com/todos", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blogTitle: text,
          }),
        });

        await fetch("https://android-todo-app-backend.herokuapp.com/todos")
          .then((response) => response.json())
          .then((data) => {
            setTodos(data);
          });
      } catch (error) {
        alert("Something went wrong!", error);
      }
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };
  useEffect(() => {
    async function fetchMyAPI() {
      await fetch("https://android-todo-app-backend.herokuapp.com/todos")
        .then((response) => response.json())
        .then((data) => setTodos(data));
    }
    fetchMyAPI();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler} />
            <View style={styles.list}>
              {todos && (
                <FlatList
                  data={todos}
                  renderItem={({ item }) => (
                    <TodoItem item={item} pressHandler={pressHandler} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
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
