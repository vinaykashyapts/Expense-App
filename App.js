import * as React from 'react';

import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/* Components */
import ExpenseHistory from './src/Components/ExpenseHistory';
import AddExpense from './src/Components/AddExpense';

const Stack = createStackNavigator();

function App() {
  return (
       <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpenseHistory"
            component={ExpenseHistory}
            options={{
              title: 'Expense History',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff'
            }}
            
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpense}
            options={{
              title: 'Add Expense',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
