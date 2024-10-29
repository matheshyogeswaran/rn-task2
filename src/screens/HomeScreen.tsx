import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slices/itemsSlice';
import { Button, ButtonText } from '@/components/ui/button';

const HomeScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);

    const handleAddItem = () => {
        if (input) {
            dispatch(addItem({ id: Date.now().toString(), name: input }));
            setInput('');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button size="lg" variant="solid" action="primary" className='mb-1' onPress={() => { navigation.navigate("About") }}>
                <ButtonText>Add Item</ButtonText>
            </Button>

            <Button size="lg" variant="solid" action="primary"  onPress={() => { navigation.navigate("Digital") }}>
                <ButtonText>See digital Products</ButtonText>
            </Button>


        </View>
    );
};

export default HomeScreen;
