//This file gets the posts and sends it to Firebase

//FirebaseImageStore
import firebase from 'react-native-firebase'
import{
    View,
    Button,
    TouchOpacity,
    Image,
    Platform,
    TouchableOpacity,
    Text,

} from 'react-native'

const FirebaseImageStorage = {
  

    getPosts: () => {
      return firebase
        .firestore()
        .collection('COA Images')
        .get()
        .then(function(querySnapshot) {
          let posts = querySnapshot.docs.map(doc => doc.data())
          // console.log(posts)
          return posts
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error)
        })
    }
  }

export default FirebaseImageStorage