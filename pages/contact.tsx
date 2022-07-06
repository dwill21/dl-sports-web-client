import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import client from '../utils/apollo-client';
import { gql } from '@apollo/client';
import { NAVBAR_FRAGMENT } from '../utils/graphql-utils';
import { flatten } from '../utils/flatten';
import { Field, Form, Formik } from 'formik';

const Error = ({ message }: { message: string }) => {
  return (
    <Typography variant="small" color="red" className="px-2">{message}</Typography>
  )
}

export default function ContactPage() {
  return (
    <>
      <Typography as="h1" variant="lead" className="py-12 text-center text-2xl">
        Contact Details
      </Typography>
      <div className="pb-12 md:px-16 lg:px-32 flex flex-col md:flex-row justify-center gap-y-4 gap-x-12">
        <div className="w-screen md:w-1/2 h-[500px]">
          <Typography as="h3" variant="lead" className="text-center">
            Get in touch with Sam Thornton
          </Typography>
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
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="py-4 flex flex-col">
                <div className="py-2 flex flex-col">
                  <Field
                    name="firstName"
                    type="text"
                    as={Input}
                    label="* First name"
                  />
                  {errors.firstName && touched.firstName ? <Error message={errors.firstName}/> : null}
                </div>

                <div className="py-2 flex flex-col">
                  <Field
                    name="lastName"
                    type="text"
                    as={Input}
                    label="* Last name"
                  />
                  {errors.lastName && touched.lastName ? <Error message={errors.lastName}/> : null}
                </div>

                <div className="py-2 flex flex-col">
                  <Field
                    name="tip"
                    as={Textarea}
                    label="* News to report"
                    rows="10"
                  />
                  {errors.tip && touched.tip ? <Error message={errors.tip}/> : null}
                </div>

                <div className="py-2 flex flex-col">
                  <Field
                    name="email"
                    type="email"
                    as={Input}
                    label="Email address"
                  />
                </div>

                <Typography variant="small" className="text-center font-bold">OR</Typography>

                <div className="py-2 flex flex-col">
                  <Field
                    name="phone"
                    type="tel"
                    as={Input}
                    label="Phone number"
                  />
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
        query NavbarQuery {
            ...Navbar
        }
    `
  })

  return {
    props: {
      navbar: {
        sports: flatten(data.sports)
      }
    }
  };
}
