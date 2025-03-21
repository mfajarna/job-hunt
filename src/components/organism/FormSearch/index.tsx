import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';

import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const CFormSearch = () => {
  return (
    <>
      <div className="mt-6 shadow-md bg-background px-4 py-3 inline-flex items-center gap-4 relative lg:w-max z-10 rounded-sm">
        <div className="inline-flex gap-3 items-center">
          <AiOutlineSearch className="w-6 h-6" />

          <Input
            className="py-88 w-[300px] border-none"
            placeholder="Job title or keyword"
          />
        </div>

        <div className="inline-flex gap-3 items-center">
          <HiOutlineLocationMarker className="w-6 h-6" />

          <Select>
            <SelectTrigger className="w-[300px] border-none text-gray-500 outline-none py-8">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>

            <SelectContent className="py-2">
              <SelectItem value={'indonesia'}>Indonesia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button className="p-7 text-sm">Search my job</Button>
        </div>
      </div>

      <div className="text-muted-foreground mt-4">
        Popular :{' '}
        <div className="inline-flex gap-3">
          <Badge variant={'default'}>UI / UX</Badge>
          <Badge variant={'default'}>Designer</Badge>
          <Badge variant={'default'}>FrontEnd Developer</Badge>
        </div>
      </div>
    </>
  );
};

export default CFormSearch;
