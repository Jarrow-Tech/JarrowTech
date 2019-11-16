
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
const mapStateToProps=(state)=>{
  return{
    favoriteAnimal: state.favoriteAnimal,
    personData: state.personData

  };
}
//does the same as teh above but dispatches the actions
//created in the redux action
const mapDispatchToProps =(dispatch)=>{
  return{
      setFavoriteAnimal: (text)=>{dispatch(setFavoriteAnimal(text))},
      watchPersonData: ()=> {dispatch(watchPersonData())},
  };
}



class TestScreen extends Component{
    


constructor(props){
    super(props);
    this.state ={
        favoriteAnimal: this.props.favoriteAnimal
    }

    this.props.watchPersonData();

}


onSetFavoriteAnimalPress= ()=>{
    this.props.setFavoriteAnimal(this.state.favoriteAnimal);

}


    render(){
      return(
        <View style={styles.container}>
    <Text>{this.props.favoriteAnimal}</Text>
    <TextInput style={{borderWidth:1, width: 200, height:40}}
    value={this.state.favoriteAnimal}
    onChangeText={(text)=> {this.setState({favoriteAnimal: text})}}/>
    <Button title="Set Favorite Animal" onPress={this.onSetFavoriteAnimalPress}/>

      <Text>{this.props.personData.firstName}</Text>
      <Text>{this.props.personData.lastName}</Text>

            
                


                
            
        </View>
      );
    }
    
    }


    const styles= StyleSheet.create({
        container:{
          backgroundColor:'#455a64',
          flexGrow:1,
          alignItems:'center',
          justifyContent:'center'    
        },
        signupTextCont:{
          flexGrow:1,
          alignItems:'flex-end',
          justifyContent:'center',
          paddingVertical: 16,
          flexDirection: 'row',
        },
        signupText:{
            color:'rgba(255, 255, 255, 0.6)',
            fontSize: 16

        },
        signupButton:{
            color:'#ffffff',
            fontSize: 16,
            fontWeight:'500'
        },
      });

      export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);
      
      