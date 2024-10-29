import React from 'react';
import "./global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Pressable } from './components/ui/pressable';
import { Button, ButtonText } from './components/ui/button';
import { Input, InputField } from './components/ui/input';
import { Textarea, TextareaInput } from './components/ui/textarea';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import About from './src/screens/About';
import AdditionalDetails from './src/screens/AdditionalDetails';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import DigitalProducts from './src/screens/DigitalProducts';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider mode="light">
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="About" component={About} options={{ headerShown: true }} />
            <Stack.Screen name="Details" component={DetailsScreen}  />
            <Stack.Screen name="AdditionalDetails" component={AdditionalDetails} options={{ headerShown: true }} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Digital" component={DigitalProducts} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flexGrow: 1,
  },
  inputContainer: {
    marginTop: 25,
  },
  textareaContainer: {
    marginTop: 25,
  },
  coverPhotoText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
  photoContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  photoBox: {
    width: 80,
    height: 80,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  photoText: {
    fontSize: 24,
    color: '#007aff',
  },
  buttonContainer: {
    marginTop: 25,
    paddingBottom: 25, // Optional: Space from bottom
  },
  buttonWrapper: {
    marginTop: 25,
  },
});

export default App;
