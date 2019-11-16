
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';


//Initial State
// this is a data strucutre that represents the initaila state of the application
// whatever we want in our application we will add here

const initialState ={
    favoriteAnimal: "duck",
    personData: { },

};
//
//Reducer
// specifices how the stae is changed based on various actions
// takes an actions and manipulates the state based on the action
//

const reducer=(state= initialState,action)=>{
    switch(action.type){
        case "setFavoriteAnimal": return {...state,favoriteAnimal: action.value};
        case "setPersonData": return{...state,personData: action.value};

        default: return state;
    }
};

//
//Store
//

const store=createStore(reducer,applyMiddleware(thunkMiddleware));
export {store};

//
//Action creators..
// these are fucnctions that create actions (different from route actions )

const setFavoriteAnimal= (favoriteAnimal)=>{
    return{
        type: "setFavoriteAnimal",
        value: favoriteAnimal,

    };
}

const setPersonData =(personData)=>{
    return{
        type: "setPersonData",
        value: personData

    };
}

const watchPersonData= () =>{
    return function(dispatch){

        firebase.database().ref("person").on("value",function(snapshot){

            var personData = snapshot.val();
            dispatch(setPersonData(personData));




        }, function(error){

        });

    };
}

export {setFavoriteAnimal, setPersonData, watchPersonData};






