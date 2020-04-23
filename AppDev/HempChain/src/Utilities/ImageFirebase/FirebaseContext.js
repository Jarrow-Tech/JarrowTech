//All of the Firebase files in htis folders are for the Camera/Image Picker they are what connect to the db

//FirebaseContext

//This file creates the context in which the app iwth communicate with Firebase
import React, { createContext } from 'react'

const FirebaseContext = createContext({})

export const FirebaseProvider = FirebaseContext.Provider

export const FirebaseConsumer = FirebaseContext.Consumer

export const withFirebaseHOC = Component => props => (
  <FirebaseConsumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseConsumer>
)
