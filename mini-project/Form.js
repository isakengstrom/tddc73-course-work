import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';



/*class Form extends React.Component {
    static propTypes = {
      email: PropTypes.string,
      password: PropTypes.string,
    }
    
  componentDidMount(){
    console.log(this.props.fields[0]);
  }*/
const Form = ({ fields }) => {
    
    console.log(fields);
    return(
      <View>
        {fields ? <Text>Hajj Benny</Text> : <Text>Tjo</Text>}
      </View>
        
    );
}

Form.PropTypes = {
  email: PropTypes.bool,
  password: PropTypes.bool,
}


export default Form;