import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';

type TCFormSearchDynamic = {
  formFilter: any;
  onSubmitFilter: (val: any) => Promise<void> | undefined;
};

const CFormSearchDynamic: React.FC<TCFormSearchDynamic> = ({
  formFilter,
  onSubmitFilter,
}) => {
  return (
    <Form {...formFilter}>
      <form onSubmit={formFilter.handleSubmit(onSubmitFilter)}>
        {' '}
        <div className="mx-auto w-max">
          <div className="shadow-md bg-background px-4 py-2 inline-flex items-center gap-4 relative w-max z-10 rounded-sm text-center">
            <div className="inline-flex gap-3 items-center">
              <AiOutlineSearch className="w-6 h-6" />

              <FormField
                name={'roles'}
                control={formFilter.control}
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <Input
                        className="py-5 w-[350px] border-none"
                        placeholder="Job title or keyword"
                        {...field}
                      />
                    </FormItem>
                  </FormControl>
                )}
              />
            </div>

            <div className="inline-flex gap-3 items-center">
              <HiOutlineLocationMarker className="w-6 h-6" />

              <Select>
                <SelectTrigger className="w-[360px] border-none text-gray-500 outline-none py-8">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={'indonesia'}>Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button>Search</Button>
            </div>
          </div>

          <div className="text-muted-foreground mt-3">
            Popular : UI Designer, UX Researcher, Software Engineer
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CFormSearchDynamic;
