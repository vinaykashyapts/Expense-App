import * as React from 'react';

import {View, SafeAreaView, SectionList, Text, StyleSheet, Image, Modal, TextInput, TouchableOpacity} from 'react-native';
import { ListItem, Avatar} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import firestore from '@react-native-firebase/firestore';

import moment from "moment";

import Item from '../Components/Item';
import ImageModal from '../Components/ImageModal';

const ExpenseHistory = ({navigation}) => {

	const [data, setData] = React.useState('');
	const [originalData, setOriginalData] = React.useState('');
	const [search, setSearch] = React.useState('');
	const [modalVisible, setModalVisible] = React.useState('');
	const [imageUri, setImageUri] = React.useState('');

	React.useEffect(() => {
	        getData();
	  }, []);

	const getData = async () => {
		firestore()
		  .collection('expense')
		  .get()
		  .then(querySnapshot => {
	    	querySnapshot.docs.forEach(doc => {
	    		if (doc.data().date) {
	    			const dateMonth = moment(doc.data().date.toDate()).format("MMM, YYYY");
	    			const dateForDisplay = moment(doc.data().date.toDate()).format("DD MMM YYYY");
	    			doc.data().dateMonth = dateMonth
	    			doc.data().dateForDisplay = dateForDisplay
	    		}
	    	});
			
			let newData = Object.values(querySnapshot.docs.reduce((acc, item) => {

				let doc = item.data()
				
				if(doc.dateMonth) {
					if (!acc[doc.dateMonth]) 
						acc[doc.dateMonth] = {
					        title: doc.dateMonth,
					        data: []
				    	};
				    
 				    acc[doc.dateMonth].title = acc[doc.dateMonth].title
				    acc[doc.dateMonth].data.push(doc);
				    return acc;
				}
			}, {}))

			setData(newData)
			setOriginalData(newData)

		  });
	};

	const onSearch = async (searchTxt) => {

	    setSearch(searchTxt)

	    if(searchTxt === ''){
	    	setData(originalData)
	    	console.log(data);
	    } else {
	 		let result = data.map((element) => {
			  return {...element, data: element.data.filter((d) => d.category.includes(searchTxt) || d.description.includes(searchTxt))}
			})

		 	setData(result)
		 	console.log(result);
	    }
	}
	
	const showImageModal = (item) => {

		if(item.imageUri.length > 0) {
			setModalVisible(!modalVisible)
    		setImageUri(item.imageUri)
		} else {
			alert("No attachment")
		}
  	}

  	const EmptyListMessage = ({item}) => {
    	return (
	      <Text style={styles.emptyListStyle}>
	        No Data Found
	      </Text>
	    );
	  };

return (
	<SafeAreaView style={styles.container}>
		<SectionList
			ListHeaderComponent={
				<TextInput 
			    	blurOnSubmit={false}
			    	placeholder="Search Here..."
			    	onChangeText={searchTxt => onSearch(searchTxt)}
			    	defaultValue={search}
			    	style={styles.search}
			    />
			}
  			sections={data}
  			keyExtractor={(item, index) => item + index}
 			renderItem={({ item }) => 
 			<TouchableOpacity onPress={() => showImageModal(item)}>
 				<Item doc={item}/>
 			</TouchableOpacity>
 			}
  			renderSectionHeader={({ section: { title, data } }) => (
  			<View style={styles.section}>
    			<Text style={styles.sectionTitle}>{title}</Text>
    			<Text style={styles.sectionSubTitle}>{data.length} transaction(s)</Text>
    		</View>
  			)}
  			ListEmptyComponent={EmptyListMessage}
		/>

		<ImageModal 
			display={modalVisible}
			closeDisplay={() => setModalVisible(!modalVisible)}
			imageUri={imageUri}/>
		
		<ActionButton style={styles.add}
			buttonColor="rgba(231,76,60,1)"
			onPress={() => navigation.push('AddExpense')}
		/>
	</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		margin: 6
	},
	add: {
		justifyContent: 'center',
		marginBottom: 24
	},
	search: {
		margin: 6
	},
	item: {
	    padding: 20,
	    marginVertical: 8
	},
	section: {
	  	display: 'flex',
	  	flexWrap: 'nowrap',
	  	flexDirection: 'row',
	  	justifyContent: 'space-between',
	  	alignItems: 'stretch',
	  	alignContent: 'stretch',
	  	padding: 6,
	  	margin: 6
	},
	sectionTitle: {
	    fontSize: 18,
	    fontFamily: 'roboto',
	    fontWeight: "bold",
	    alignContent: 'center',
	    padding: 2
	},
	sectionSubTitle: {
	    fontSize: 18,
	    fontFamily: 'roboto',
	    fontStyle: 'italic',
	    alignContent: 'center',
	    padding: 2
	},
	emptyListStyle: {
    	padding: 10,
    	fontSize: 18,
    	textAlign: 'center'
    }
});

export default ExpenseHistory;