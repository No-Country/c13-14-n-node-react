import * as Yup from 'yup'

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'invalidPassword')
    .required('requiredEmail'),
  password: Yup.string()
    .required('requiredPassword')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,10}$/, 'invalidPassword'
    ),
  passwordConfirmation: Yup.string()
    .required('requiredConfirm')
    .oneOf([Yup.ref('password'), null], 'invalidConfirm'),
  profile: Yup.string()
    .matches(/^[a-zA-Z0-9]{5,15}$/, 'invalidProfile')
    .nullable(true)
})

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'invalidPassword')
    .required('requiredEmail'),
  password: Yup.string()
    .required('requiredPassword')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,10}$/, 'invalidPassword'
    )
})
