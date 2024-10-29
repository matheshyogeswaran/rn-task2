import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';


const DigitalProducts = ({ navigation }) => {

    const items = useSelector((state) => state.items.items);
    console.log("1------------", items);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Digital Products</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('Details', { item })}
                    >
                        {item.photos && item.photos[0] && (
                            <Image
                                source={{ uri: item.photos[0] }}
                                style={styles.image}
                                alt="Product Image"
                            />
                        )}
                        <View style={styles.textContainer}>
                            <View style={styles.titlePriceContainer}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.price}>${item.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

                contentContainerStyle={styles.flatListContent} 
            />
        </View>
    );
};

export default DigitalProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    itemContainer: {
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        overflow: 'hidden', 
    },
    image: {
        width: '100%', 
        height: 200,
    },
    textContainer: {
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        color: 'green',
        marginBottom: 4,
        fontWeight: 'bold', 
    },
    description: {
        fontSize: 14,
        color: '#666', 
    },
    flatListContent: {
        paddingBottom: 16,
    },
    titlePriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginBottom: 4, 
    },

});
