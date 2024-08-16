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
import { getCsrfToken, signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  password: z.string().min(1, "Password harus diisi"),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nim: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast("toast");
    try {
      setIsLoading(true);
      toast.loading("Loading...", {
        id: toastId,
      });
      const { nim, password } = values;
      const csrfToken = await getCsrfToken();

      const res = await signIn("credentials", {
        nim,
        password,
        csrfToken,
        redirect: false,
        callbackUrl: "/login",
      });

      if (!res?.error) {
        toast.success("Logged in successfully!", {
          id: toastId,
        });
        router.push("/booking-booth");
      } else {
        toast.error("Invalid Username or Password", {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Login Failed", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex h-fit max-h-full w-full flex-col items-center justify-center overflow-y-auto rounded-2xl px-10 py-10 ${styles.glassmorphism}`}
    >
      <Image src="/images/logo_oskm.svg" width={150} height={150} alt="logo" />
      <h1 className="my-3 font-mogula text-5xl text-primary">Login</h1>
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
                  <Input {...field} id="nim" placeholder="Masukkan NIM" />
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
          <div className="h-5" />
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
