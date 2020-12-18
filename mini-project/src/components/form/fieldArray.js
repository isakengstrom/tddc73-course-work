
export const customSignUpArray = [
    [
      {
        type: 'text', 
        label: 'First Name', 
        placeholder: 'Bob',
        isRequired: true, 
        maxLength: 20,
      }, 
      {
        type: 'text', 
        label: 'Last Name', 
        placeholder: 'Andersson',
        isRequired: true, 
      },
    ],
    [
      {
        type: 'text', 
        label: 'Username', 
        placeholder: 'bobbyman',
        isRequired: true,
      },
    ],
    [
      {
        type: 'email', 
        label: 'Email', 
        placeholder: 'bob@mail.com',
        isRequired: true,
        keyboardType: 'email-address',
      },
    ],
    [
      {
        type: 'password', 
        label: 'Password', 
        placeholder: 'password',
        isRequired: true,
        validation: true,
        secureTextEntry: true,
      },
    ],
    [
      {
        type: 'passwordConfirmation', 
        label: 'Confirm Password', 
        placeholder: 'password',
        isRequired: true,
        secureTextEntry: true,
      },
    ],
    
  ];