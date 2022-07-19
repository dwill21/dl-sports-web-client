import { Field, Form, Formik } from 'formik';
import { IconButton, Typography } from '@material-tailwind/react';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/md';

interface SearchPaginationFormProps {
  totalHits: number
  className?: string
}

export default function SearchPaginationForm({ className, totalHits }: SearchPaginationFormProps) {
  return (
    <Formik
      initialValues={{
        offset: 0,
        limit: 10
      }}
      onSubmit={console.log}
    >
      {({ values }) => (
        <Form className={`w-full flex justify-end ${className}`}>
          <div className="flex gap-12 items-center">
            <Typography as="div" className="flex items-center gap-x-2 font-normal">
              <label htmlFor="limit">Show:</label>
              <Field as="select" name="limit" className="p-2 rounded shadow">
                {["10", "20", "50"].map((value, index) => (
                  <option key={value} value={value} defaultChecked={index === 0}>
                    {value} rows
                  </option>
                ))}
              </Field>
            </Typography>

            <Typography className="font-normal">
              {values.offset + 1}-{Math.min(values.limit, totalHits)} of {totalHits}
            </Typography>

            <div className="flex items-center gap-x-2">
              {[MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage].map((Icon, index) => (
                <IconButton key={index} variant="text" size="md">
                  <Icon size={24} color="black"/>
                </IconButton>
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
