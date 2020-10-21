import * as React from 'react';

import {View, Button, Modal, Image, TouchableHighlight, StyleSheet} from 'react-native';

const ImageModal = ( props ) => (

<View style={styles.container} >
	<Modal animationType={"slide"} transparent={false}
    visible={props.display}
    onRequestClose={() => { console.log("Modal has been closed.") }}>

    <View style={styles.modal}>
      <Image
        style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
        source={{ uri: props.imageUri }}
      />

      <TouchableHighlight style={styles.touchableButton}>
        <Button 
          title = 'close'
          onPress = { () => props.closeDisplay() } 
           />
      </TouchableHighlight>
    </View>
  </Modal>
  </View>
);

export default ImageModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20
    },
    modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f0f0f5',
      justifyContent: 'center',
      padding : 10,
    },
    text: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
    },
    touchableButton: {
      width: '100%',
      padding: 10,
      marginBottom: 10,
      marginTop: 30,
    },
  });