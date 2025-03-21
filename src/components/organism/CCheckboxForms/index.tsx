import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FC } from 'react';

type CCheckboxForms = {
  formFilter: any;
  items: any[];
  name: string;
  label: string;
};

const CCheckboxForms: FC<CCheckboxForms> = ({
  formFilter,
  items,
  name,
  label,
}) => {
  return (
    <Accordion
      defaultValue={name}
      type="single"
      collapsible
      className="border-none mt-0"
    >
      <AccordionItem value={name}>
        <AccordionTrigger className="font-semibold first:pt-0">
          {label}
        </AccordionTrigger>
        <AccordionContent>
          <FormField
            control={formFilter.control}
            name={name}
            render={() => (
              <FormItem className="space-y-5 text-gray-600 mt-5">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={formFilter.control}
                    name={name}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CCheckboxForms;
