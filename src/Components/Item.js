import * as React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import { ListItem, Avatar} from 'react-native-elements';

const Item = ({ doc }) => (

	<ListItem style={styles.sectionItem} >
      
      <ListItem.Content>
        
        <View style={styles.content}>
          <Text style={styles.amount}>${doc.amount}</Text>
          
          <Text style={styles.date}>{doc.dateForDisplay}</Text>
        </View>
        <Text style={styles.category}>{doc.category}</Text>
        <View>
          <Text style={styles.description}>{doc.description}</Text>
        </View>
      </ListItem.Content>
      <Avatar size="large" source={{ uri: doc.imageUri }} />
    </ListItem>
);

export default Item;

const styles = StyleSheet.create({

  sectionItem: {
      margin: 6,
      backgroundColor: '#ddd',
  },
  content: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      alignContent: 'stretch'
  },
  amount: {
      flex:1,
      fontSize: 14,
      fontFamily: 'roboto',
      fontWeight: "bold",
      alignContent: 'center'
  },
  category: {
      flex:1,
      fontSize: 14,
      fontFamily: 'roboto',
      fontStyle: 'italic',
      alignContent: 'center',
      color: '#999999'
  },
  date: {
      flex:1,
      fontSize: 14,
      fontFamily: 'roboto',
      fontStyle: 'italic',
      alignContent: 'center'
  },
  description: {
      fontSize: 14,
      fontFamily: 'roboto',
      fontStyle: 'italic',
      alignContent: 'center'
  }
});