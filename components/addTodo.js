import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

export default function AddTodo({ submitHandler }) {
  [text, setText] = useState("");
  const changeHandler = (val) => {
    setText(val);
  };
  const submitHandler2 = async () => {
    alert("This functionality is under construction!");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />

      <View style={styles.addBtn}>
        <Button
          color="coral"
          onPress={() => submitHandler(text)}
          title="add todo"
        />
      </View>
      <Button
        color="coral"
        onPress={() => submitHandler2()}
        title="clear todo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  addBtn: {
    marginBottom: 10,
    color: "green",
  },
});
