//This test screen is for messing around with really anything, so feel free to delete, add, change what ever you want in here
// NO harm will be done to the app if this page is changed.
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';

import {connect} from 'react-redux';
import {setFavoriteAnimal, watchPersonData} from './../redux/Appredux';

//takes the current state of teh redux store
//and sets any of the properties that you want
const mapStateToProps=(state) => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    personData: state.personData
  };
}
//does the same as teh above but dispatches the actions
//created in the redux action
const mapDispatchToProps =(dispatch) => {
  return {
    setFavoriteAnimal: (text)=>{dispatch(setFavoriteAnimal(text))},
    watchPersonData: ()=> {dispatch(watchPersonData())},
  };
}

class TestScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteAnimal: this.props.favoriteAnimal
    }
    this.props.watchPersonData();
  }

  onSetFavoriteAnimalPress = () => {
    this.props.setFavoriteAnimal(this.state.favoriteAnimal);
  }


  render() {
    return(
      <View style={styles.container}>
      <Prompt
        visible={this.state.visible}
        title="Please Enter Badge Number"
        placeholder="Badge Number"
        onCancel={() =>
          this.setState({
            visible: !this.state.visible
          })
        }
        onSubmit={text =>
          this.setState({
            text: "Badge Number submitted",
            visible: !this.state.visible,
            badgeID: text,
          })
        }/>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    backgroundColor:'#455a64',
    flexGrow:1,
    alignItems:'center',
    justifyContent:'center'
  },
  signupTextCont: {
    flexGrow:1,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingVertical:16,
    flexDirection: 'row',
  },
  signupText: {
      color:'rgba(255, 255, 255, 0.6)',
      fontSize:16

  },
  signupButton: {
      color:'#ffffff',
      fontSize:16,
      fontWeight:'500'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);
