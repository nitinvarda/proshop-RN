/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store, { persistor } from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const Navigation = () =>{
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

            <NavigationContainer>
                    <App />
            </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Navigation);
