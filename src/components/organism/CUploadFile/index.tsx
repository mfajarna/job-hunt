import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { formAppySchema } from '@/lib/form-schema';
import React, { ChangeEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

type CUploadFileProps = {
  form: UseFormReturn<z.infer<typeof formAppySchema>>;
};

const CUploadFile: React.FC<CUploadFileProps> = ({ form }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [nameFile, SetNameFile] = React.useState<string>('Attach Resume / CV');

  const handleSelectFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      SetNameFile(e.target.files[0].name);
      form.setValue('resume', e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="font-semibold">Attach your resume</div>
      <div>
        <div>
          <div
            onClick={handleSelectFile}
            className="text-xs text-primary font-semibold p-3 text-center cursor-pointer border-2 border-dashed border-primary"
          >
            {nameFile}
          </div>
        </div>
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default CUploadFile;
