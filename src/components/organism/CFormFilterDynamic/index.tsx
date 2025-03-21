import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { filterFormType } from '@/types';
import { FC } from 'react';
import CCheckboxForms from '../CCheckboxForms';

type FormFilterDynamicProps = {
  formFilter: any;
  onSubmitFilter: (val: any) => Promise<void> | undefined;
  filterForms: filterFormType[];
};

const CFormFilterDynamic: FC<FormFilterDynamicProps> = ({
  formFilter,
  onSubmitFilter,
  filterForms,
}) => {
  return (
    <Form {...formFilter}>
      <form onSubmit={formFilter.handleSubmit(onSubmitFilter)}>
        {filterForms.length > 0 ? (
          filterForms.map((item: filterFormType, i: number) => (
            <CCheckboxForms
              key={i}
              formFilter={formFilter}
              items={item.items}
              label={item.label}
              name={item.name}
            />
          ))
        ) : (
          <div className="text-sm">Data is not available</div>
        )}

        <Button className="mt-5 w-full">Apply Filter</Button>
        <Button
          className="mt-3 w-full"
          variant={'outline'}
          onClick={() => formFilter.reset()}
        >
          Reset Filter
        </Button>
      </form>
    </Form>
  );
};

export default CFormFilterDynamic;
