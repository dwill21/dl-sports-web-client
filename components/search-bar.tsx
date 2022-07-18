import { IconButton, Input } from '@material-tailwind/react';
import { IoCloseSharp, IoSearchSharp } from 'react-icons/io5';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface SearchBarProps {
  closeHandler: () => void
  className?: string
}

const searchBarSchema = Yup.object().shape({
  search: Yup.string().required("We need something to search for"),
})

export default function SearchBar({ closeHandler, className }: SearchBarProps) {
  const SearchButton = ({ disabled }: { disabled: boolean }) => (
    <IconButton type="submit" size="sm" variant="text" className="relative -left-[2px] -top-[5px]" disabled={disabled}>
      <IoSearchSharp size={18}/>
    </IconButton>
  )

  return (
    <div className={`flex items-center ${className}`}>
      <IconButton variant="text" color="grey" onClick={closeHandler}>
        <IoCloseSharp size={24} className="cursor-pointer"/>
      </IconButton>
      <Formik
        initialValues={{search: ''}}
        validationSchema={searchBarSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            <Field
              name="search"
              as={Input}
              type="search"
              label="Search"
              icon={<SearchButton disabled={isSubmitting}/>}
              autoFocus
            />
          </Form>
          )}
      </Formik>
    </div>
  )
}
