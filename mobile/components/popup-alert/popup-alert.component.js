import React, { useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

const PopupAlert = ({
  MESSAGE_TEXT,
  MESSAGE_WIDTH,
  MESSAGE_TYPE,
  MESSAGE_DURATION,
  onDisplayComplete
}) => {
  const _position = new Animated.Value(75);
  const _width = new Animated.Value(35);

  const positionStyles = { transform: [{ translateY: _position }] };
  const widthStyles = { width: _width };

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.spring(_position, {
        toValue: 0,
        duration: 100,
        friction: 7,
        tension: 80
      }),
      Animated.spring(_width, { toValue: MESSAGE_WIDTH, duration: 700 }),
      Animated.delay(MESSAGE_DURATION),
      Animated.timing(_position, { toValue: 75, duration: 200 }),
      Animated.timing(_width, { toValue: 35 })
    ]).start(onDisplayComplete);
  });

  return (
    <Animated.View
      style={[
        styles.message,
        { backgroundColor: MESSAGE_TYPE === "success" ? "#27d956" : "#ed3e49" },
        positionStyles,
        widthStyles
      ]}
    >
      {MESSAGE_TYPE === "success" ? (
        <Animated.Text style={[styles.messageText]} numberOfLines={1}>
          &#10003; {MESSAGE_TEXT}
        </Animated.Text>
      ) : (
        <Animated.Text style={[styles.messageText]} numberOfLines={1}>
          &#10005; {MESSAGE_TEXT}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  message: {
    position: "absolute",
    bottom: 20,
    height: 35,
    borderRadius: 16,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    overflow: "hidden",
    elevation: 10,
    shadowColor: "grey",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    zIndex: 100
  },
  messageText: {
    fontSize: 16,
    color: "white",
    marginHorizontal: 10
  }
});

export default PopupAlert;
