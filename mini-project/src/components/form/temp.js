{props.password 
    ? <View>
        <Text style={styles.instructionText}>Password:</Text>
        <TextInput 
          style={styles.textInput} 
          value={state.password} 
          secureTextEntry={true}
          onChangeText={(text) => updateState('password', text)}
        /> 
        {props.passwordvalidator ? 
          <PasswordValidator password={state.password}/> : null}
        <Text style={styles.instructionText}>Confirm password:</Text>
        <TextInput 
          style={styles.textInput} 
          value={state.password2} 
          secureTextEntry={true}
          onChangeText={(text) => updateState('password2', text)}
        /> 
        <Text style={styles.nomatchText}>
          {(state.password.length == 0) ? '' 
          : (state.password != state.password2) ? "Passwords don't match :(" 
          : "It's a match!"}
        </Text>
      </View>
    : <View/>
  }