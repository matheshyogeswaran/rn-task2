import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import { ChevronDownIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { updateBenefitsForItem, updateDetailsForItem } from '../redux/slices/itemsSlice';
import { useNavigation } from '@react-navigation/native';
import { Heading } from '@/components/ui/heading';
import { TrashIcon } from 'lucide-react-native';

const AdditionalDetails = ({ route }) => {
  const { newItem } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [inputList, setInputList] = useState([]);
  const [detailsList, setDetailsList] = useState([]);

  const handleAddInput = () => {

    setInputList([...inputList, '']); // Add a new Benefit entry
  };

  const handleAddDetail = () => {
    setDetailsList([
      ...detailsList,
      { attribute: '', value: '', category: '' } // Initial state for each new detail
    ]);
  };

  const handleAddDetails = () => {
    console.log("Dispatching item with ID: test", newItem.id); // Check if this is correct
    dispatch(updateBenefitsForItem({ itemId: newItem.id, benefits: inputList }));
    dispatch(updateDetailsForItem({ itemId: newItem.id, additionalDetails: detailsList }));

    Alert.alert("Item Added", "Your item has been successfully added.");
    navigation.navigate('Home');
  };



  return (
    <Box className="bg-white h-full">

      <HStack space="md" className="flex justify-between mb-8">
        <Box className="bg-white p-5">
          <Heading>Benefits</Heading>
        </Box>
        <Box className="bg-white p-5" onTouchEnd={handleAddInput}>
          <Text style={{ color: "blue", fontWeight: "bold" }}>+ Add</Text>
        </Box>
      </HStack>

      <Box className="justify-start h-80 mb-1 p-3">
        <VStack space="md">
          {inputList.map((input, index) => (
            <Box key={index} className="h-60 w-128">
              <Input variant="outline" size="xl">
                <InputField
                  placeholder="Enter Text here..."
                  value={input}
                  onChangeText={(text) => {
                    const newList = [...inputList];
                    newList[index] = text;
                    setInputList(newList);
                  }}
                />
              </Input>
            </Box>
          ))}
        </VStack>
      </Box>

      <HStack space="md" className="flex justify-between mb-1 mt-1 ">
        <Box className="bg-white p-5">
          <Heading>Additional Details</Heading>
        </Box>
        <Box className="bg-white p-5" onTouchEnd={handleAddDetail}>
          <Text style={{ color: "blue", fontWeight: "bold" }}>+ Add</Text>
        </Box>
      </HStack>

      <Box className="justify-start h-120 mt-1 p-2">
        <VStack space="md">
          {detailsList.map((detail, index) => (
            <Box key={index} className="mb-4 p-2">
              <HStack space="md" className='mb-1'>
                <Input variant="outline" size="xl" className="w-1/2">
                  <InputField
                    placeholder="Attribute"

                    onChangeText={(text) => {
                      const newDetails = [...detailsList];
                      newDetails[index].attribute = text;
                      setDetailsList(newDetails);
                    }}
                  />
                  <InputSlot className="pr-3" onPress={()=>{}}>
                    
                    <InputIcon
                      as={TrashIcon}
                      className="text-darkBlue-500"
                    />
                  </InputSlot>
                </Input>

                <Input variant="outline" size="xl" className="w-1/2">
                  <InputField
                    placeholder="Value"

                    onChangeText={(text) => {
                      const newDetails = [...detailsList];
                      newDetails[index].value = text;
                      setDetailsList(newDetails);
                    }}
                  />
                </Input>
              </HStack>
              <Box className='mt-1'>
                <Select onValueChange={(value) => {
                  const newDetails = [...detailsList];
                  newDetails[index].category = value; // Update the selected category in detailsList
                  setDetailsList(newDetails);
                }}>
                  <SelectTrigger variant="outline" size="xl" className="flex justify-between">
                    <SelectInput
                      placeholder="Select Category"
                      value={detail.category}
                      className="flex-grow"
                    />
                    <SelectIcon className="mr-2" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="UX Research" value="ux" />
                      <SelectItem label="Web Development" value="web" />
                      <SelectItem label="Cross Platform Development" value="cross-platform" />
                      <SelectItem label="UI Designing" value="ui" isDisabled />
                      <SelectItem label="Backend Development" value="backend" />
                    </SelectContent>
                  </SelectPortal>

                </Select>

              </Box>
            </Box>
          ))}
        </VStack>

        <Button size="lg" variant="solid" onPress={handleAddDetails} style={{ backgroundColor: 'blue' }}>
          <ButtonText>Next</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default AdditionalDetails;

const styles = StyleSheet.create({});
