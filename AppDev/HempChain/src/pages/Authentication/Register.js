import React,{Component} from 'react';
import {Card, Avatar, Icon, Button, Divider, Input } from 'react-native-elements';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class Reg extends Component {
  finishReg(){
    Actions.finish();
  }
  
  render() {
    return (
      <View style={{flex: 1,}}>
      
      <View style={{
        
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
      }}>
      
       <Avatar rounded  size="large" titleStyle = "" source={{uri: 'https://cdn4.iconfinder.com/data/icons/ballicons-2-new-generation-of-flat-icons/100/factory-512.png',}}/>
       <Avatar rounded  size="large" source={{uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-aae9a65dc4b6682999bd250efa231065-farmer.png',}}/>
       <Avatar rounded  size="large" source={{uri: 'https://cdn3.iconfinder.com/data/icons/ecology-energy-1/614/3217_-_Factory-512.png',}}/>
      </View>

      <View style={{
        
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 32,
      }}>
      
       <Avatar rounded  size="large" titleStyle = "" source={{uri: 'https://icons-for-free.com/iconfiles/png/512/crime+justice+law+legal+scales+of+justice+icon-1320190819595310967.png',}}/>
       <Avatar rounded  size="large" source={{uri: 'https://p7.hiclipart.com/preview/277/411/734/computer-icons-cargo-ship-freight-transport-delivery-textile-shipping-circle-icon.jpg',}}/>
       <Avatar rounded  size="large" source={{uri: 'https://dti.delaware.gov/wp-content/themes/dosgic_DTI_theme/img/agencies-icon-dti.png',}}/>
       
      </View>
      <View style={styles.container}>          

          <TextInput style={styles.inputBox}
         placeholder="Enter Full Name"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.opState=input}
         onSubmitEditing={()=>this.name.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Enter Company/Department Name"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.firstName=input}
         onSubmitEditing={()=>this.orgName.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Enter your Operating State"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.lastName=input}
         onSubmitEditing={()=>this.operatingState.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Enter Email Address"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.lastName=input}
         onSubmitEditing={()=>this.adminEmail.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Enter Password"
         selectionColor="#ffffff"
         keyboardType= 'email-address'
         placeholderTextColor="#ffffff"
         ref={(input)=>this.adminEmail=input}
         onSubmitEditing={()=>this.password.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Confirm Password"
         secureTextEntry= {true}
         placeholderTextColor="#ffffff"
         ref={(input)=>this.password=input}
          />
         <TouchableOpacity style={styles.buttonCont} onPress={this.finishReg}>
                  <Text style={styles.buttonText}>
                    Finish Registration
                  </Text>

              </TouchableOpacity>
    </View>
      
      
      </View>
      
      

      
    );
  }
}
const styles= StyleSheet.create({
  container:{
    flexGrow:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#455a64'
  },
  inputBox:{
      width:300,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#ffffff',
      marginVertical: 10,
  },
  button:{
      width:300,
      backgroundColor:'#1c313a',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      alignContent: 'center',
  },
  
  buttonText:{
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff', 
      textAlign: 'center'          
  },
  buttonCont:
  {
      width:300,
      backgroundColor:'#1c313a',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      alignContent: 'center',

  },


});

