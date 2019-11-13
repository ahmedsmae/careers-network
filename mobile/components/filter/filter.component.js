import React, { useState } from "react";
import { View } from "react-native";
import { Text, Divider } from "react-native-paper";
import { OutlinedInput } from "../custom-input/custom-input.rnc";

const Filter = ({
  list,
  value,
  label,
  onSelect,
  filterItem,
  listItem,
  style,
  clearAfterSelect
}) => {
  const [query, setQuery] = useState(value || "");
  const [filtering, setFiltering] = useState(false);

  return (
    <View style={[style]}>
      {filtering && (
        <View
          style={{
            backgroundColor: "lightgrey",
            width: "100%",
            maxHeight: 200,
            overflow: "hidden",
            borderRadius: 5,
            marginBottom: 10
          }}
        >
          {list
            .filter(item => {
              if (!!filterItem && query.trim().length > 0) {
                return item[filterItem]
                  .toLowerCase()
                  .includes(query.trim().toLowerCase());
              } else if (query.trim().length > 0) {
                return item.toLowerCase().includes(query.trim().toLowerCase());
              }
            })
            .map((item, index) => {
              if (index < 10) {
                return (
                  <View key={index}>
                    <Text
                      style={{ padding: 5, margin: 5, elevation: 100 }}
                      onPress={() => {
                        onSelect(item);
                        setFiltering(false);
                        setQuery(listItem(item));
                        clearAfterSelect && setQuery("");
                      }}
                    >
                      {listItem(item)}
                    </Text>
                    <Divider />
                  </View>
                );
              }
            })}
        </View>
      )}

      <OutlinedInput
        style={{ marginBottom: 5, width: "100%" }}
        label={label}
        value={query}
        onChange={({ value }) => {
          setQuery(value);
          setFiltering(true);
        }}
      />
    </View>
  );
};

export default Filter;
