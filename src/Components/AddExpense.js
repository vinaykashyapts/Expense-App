import * as React from 'react';

import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { v4 as uuidv4 } from 'uuid';

import ImagePickerUtil from '../Components/ImagePickerUtil';

const AddExpense = ({navigation}) => {

	const [id, setId] = React.useState('');
	const [amount, setAmount] = React.useState('');
	const [category, setCategory] = React.useState('');
  	const [description, setDescription] = React.useState('');
  	const [date, setDate] = React.useState('');
  	const [imageUri, setImageUri] = React.useState('');

	const onSubmit = async () => {

		if (!amount || !category || !description) {
		   return alert('Please fill all fields');
		}

		// check image, if exists upload & save expense with image ref
		if(imageUri) {
			let url = '';
			var uuid = uuidv4();
			const fileExtension = imageUri.split('.').pop();
			const fileName = `${uuid}.${fileExtension}`;
		 

		   var storageRef = storage().ref(`expense/images/${fileName}`);

		 	const task = storageRef.putFile(imageUri)

		 	task.on('state_changed', taskSnapshot => {
					console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
			});

			task.then(() => {
					console.log('Image uploaded to the bucket!');

					url = storageRef.getDownloadURL()
					.then((downloadUrl) => {
		           console.log('Image URL : ', downloadUrl);
		           url = downloadUrl;
		           saveExpense(url)
		        })
					
			});
		} 
		// if no image, save expense
		else {
			saveExpense('')
		}
	};

	const saveExpense = async (file) => {
		var uuid = uuidv4();

		firestore()
				.collection('expense')
				.add({
					id: uuid,
			 		amount: amount,
			 		category: category,
			 		description: description,
			 		date: firestore.FieldValue.serverTimestamp(),
			 		imageUri: file
				})
				.then(() => {
		 			console.log('Expense added!');
		 			navigation.goBack()
				});
	}

	const setExpenseImage = (image) => {
      setImageUri(image.uri);
  	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				
				<Input
					keyboardType={'number-pad'}
					placeholder='Amount'
					onChangeText={amount => setAmount(amount)}
					maxLength={5}
				/>
				<Input
					placeholder='Category'
					onChangeText={category => setCategory(category)}
					maxLength={10}
				/>
				<Input
					placeholder='Description'
					onChangeText={description => setDescription(description)}
					maxLength={100}
				/>

				<ImagePickerUtil image={imageUri} onImagePicked={setExpenseImage} />

				<View style={styles.add}>
					<Button
						title="Add"
						onPress={onSubmit}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
		);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 6,
	},
	add: {
		margin: 36
	}
});

export default AddExpense;