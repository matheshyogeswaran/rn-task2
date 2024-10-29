import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert, Image } from 'react-native';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/itemsSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';

const AddItemScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photos, setPhotos] = useState([]);

    // Handle adding the item
    const handleAddItem = () => {
        if (name && description && price) {
            const newItem = {
                id: Date.now().toString(),
                name,
                description,
                price,
                photos,
                benefits: [],
                additionalDetails: []
            };
            dispatch(addItem(newItem));
            console.log("New Item", newItem.id);
            navigation.navigate('AdditionalDetails', { newItem: newItem });

        } else {
            Alert.alert("Error", "Please fill all the fields.");
        }
    };

    // Handle photo addition
    const handleAddPhoto = () => {
        if (photos.length >= 3) {
            Alert.alert("Limit Reached", "You can only upload up to 3 photos.");
            return;
        }
        // Options for image picker
        const options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.7,
        };

        Alert.alert(
            "Add Photo",
            "Choose a photo from your library or take a new one.",
            [
                { text: "Camera", onPress: () => openCamera(options) },
                { text: "Gallery", onPress: () => openGallery(options) },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const openCamera = (options) => {
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log("User canceled image picker");
            } else if (response.errorCode) {
                Alert.alert("Error", response.errorMessage || "Failed to open camera.");
            } else {
                const uri = response.assets[0].uri;
                setPhotos([...photos, uri]);
            }
        });
    };

    const openGallery = (options) => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User canceled image picker");
            } else if (response.errorCode) {
                Alert.alert("Error", response.errorMessage || "Failed to open gallery.");
            } else {
                const uri = response.assets[0].uri;
                setPhotos([...photos, uri]);
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Box className='bg-white flex-1'>
            <VStack space="md" className='mt-1 flex-grow'>
                <Box className="w-full h-20 p-3 mt-2">
                    <Input variant="outline" size="xl">
                        <InputField
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </Input>
                </Box>
                <Box className="w-full p-3">
                    <Textarea size="md">
                        <TextareaInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </Textarea>
                </Box>
                <Heading className='pt-2 ml-2'>Cover Photos (Upload up to 5 photos)</Heading>
                <Box style={styles.photoContainer} className='ml-3'>
                    {photos.map((uri, index) => (
                        <Image
                            key={index}
                            source={{ uri }}
                            style={styles.photoBox}
                        />
                    ))}
                    {photos.length < 5 && (
                        <Pressable
                            style={styles.photoBox}
                            onPress={handleAddPhoto}
                        >
                            <Text style={styles.photoText}>+</Text>
                        </Pressable>
                    )}
                </Box>
                <Heading className='pt-3 ml-4'>Price</Heading>
                <Box className="w-full p-3 mt-2 h-20 ">
                    <Input variant="outline" size="xl">
                        <InputField
                            placeholder="$0.00"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                        />
                    </Input>
                </Box>
            </VStack>
            <Box className="w-full p-3 mb-2 h-20 ">
                <Button size="lg" variant="solid" onPress={handleAddItem} style={{ backgroundColor: 'blue' }}>
                    <ButtonText>Next</ButtonText>
                </Button>
            </Box>
        </Box>
    </SafeAreaView>
);
};


export default AddItemScreen;

const styles = StyleSheet.create({
    photoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    photoBox: {
        width: 110,
        height: 110,
        backgroundColor: '#eaeaea',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 8,
    },
    photoText: {
        fontSize: 24,
        color: '#007aff',
    },
});
