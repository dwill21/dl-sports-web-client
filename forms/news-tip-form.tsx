import { ErrorMessage, Field, FieldAttributes, Form, Formik, useFormikContext } from 'formik';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import * as Yup from 'yup';
import * as React from 'react';

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

const InputField = ({ as = Input, ...props }: FieldAttributes<any>) => {
  const { errors, touched } = useFormikContext<{ [key: string]: never }>();

  return (
    <div className="py-2 flex flex-col">
      <Field as={as} {...props} error={errors[props.name] && touched[props.name]}/>
      <ErrorMessage name={props.name}>
        {message => (
            <Typography variant="small" color="red" className="px-2">{message}</Typography>
        )}
      </ErrorMessage>
    </div>
  )
}

export default function NewsTipForm() {
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
          <InputField name="firstName" label="* First name"/>
          <InputField name="lastName" label="* Last name"/>
          <InputField name="tip" label="* News to report" as={Textarea} rows="10"/>

          <InputField name="email" type="email" label="Email address"/>
          <Typography variant="small" className="text-center font-bold">OR</Typography>
          <InputField name="phone" type="tel" label="Phone number"/>

          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            color={isSubmitting || !isValid ? 'grey' : 'blue'}
            className="my-2"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
