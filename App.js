import React, {useEffect} from 'react';
import {
  StyleSheet,
  BackHandler,
  Alert
} from 'react-native';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  },[]);

  return (
    <MainScreen />
  );
};

const styles = StyleSheet.create({

});

export default App;
