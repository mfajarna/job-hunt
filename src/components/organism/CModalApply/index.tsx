'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { formAppySchema } from '@/lib/form-schema';
import { applyJob } from '@/lib/http';
import { supabaseUploadFile } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CUploadFile from '../CUploadFile';

type CModalAppyProps = {
  image: string | undefined;
  roles: string | undefined;
  location: string | undefined;
  jobType: string | undefined;
  id: string | undefined;
};

type TFormSchema = z.infer<typeof formAppySchema>;

const CModalAppy: React.FC<CModalAppyProps> = ({
  image,
  jobType,
  location,
  roles,
  id,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const { data: session } = useSession();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formAppySchema),
  });

  const mutation = useMutation({
    mutationFn: applyJob,
    onSuccess: async () => {
      await toast({
        title: 'Success',
        description: 'Apply job success',
      });

      router.replace('/');
    },
    onError: async () => {
      await toast({
        title: 'Error',
        description: 'Please try again',
      });
    },
  });

  const onSubmit = async (val: TFormSchema) => {
    try {
      const { filename, error } = await supabaseUploadFile(
        val.resume,
        'applicant'
      );

      const reqData = {
        userId: session?.user.id,
        jobId: id,
        resume: filename,
        coverLetter: val.coverLetter,
        linkedIn: val.linkedIn,
        phone: val.phone,
        portfolio: val.portfolio,
        previousJobTitle: val.previousJobTitle,
        isApplied: true,
      };

      if (error) {
        throw 'Error';
      }

      // await fetch('/api/job/apply', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(reqData),
      // });

      // await toast({
      //   title: 'Success',
      //   description: 'Apply job success',
      // });

      // router.replace('/');

      await mutation.mutate(reqData);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Please try again',
      });
    }
  };

  const isLoading = mutation.isPending && !mutation.isSuccess;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg px-12 py-6">
          Apply
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <div>
          <div className="inline-flex items-center gap-4">
            <div>
              <Image src={image!!} alt={image!!} width={60} height={60} />
            </div>
            <div>
              <div className="text-lg font-semibold">{roles}</div>
              <div className="text-gray-500">
                {location} . {jobType}
              </div>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="mb-5">
            <div className="font-semibold text-lg">Submit your application</div>

            <div className="text-gray-500 text-sm mt-2">
              The following is required and will only be shared with Nomad
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name={'fullname'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previousJobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current of previous job title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's your current of previous job title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <h2 className="font-semibold">LINKS</h2>

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Link to your linked URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Link to your portfolio URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a cover letter or anything else you want to share"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CUploadFile form={form} />

              <Button type="submit" className="w-full" disabled={isLoading}>
                Apply
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CModalAppy;
