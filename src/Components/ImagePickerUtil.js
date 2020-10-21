import * as React from 'react';
 
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ImagePickerUtil = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = React.useState();

  React.useEffect(() => {
    if (image) {
      console.log("useEffect: " + image);
      setSelectedImage({ uri: image });
    }
  }, [image])

  const pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      response => {
        if (response.error) {
          console.log("image error");
        } else {
          console.log("Image: " + response.uri)
          setSelectedImage({ uri: response.uri });
          onImagePicked({ uri: response.uri });
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
        
      </View>
      <View style={styles.button}>
        <Button title="Attach Image" onPress={pickImageHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
    margin: 20
  },
  button: {
    width: '80%',
    backgroundColor: '#eee'
  },
  previewImage: {
    width: '100%',
    height: '100%',
  }
})

export default ImagePickerUtil;