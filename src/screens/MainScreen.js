import React,{useEffect} from 'react';
import {
    StyleSheet,
    View,
    ImageBackground
} from 'react-native';
import Card from '../components/cards/Card';
const bg_image = require('../assets/bg_image.jpg');

const MainScreen = () => {
    let data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    useEffect(()=>{
        console.log('data genrated do you understand');
    })
    return (
        <View style={styles.container}>
            <ImageBackground source={bg_image} resizeMode='cover' style={styles.bgImage}>
                <Card content={data} />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    }

});

export default MainScreen;
