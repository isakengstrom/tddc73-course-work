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