'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { formSignInSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type TFormData = z.infer<typeof formSignInSchema>;

const SigninPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TFormData>({
    resolver: zodResolver(formSignInSchema),
  });
  const onSubmit = async (val: TFormData) => {
    const authenticated = await signIn('credentials', {
      ...val,
      redirect: false,
    });

    if (authenticated?.error) {
      toast({
        title: 'Error',
        description: 'Email or Password maybe wrong',
      });

      return;
    }

    router.push('/');
  };

  return (
    <div>
      <div className="cursor-pointer mb-3">
        <Link href={'/'}>
          <Image src="/images/logo2.png" alt="logo" width={140} height={36} />
        </Link>
      </div>

      <div className="text-3xl text-center font-semibold mb-7">
        Welcome Back, Dude
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Signin
          </Button>

          <div className="text-gray-500 text-sm mt-6">
            Dont have an account? {''}
            <Link href={'/signup'} className="text-primary font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SigninPage;
