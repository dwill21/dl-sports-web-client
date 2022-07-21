import { Form, Formik, useFormikContext } from 'formik';
import { IconButton, Typography } from '@material-tailwind/react';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/md';
import { ChangeEvent, useEffect } from 'react';

interface SearchPaginationFormProps {
  totalHits: number
  className?: string
  handleSearch: (offset?: number, limit?: number) => void
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
  const isDisabled = (index: number) => (index < 2 && values.page === 0) || (index >= 2 && values.page === lastPage);

  return (
    <div className="flex items-center gap-x-2">
      {[MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage].map((Icon, index) => (
        <IconButton key={index} variant="text" size="md" disabled={isDisabled(index)} onClick={() => {
          let newPage = 0;
          if (index === 1) {
            newPage = Math.max(values.page - 1, 0);
          } else if (index === 2) {
            newPage = Math.max(values.page + 1, lastPage);
          } else if (index === 3) {
            newPage = lastPage;
          }

          if (newPage !== values.page) {
            setFieldValue('page', newPage);
          }
        }}>
          <Icon
            size={24}
            color={isDisabled(index) ? 'gray' : 'black'}
          />
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

export default function SearchPaginationForm({ className, totalHits, handleSearch }: SearchPaginationFormProps) {
  return (
    <Formik
      initialValues={{
        page: 0,
        limit: 10
      }}
      onSubmit={(values) => {
        const limit = +values.limit;
        const page = +values.page;
        handleSearch(page * limit, limit);
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
