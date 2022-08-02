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
                border="2px solid #65E1FF"
                sx={{
                  opacity: focused ? 1 : 0.95,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    border: '1px solid black',
                    borderRadius: '0.15rem',
                  },
                }}
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
