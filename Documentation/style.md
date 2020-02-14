Style Guide
=====
This is the overall code style guide for JarrowTech projects. Ensure that all contributions follow these style guides or your commit will be rejected until style guidelines have been followed. General style guides are to be applied to code of all types while specific types of style may be required by different languages, frameworks, or platforms. Whenever you are in doubt, follow specific guidelines (such as the guidelines for JavaScript) over the general guidelines, and follow general guidelines over verbal statements.

General Style Guide
----
Follow the general style guides for any style questions that aren't answered by a more specific style category.

### Naming Conventions
- All file names should follow PascalCase.
- All class names should follow PascalCase and be the same as their file name.
- All variable names should follow camelCase.
- All function names should follow camelCase.
- In no situation should whitespace, special characters, or escape characters be used for naming.

### Import Structure
- Wild Card imports are not permitted.
    - Related, all un-necessary imports must be removed.
- Import structure should always be presented in the following order:
    1. Source required imports (i.e. `import 'react-native-gesture-handler';`)
    2. External reference imports (i.e. Firebase)
    3. Library Imports (i.e. React Native components)
    4. Local Files (i.e. `./src/pages/HomePage`)
- Imports may be broken up into visual blocks based upon the order using return characters.
    - Sub-breaks or further sectioning may be used to break up logical separations (e.g. both Firebase and BlockChainAPI must be imported; they may be separated by whitespace to denote their separation.)
    - Sub-breaks may also be made to separate files clustered based sub-directories.

### Const and Setup Location
- `const` statements and other setup actions such as initialization are to come before the default class.

### Spacing and Alignment
- Spaces are to be used, not tabs.
- 4 spaces are used.
    - The easiest thing to do is set your editor to insert tabs instead of spaces and then define the length to be 4 characters long. Your editor should provide documentation on how to do this! If you're looking for a good editor though, Atom is an excellent choice.
- On class declaration, the opening brace goes on the same line as the declaration:
    - `export default class App {`
- On function declaration, the opening brace goes on the same line as the declaration.
- On logic statement declaration, the opening brace goes on the same line as the declaration.
- An `else` or `else if ()` statement goes on the same line as both brackets like `} else {`
- Closing braces should line up with the first character of the line they are opened on.
- Spacing for spaces follows the form of `leftSide = rightSide` where there is a single space directly before and directly after the equals sign.

Javascript Style Guide
----
In the case a statement in this section of the style guide contradicts the General Style Guide, this section is of higher precedent. If a case is not covered in this specific section, follow the General Style Guide.

### Lambda Functions
- Lambda functions are constructed with a space before and after the arrow `() => { ... }`

### Multi-line Returns
- Multi-line returns should see the parentheses follow the same rules as curly braces.

### JSON
- Objects containing only one item may listed either on one line or multiple.
    - `object = { prop: value };`
    - ```
    object = {
        prop: value,
    }
    ```
    - If multiple lines are used, every property must be followed by a comma.
- Names and Values should be separated by a space.
    - `name: value,`

### React Native View
- Paired opening and closing components should share the same indentation length.
- Self closing components should have a space between the name or last property and the closing tag.
    - `<PageName />`
- Properties should not have spaces around the equal sign.
    - `backgroundColor="#FF00AA"`
