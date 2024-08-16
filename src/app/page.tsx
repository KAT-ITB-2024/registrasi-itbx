"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  password: z.string().min(1, "Password harus diisi"),
});

export default function Home() {
  // TODO: If already logged in, redirect to booking-booth page
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nim: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[url('/images/pink-background.png')] bg-cover bg-center bg-no-repeat">
      <div className="z-10 flex h-screen w-full max-w-xl items-center md:py-12">
        <div
          className={`flex h-fit max-h-full w-full flex-col items-center justify-center overflow-y-auto rounded-2xl px-10 py-10 ${styles.glassmorphism}`}
        >
          <Image
            src="/images/logo_oskm.svg"
            width={150}
            height={150}
            alt="logo"
          />
          <h1 className="text-5xl font-mogula text-primary my-3">Login</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col space-y-1"
            >
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel
                      htmlFor="nim"
                      className="text-[16px] font-medium text-primary-500"
                    >
                      NIM
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="nim"
                        placeholder="Masukkan NIM"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel
                      htmlFor="password"
                      className="text-[16px] font-medium text-primary-500"
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        placeholder="Masukkan Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-5"/>
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
