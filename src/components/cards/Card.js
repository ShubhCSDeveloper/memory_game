import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Card = (props) => {
    const [firstCard, setFirstCard] = useState();
    const [secondCard, setSecondCard] = useState();
    const [turns, setTurns] = useState(0);
    const [matches, setMatches] = useState(0);
    const [memoryData, setMemoryCards] = useState('');
    const [displayData, setDisplayData]=useState([]);

    const matchFound = (item, index) => {
        if (displayData[firstCard] == displayData[index]) {
            setMatches(matches + 1);
            setMemoryCards(memoryData + item);
                setSecondCard();
                setFirstCard();
        } else {
            setTimeout(()=>{
                setSecondCard();
                setFirstCard();
            },500);
        }
    }

    const memoryCard = (item, index) => {
        if (firstCard!=undefined && firstCard != index) {
            setTurns(turns + 1);
            setSecondCard(index);
            matchFound(item, index);
        } else if(firstCard===undefined) {
            setFirstCard(index);
        }
    }
    const suffleData=(...data)=>{
        data = data.sort(() => Math.random() - 0.5);
        setDisplayData(data);
        setSecondCard();
        setFirstCard();
        setMemoryCards('');
        setTurns(0);
        setMatches(0);
    }

    useEffect(()=>{
        suffleData(...props.content);
    },[])

    return (
        <View>
            <View style={styles.contentContainer}>
                <Text style={styles.content}>Matches:{matches}</Text>
                <Text style={styles.content}>Turns:{turns}</Text>
            </View>
            <View style={styles.cardContainer}>
                {displayData.map((items, index) => {
                    let cardMemoryFound = memoryData.match(items);
                    return (
                        <TouchableOpacity style={[styles.container, firstCard === index || secondCard === index || cardMemoryFound ? null : { backgroundColor: 'pink' }]} onPress={() => { memoryCard(items, index); }} key={'card' + index}>
                            <Text style={[styles.textStyle, firstCard === index || secondCard === index || cardMemoryFound ? null : { display: 'none' }]}>{items}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Reset' onPress={()=>{suffleData(...props.content)}} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: deviceWidth / 4.2,
        height: deviceHeight / 6,
        marginBottom: deviceHeight / 150,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        width:deviceWidth/3,
        margin:deviceHeight/150
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: deviceHeight / 100
    },
    content: {
        fontSize: 20,
        color: 'white'
    },
    cardContainer: {
        margin: deviceWidth / 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    textStyle: {
        fontSize: 40,
        color: 'white'
    }
});

export default React.memo(Card);
