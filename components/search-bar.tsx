import { IconButton, Input } from '@material-tailwind/react';
import { IoSearchSharp } from 'react-icons/io5';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

interface SearchBarProps {
  autoFocus?: boolean
  className?: string
}

const searchBarSchema = Yup.object().shape({
  searchInput: Yup.string().required("We need something to search for"),
})

export default function SearchBar({ autoFocus = false, className }: SearchBarProps) {
  const router = useRouter();

  const SearchButton = ({ disabled }: { disabled: boolean }) => (
    <IconButton type="submit" size="sm" variant="text" className="relative -left-[2px] -top-[5px]" disabled={disabled}>
      <IoSearchSharp size={18}/>
    </IconButton>
  )

  return (
    <Formik
      initialValues={{searchInput: ''}}
      validationSchema={searchBarSchema}
      onSubmit={(values, formikHelpers) => {
        router.push(`/search?q=${values.searchInput}`);
        formikHelpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={`w-full ${className}`}>
          <Field
            name="searchInput"
            as={Input}
            type="search"
            label="Search"
            icon={<SearchButton disabled={isSubmitting}/>}
            autoFocus={autoFocus}
          />
        </Form>
      )}
    </Formik>
  )
}
