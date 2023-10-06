/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Navigation = () =>{
    return (
        <Provider store={store}>
            <NavigationContainer>
                    <App />
            </NavigationContainer>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Navigation);
