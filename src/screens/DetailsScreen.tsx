import { StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Divider } from '@/components/ui/divider';
import { Button, ButtonText } from '@/components/ui/button';

const { width: screenWidth } = Dimensions.get('window');

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    console.log("test", item);

    return (
        <Box className='bg-white h-full'>
            <Box className="justify-center h-80">
                <VStack space="md" reversed={false}>
                    <Box className="w-full bg-white items-center">
                        <Image
                            source={{ uri: item.photos[0] }}
                            alt="image"
                            style={{ width: screenWidth, height: screenWidth * 0.6 }}
                            resizeMode="cover"
                        />
                        <Box className="mt-1 mb-1 w-full px-4">
                            <VStack space="2xl">
                                <HStack space="md" className="items-center self-start">
                                    <Avatar>
                                        <AvatarFallbackText>SS</AvatarFallbackText>
                                        <AvatarImage
                                            source={{
                                                uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
                                            }}
                                        />
                                    </Avatar>
                                    <VStack className='justify-center'>
                                        <Heading size="sm">Ronald Richards</Heading>
                                    </VStack>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                </VStack>
            </Box>

            <Box className='p-4 bg-white mt-2'>
                <Box className="justify-center bg-white mt-1 box-border border border-black rounded-lg p-4">
                    <VStack space="md" reversed={false}>
                        <Heading>{item.name}</Heading>
                        <Button size="md" variant="solid" action="primary" className='w-1/4'>
                            <ButtonText>${item.price}</ButtonText>
                        </Button>
                        <Text>{item.description}</Text>
                        <Divider className="my-0.5" />
                        <Heading>Additional Features</Heading>

                        {item.additionalDetails.map((detail, index) => (
                            <Text key={index}>
                                {detail.attribute}: {detail.value} : {detail.category}
                            </Text>
                        ))}
                    </VStack>
                </Box>

                <Box className='bg-white mt-4'>
                    <Heading>Benefits</Heading>
                    <Box className="justify-center bg-white mt-1 box-border border border-black rounded-lg p-4">
                        <VStack space="md" reversed={false}>
                            {item.benefits.map((benefit, index) => (
                                <Text key={index}>{benefit}</Text>
                            ))}
                        </VStack>
                    </Box>
                </Box>
            </Box>


            <Box className='p-4 bg-white mt-auto'>
                <Button size="lg" variant="solid" action="primary" className='w-full' style={{ backgroundColor: 'blue' }}>
                    <ButtonText style={{ color: 'white' }}>Buy Now</ButtonText>
                </Button>
            </Box>
        </Box>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
