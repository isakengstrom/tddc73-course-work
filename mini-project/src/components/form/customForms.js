
export const customSignUpArray = [
  [
    {
      type: 'text', 
      label: 'First Name', 
      placeholder: 'Bob',
      isRequired: false, 
      maxLength: 20,
    }, 
    {
      type: 'text', 
      label: 'Last Name', 
      placeholder: 'Andersson',
      isRequired: false,
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
      key: 'conf1',
    },
  ],   
  [
    {
      type: 'confirmation', 
      label: 'Confirm Input', 
      placeholder: 'password',
      isRequired: true,
      secureTextEntry: true,
      key: 'conf1',
    },
  ],    
];