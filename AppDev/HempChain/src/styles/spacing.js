// the style collection for all spacing/containers

export const container = {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
};

export const colorContainer = {
    backgroundColor: '#455a64',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
};

export const buttonContainer = {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    alignContent: 'center'
};

export const logoContainer = {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
};

export const signupTextContainer = {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'ios' ? 55 : 26,
    flexDirection: 'row'
};

export const imageContainer ={
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    height: 150
};
