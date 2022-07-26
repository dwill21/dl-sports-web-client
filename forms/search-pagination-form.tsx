import { Form, Formik, useFormikContext } from 'formik';
import { IconButton, Typography } from '@material-tailwind/react';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/md';
import { ChangeEvent, useEffect, useMemo } from 'react';

interface SearchPaginationFormProps {
  totalHits: number
  className?: string
  onSubmit: (offset?: number, limit?: number) => void
}

const PageSizeSelector = () => {
  const { handleChange, setFieldValue, values } = useFormikContext<{limit: number}>();

  return (
    <Typography as="div" className="flex items-center gap-x-2 font-normal">
      <label htmlFor="limit">Show:</label>
      <select
        name="limit"
        className="p-2 rounded shadow"
        onChange={(e: ChangeEvent) => {
          handleChange(e);
          setFieldValue('page', 0);
        }}
        value={values.limit}
      >
        {["10", "20", "50"].map((value) => (
          <option key={value} value={value}>
            {value} rows
          </option>
        ))}
      </select>
    </Typography>
  )
}

const RangeDisplay = ({ totalHits }: { totalHits: number }) => {
  const { values } = useFormikContext<{ page: number, limit: number }>();
  const start = values.page * values.limit + 1;
  const end = Math.min((values.page + 1) * values.limit, totalHits);

  return (
    <Typography className="font-normal">
      {start}-{end} of {totalHits}
    </Typography>
  )
}

const PageArrows = ({ totalHits }: { totalHits: number }) => {
  const { setFieldValue, values } = useFormikContext<{ page: number, limit: number }>();
  const lastPage = Math.ceil(totalHits / values.limit) - 1;

  const arrows = [
    {
      Icon: MdFirstPage,
      nextPage: useMemo(() => 0, []),
      disabled: useMemo(() => values.page === 0, [values.page]),
    },
    {
      Icon: MdChevronLeft,
      nextPage: useMemo(() => Math.max(values.page - 1, 0), [values.page]),
      disabled: useMemo(() => values.page === 0, [values.page]),
    },
    {
      Icon: MdChevronRight,
      nextPage: useMemo(() => Math.min(values.page + 1, lastPage), [values.page, lastPage]),
      disabled: useMemo(() => values.page === lastPage, [values.page, lastPage]),
    },
    {
      Icon: MdLastPage,
      nextPage: useMemo(() => lastPage, [lastPage]),
      disabled: useMemo(() => values.page === lastPage, [values.page, lastPage]),
    },
  ]

  return (
    <div className="flex items-center gap-x-2">
      {arrows.map(({Icon, nextPage, disabled}, index) => (
        <IconButton
          key={index}
          variant="text"
          size="md"
          disabled={disabled}
          onClick={() => {
            if (nextPage !== values.page) {
              setFieldValue('page', nextPage);
            }
          }}
        >
          <Icon size={24} color={disabled ? 'gray' : 'black'}/>
        </IconButton>
      ))}
    </div>
  )
}

const AutoUpdate = () => {
  const { values, submitForm } = useFormikContext<{ page: number, limit: number }>();
  useEffect(() => {
    submitForm();
  }, [values, submitForm]);
  return null;
}

export default function SearchPaginationForm({ className, totalHits, onSubmit }: SearchPaginationFormProps) {
  return (
    <Formik
      initialValues={{
        page: 0,
        limit: 10
      }}
      onSubmit={(values) => {
        const limit = +values.limit;
        const page = +values.page;
        onSubmit(page * limit, limit);
      }}
    >
      <Form className={`w-full flex flex-col md:flex-row justify-end items-center gap-y-4 gap-12 ${className}`}>
        <PageSizeSelector/>
        <RangeDisplay totalHits={totalHits}/>
        <PageArrows totalHits={totalHits}/>
        <AutoUpdate/>
      </Form>
    </Formik>
  )
}
