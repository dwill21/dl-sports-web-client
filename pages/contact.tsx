import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import client from 'utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from 'utils/graphql-utils';
import { flatten } from 'utils/flatten';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface ContactPageProps {
  contact: {
    body: string
  }
}

const requiredMessage = "This field is required";
const emailOrPhoneMessage = "At least one of email address or phone number is required";
const validEmailMessage = "Must be a valid email address";
const validPhoneMessage = "Must be a valid phone number";
const phoneRegex = /^\+?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;  // taken from https://ihateregex.io/expr/phone/
const wrapError = (message: string) => (
  <Typography variant="small" color="red" className="px-2">{message}</Typography>
)

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

export default function ContactPage({ contact }: ContactPageProps) {
  return (
    <>
      <Typography as="h1" variant="lead" className="py-12 text-center text-2xl">
        Contact Details
      </Typography>
      <div className="pb-12 md:px-16 lg:px-32 flex flex-col md:flex-row justify-center gap-12">
        <div className="w-screen md:w-1/2 h-[500px]">
          <Typography as="h3" variant="lead" className="text-center pb-10">
            Get in touch with Sam Thornton
          </Typography>

          <div className="pt-4 rich-text" dangerouslySetInnerHTML={{ __html: contact.body }}/>
        </div>

        <div className="w-screen md:w-1/2">
          <Typography as="h3" variant="lead" className="text-center">
            News tips?
          </Typography>
          <Typography variant="paragraph" className="text-center">
            Fill one out below!
          </Typography>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              tip: '',
              email: '',
              phone: '',
            }}
            validationSchema={newsTipSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="py-4 flex flex-col">
                <div className="py-2 flex flex-col">
                  <Field
                    name="firstName"
                    type="text"
                    as={Input}
                    label="* First name"
                  />
                  <ErrorMessage name="firstName" render={wrapError}/>
                </div>

                <div className="py-2 flex flex-col">
                  <Field
                    name="lastName"
                    type="text"
                    as={Input}
                    label="* Last name"
                  />
                  <ErrorMessage name="lastName" render={wrapError}/>
                </div>

                <div className="py-2 flex flex-col">
                  <Field
                    name="tip"
                    as={Textarea}
                    label="* News to report"
                    rows="10"
                  />
                  <ErrorMessage name="tip" render={wrapError}/>
                </div>

                <div className="py-2 flex flex-col">
                  <Field
                    name="email"
                    type="email"
                    as={Input}
                    label="Email address"
                  />
                  <ErrorMessage name="email" render={wrapError}/>
                </div>

                <Typography variant="small" className="text-center font-bold">OR</Typography>

                <div className="py-2 flex flex-col">
                  <Field
                    name="phone"
                    type="tel"
                    as={Input}
                    label="Phone number"
                  />
                  <ErrorMessage name="phone" render={wrapError}/>
                </div>

                <Button type="submit" disabled={isSubmitting} className="my-2">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        ${NAVBAR_FRAGMENT}
        query ContactPage {
            contact {
                data {
                    attributes {
                        body
                    }
                }
            }
            ...Navbar
        }
    `
  })

  return {
    props: {
      contact: flatten(data.contact),
      navbar: {
        sports: flatten(data.sports)
      }
    }
  };
}
