import { Field, FieldAttributes, Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import * as React from 'react';
import { TextField } from 'formik-mui';
import { useTheme } from '@mui/material/styles';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useEmail } from 'utils/hooks/use-email';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
  const buttonColors = {
    bgcolor: `${theme.palette.primary.main}!important`,
    color: `${theme.palette.text.primary}!important`,
  }
  const defaultButtonSx = { my: 2 };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { sendEmail } = useEmail();
  const snackbarAction = (snackbarId: SnackbarKey) => (
    <IconButton onClick={() => {
      closeSnackbar(snackbarId)
    }}>
      <CloseIcon/>
    </IconButton>
  )

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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendEmail({
          from_name: `${values.firstName} ${values.lastName}`,
          tip: values.tip,
          contact: [values.email, values.phone].filter(e => !!e).join(", "),
        })
          .then(() => {
            enqueueSnackbar('Thanks for your tip!', { variant: 'success', action: snackbarAction });
          })
          .catch(() => {
            enqueueSnackbar('Uh oh! We didn\'t receive your tip!', { variant: 'error', action: snackbarAction });
          })
          .finally(() => {
            resetForm();
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Box position="relative">
          <Form className={`py-4 flex flex-col${isSubmitting ? ' blur-sm' : ''}`}>
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
              sx={(!isSubmitting && isValid) ? { ...buttonColors, ...defaultButtonSx} : defaultButtonSx}
            >
              Submit
            </Button>
          </Form>

          {isSubmitting && (
            <Box sx={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}>
              <CircularProgress size={48}/>
            </Box>
          )}
        </Box>
      )}
    </Formik>
  )
}
