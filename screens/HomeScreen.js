import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      word: "",
      definition: "",
      type: "",
    };
  }

  getWord = (word) => {
    var keyword = word.toLowerCase().trim();
    var url =
      "https://rupinwhitehatjr.github.io/dictionary/" + keyword + ".json";
    console.log(url);
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var type = wordData.wordtype;
          this.setState({
            word: this.state.text,
            definition: definition,
            type: type,
          });
        } else {
          this.setState({
            word: this.state.text,
          });
        }
      });
  };
  /*componentDidUpdate(){
  }*/
  render() {
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.getWord(this.state.text);
          }}
        >
          <Text style={styles.buttonText}>go</Text>
        </TouchableOpacity>

        <Text style={styles.displayText}>Word: {this.state.word}</Text>
        <Text style={styles.displayText}>Type: {this.state.type}</Text>
        <Text style={styles.displayText}>Definition: {this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#b8b8b8" },
  inputBox: {
    marginTop: 50,
    width: "80%",
    alignSelf: "center",
    height: 40,
    textAlign: "center",
    borderWidth: 4,
    paddingRight: 60,
    paddingLeft: 60
  },
  goButton: {
    width: "50%",
    height: 55,
    alignSelf: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: { borderWidth: 5, borderColor: 'blue', paddingLeft: 20, paddingRight: 20, borderRadius: 50, backgroundColor: 'green', textAlign: "center", fontSize: 30, fontWeight: "bold" },
  imageIcon: { width: 150, height: 150, marginLeft: 95 },
  displayText: { textAlign: 'center', fontSize: 30 },
});
