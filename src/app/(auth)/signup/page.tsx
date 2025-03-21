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
import { formSignUpSchema } from '@/lib/form-schema';
import { actionSignup } from '@/lib/http';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type TFormData = z.infer<typeof formSignUpSchema>;
const SignupPage = () => {
  const form = useForm<TFormData>({
    resolver: zodResolver(formSignUpSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: actionSignup,
    onSuccess: async () => {
      await toast({
        title: 'Success',
        description: 'Create account success',
      });

      router.push('/signin');
    },
    onError: async () => {
      await toast({
        title: 'Error',
        description: 'Please try again',
      });
    },
  });

  const onSubmit = async (val: TFormData) => {
    const body = {
      email: val.email,
      name: val.name,
      password: val.password,
    };

    await mutation.mutate(body);

    await form.reset();
  };

  return (
    <div>
      <div className="cursor-pointer mb-3">
        <Link href={'/'}>
          <Image src="/images/logo2.png" alt="logo" width={140} height={36} />
        </Link>
      </div>
      <div className="text-3xl text-center font-semibold mb-7">
        Get more opportunities
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
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

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <div className="text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary font-medium">
              Sign In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupPage;
