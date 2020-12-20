export const defaultFieldProps = [
  {
    type: 'text', 
    label: 'Input',
    placeholder: '',
    isRequired: false,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
  },
  {
    type: 'email', 
    label: 'Email',
    placeholder: 'bob@mail.com',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
  },  
  {
    type: 'emailConfirmation', 
    label: 'Confirm Email',
    placeholder: 'Enter again',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
  },  
  {
    type: 'password', 
    label: 'Password',
    placeholder: '',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: true,
    validation: true,
  },
  {
    type: 'passwordConfirmation', 
    label: 'Confirm Password',
    placeholder: '',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: true,
    validation: null,
  },
   
];

export const defaultForm = [
    [{
        type: 'text', 
        label: 'Username', 
        placeholder: '',
        isRequired: true, 
      }],
    [{
        type: 'email', 
        label: 'Email', 
        placeholder: 'email@email.com',
        isRequired: true, 
      }],
    [{
        type: 'password', 
        label: 'Password', 
        placeholder: '',
        isRequired: true, 
      }],
  ];