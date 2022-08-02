import { InputBase, InputBaseProps } from 'formik-mui';
import SearchIcon from '@mui/icons-material/Search';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Box from '@mui/material/Box';

interface SearchBarProps {
  component?: React.ComponentType<InputBaseProps>
  className?: string
}

export default function SearchBar({ component = InputBase, className }: SearchBarProps) {
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  }
  const handleBlur = () => {
    setFocused(false);
  }

  return (
    <Formik
      initialValues={{searchInput: ''}}
      onSubmit={(values, formikHelpers) => {
        router.push(`/search?q=${values.searchInput}`)
          .then(() => {
            formikHelpers.setSubmitting(false);
            values.searchInput = "";
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={`flex items-center gap-1 ${className}`}>
          <Field
            name="searchInput"
            label="Search"
            type="search"
            size="small"
            variant="standard"
            className="my-0"
          >
            {({ field, form, meta }: FieldProps) => (
              <Box
                className="w-full relative flex items-center rounded bg-white hover:opacity-100"
                border="1px solid black"
                sx={{ opacity: focused ? 1 : 0.95 }}
              >
                <SearchIcon className="ml-2 text-black"/>
                {React.createElement(component, {
                  field,
                  form,
                  meta,
                  placeholder: "Search",
                  className: "py-1 pl-2 pr-2 w-full",
                  disabled: isSubmitting,
                  onFocus: handleFocus,
                  onBlur: handleBlur,
                  sx: { color: 'black' },
                })}
              </Box>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )
}
