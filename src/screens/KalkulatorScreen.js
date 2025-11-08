import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const KalkulatorScreen = () => {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleInput = (input) => {
    if (display === "0" || waitingForOperand) {
      setDisplay(String(input));
      setWaitingForOperand(false);
    } else {
      setDisplay(display + String(input));
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, currentValue, inputValue);
      setDisplay(String(result));
      setCurrentValue(result);
    }
    
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (op, prevValue, nextValue) => {
    switch (op) {
      case "+": return prevValue + nextValue;
      case "-": return prevValue - nextValue;
      case "*": return prevValue * nextValue;
      case "/": return prevValue / nextValue;
      case "=": return nextValue;
      default: return nextValue;
    }
  };

  const handleSpecialOperation = (op) => {
    const inputValue = parseFloat(display);
    let result;
    switch (op) {
      case "sqrt": 
        result = Math.sqrt(inputValue);
        break;
      case "sqr": 
        result = inputValue * inputValue;
        break;
      default:
        return;
    }
    setDisplay(String(result));
    setCurrentValue(result);
    setWaitingForOperand(true);
  };
  
  const ButtonComp = ({ value, style = {}, textStyle = {}, onPress }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1}>{display}</Text>
      </View>
      <View style={styles.buttonRow}>
        <ButtonComp value="C" style={styles.clearButton} onPress={handleClear} />
        <ButtonComp value="√" style={styles.opButton} onPress={() => handleSpecialOperation("sqrt")} />
        <ButtonComp value="x²" style={styles.opButton} onPress={() => handleSpecialOperation("sqr")} />
        <ButtonComp value="/" style={styles.opButton} onPress={() => handleOperation("/")} />
      </View>
      <View style={styles.buttonRow}>
        <ButtonComp value="7" onPress={() => handleInput(7)} />
        <ButtonComp value="8" onPress={() => handleInput(8)} />
        <ButtonComp value="9" onPress={() => handleInput(9)} />
        <ButtonComp value="*" style={styles.opButton} onPress={() => handleOperation("*")} />
      </View>
      <View style={styles.buttonRow}>
        <ButtonComp value="4" onPress={() => handleInput(4)} />
        <ButtonComp value="5" onPress={() => handleInput(5)} />
        <ButtonComp value="6" onPress={() => handleInput(6)} />
        <ButtonComp value="-" style={styles.opButton} onPress={() => handleOperation("-")} />
      </View>
      <View style={styles.buttonRow}>
        <ButtonComp value="1" onPress={() => handleInput(1)} />
        <ButtonComp value="2" onPress={() => handleInput(2)} />
        <ButtonComp value="3" onPress={() => handleInput(3)} />
        <ButtonComp value="+" style={styles.opButton} onPress={() => handleOperation("+")} />
      </View>
      <View style={styles.buttonRow}>
        <ButtonComp value="0" style={styles.zeroButton} onPress={() => handleInput(0)} />
        <ButtonComp value="." onPress={() => handleInput(".")} />
        <ButtonComp value="=" style={styles.equalButton} onPress={() => handleOperation("=")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#222222", padding: 10, justifyContent: "flex-end" },
  displayContainer: {
    backgroundColor: "#444444",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "flex-end",
    minHeight: 120,
    justifyContent: "flex-end",
    elevation: 5,
  },
  displayText: { fontSize: 60, color: "#ffffff", fontWeight: "200" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  button: {
    flex: 1,
    backgroundColor: "#666666",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    minHeight: 75,
    elevation: 2,
  },
  buttonText: { fontSize: 30, color: "#ffffff" },
  opButton: { backgroundColor: "#FF9500" },
  clearButton: { backgroundColor: "#FF3B30" },
  equalButton: { backgroundColor: "#4CAF50" },
  zeroButton: { flex: 2, marginHorizontal: 5, backgroundColor: "#666666" } 
});

export default KalkulatorScreen;