
export default fieldArray = [
    [
      {
        type: 'input', 
        label: 'First Name', 
        placeholder: 'Bob',
        isRequired: true, 
        maxLength: 20,
      }, 
      {
        type: 'input', 
        label: 'Last Name', 
        placeholder: 'Andersson',
        isRequired: true, 
      },
    ],
    [
      {
        type: 'input-username', 
        label: 'Username', 
        placeholder: 'bobbyman',
        isRequired: true,
      },
    ],
    [
      {
        type: 'input-password', 
        label: 'Password', 
        placeholder: 'password',
        isRequired: true,
        validation: true,
        secureTextEntry: true,
        key: 'aab', 
      },
    ],
    [
      {
        type: 'input-confirmation', 
        label: 'Confirm Password', 
        placeholder: 'password',
        isRequired: true,
        secureTextEntry: true,
        key: 'aab', 
      },
    ],
    
  ];