import React from "react";
import { View, Platform } from "react-native";
import { Paragraph, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Languages = ({ languages, levelsList, onLanguageLongPress }) => {
  // const langs = [
  //   { _id: '0', language: 'Arabic', level: 'Native Speaker' },
  //   {
  //     _id: '1',
  //     language: 'English',
  //     level: 'Excellent Command / Highly proficient in spoken and written'
  //   }
  // ];

  return (
    <>
      {languages.map(({ _id, language, level }) => (
        <Card
          key={_id}
          style={{ margin: 10 }}
          onLongPress={
            onLanguageLongPress && onLanguageLongPress.bind(this, _id)
          }
        >
          <Card.Title title={language} />
          <Card.Content>
            <View style={{ flexDirection: "row" }}>
              {levelsList.map((_, i) => (
                <Ionicons
                  key={i}
                  name={Platform.OS === "android" ? "md-star" : "ios-star"}
                  color={levelsList.indexOf(level) < i ? "lightgrey" : "orange"}
                  size={24}
                />
              ))}
            </View>

            <Paragraph>{level}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default Languages;
