import { Field, FieldAttributes, Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import * as React from 'react';
import { TextField } from 'formik-mui';
import { useTheme } from '@mui/material/styles';

const requiredMessage = "This field is required";
const emailOrPhoneMessage = "At least one of email address or phone number is required";
const validEmailMessage = "Must be a valid email address";
const validPhoneMessage = "Must be a valid phone number";
const phoneRegex = /^\+?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;  // taken from https://ihateregex.io/expr/phone/

const newsTipSchema = Yup.object().shape({
    firstName: Yup.string().required(requiredMessage),
    lastName: Yup.string().required(requiredMessage),
    tip: Yup.string().required(requiredMessage),
    email: Yup.string().email(validEmailMessage).when('phone', {
      is: (phone: string) => !phone || phone.length === 0,
      then: Yup.string().email(validEmailMessage).required(emailOrPhoneMessage),
      otherwise: Yup.string(),
    }),
    phone: Yup.string().when('email', {
      is: (email: string) => !email || email.length === 0,
      then: Yup.string().matches(phoneRegex, { message: validPhoneMessage }).required(emailOrPhoneMessage),
      otherwise: Yup.string().matches(phoneRegex, { message: validPhoneMessage }),
    }),
  },
  [[ 'email', 'phone' ]]
)

const InputField = ({ name, label, type, required=false, ...otherProps }: FieldAttributes<any>) => {
  return (
    <Field
      name={name}
      label={label}
      type={type}
      required={required}
      size="small"
      margin="normal"
      component={TextField}
      {...otherProps}
    />
  )
}

export default function NewsTipForm() {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        tip: '',
        email: '',
        phone: '',
      }}
      validationSchema={newsTipSchema}
      validateOnMount={true}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="py-4 flex flex-col">
          <InputField name="firstName" label="First name" required/>
          <InputField name="lastName" label="Last name" required/>
          <InputField name="tip" label="News to report" required multiline rows={10}/>

          <InputField name="email" type="email" label="Email address"/>
          <Typography variant="subtitle2" paragraph align="center" mb={-1} className="font-bold">OR</Typography>
          <InputField name="phone" type="tel" label="Phone number"/>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isValid}
            sx={{ my: 2, bgcolor: `${theme.palette.primary.main}!important` }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
