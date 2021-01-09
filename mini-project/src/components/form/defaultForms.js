export const defaultFieldProps = {
  text: {
    type: 'text', 
    label: 'Input',
    placeholder: '',
    isRequired: false,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
    value: null,
  },
  email: {
    type: 'email', 
    label: 'Email',
    placeholder: 'bob@mail.com',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: false,
    validation: null,
    key: 'email',
  },  
  password: {
    type: 'password', 
    label: 'Password',
    placeholder: '',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: true,
    validation: true,
    key: 'password',
  },
  confirmation: {
    type: 'confirmation', 
    label: 'Confirm Password',
    placeholder: '',
    isRequired: true,
    maxLength: null,
    keyboardType: null,
    secureTextEntry: true,
    validation: null,
    key: 'password',
  },
   
};

export const defaultForm = [
  [
    {
      type: 'text', 
      label: 'Username', 
      placeholder: '',
      isRequired: true, 
    }
  ],
  [
    {
      type: 'email', 
      label: 'Email', 
      placeholder: 'email@email.com',
      isRequired: true, 
    }
  ],
  [
    {
      type: 'password', 
      label: 'Password', 
      placeholder: '',
      isRequired: true, 
    }
  ],
];