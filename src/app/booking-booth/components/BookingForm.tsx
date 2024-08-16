"use client";

import { useState } from "react";
import SuccessModal from "~/components/SuccessModal";
import styles from "./styles.module.css";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertModal from "~/components/AlertModal";
import { toast } from "sonner";
import { BoothType } from "../page";
import { api } from "~/trpc/react";
import { signOut } from "next-auth/react";

const formSchema = z.object({
  boothCode: z.string().min(1, "Kode Booth harus diisi"),
});

const BookingForm = ({
  availableBooths,
  instanceName,
  instanceType,
  selectedBooth,
}: {
  availableBooths: BoothType[];
  instanceName: string;
  instanceType: string;
  selectedBooth?: string;
}) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const boothMutation = api.booth.registerLembagaBooth.useMutation();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boothCode: "",
    },
  });

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const onSubmit = async () => {
    const toastId = toast("toast");
    try {
      setIsLoading(true);
      toast.loading("Loading...", {
        id: toastId,
      });

      const formValues = form.getValues();

      await boothMutation.mutateAsync({
        boothId: formValues.boothCode,
      });

      toast.dismiss(toastId);
      setIsSuccessModalOpen(true);
    } catch (error) {
      toast.error("Gagal mendaftar, silahkan coba lagi", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
      setIsAlertOpen(false);
    }
  };

  const handleReset = () => {
    form.reset();
    router.refresh();
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="z-10 flex h-screen w-full max-w-xl items-center md:py-12">
      <div
        className={`flex h-fit max-h-full w-full justify-center overflow-y-auto rounded-2xl px-10 py-10 ${styles.glassmorphism}`}
      >
        <div className="h-fit w-full">
          <h1 className="text-center font-mogula text-4xl text-primary">
            Booking Booth ITB-x
          </h1>
          <div className="my-5 flex w-full flex-col rounded-lg bg-[#ffc4de] px-6 py-5 font-medium text-primary-500">
            <div className="grid w-full grid-cols-[2fr_3fr] gap-y-4">
              <h2 className="font-bold">Nama Lembaga</h2>
              <p>{instanceName}</p>
              <h2 className="font-bold">Kategori Lembaga</h2>
              <p>{instanceType}</p>
              {selectedBooth && (
                <>
                  <h2 className="font-bold">Nomor Booth</h2>
                  <p>{selectedBooth}</p>
                </>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="ml-auto mt-3 rounded-md bg-primary-500 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
          <div className="my-5 w-full">
            <p className="text-primary">
              Layout Booth (klik{" "}
              <Link
                href={"google.com"}
                target="_blank"
                className="font-semibold underline"
              >
                link
              </Link>{" "}
              berikut untuk gambar yang lebih jelas)
            </p>
            <div className="relative aspect-[16/9] w-full bg-blue-100">
              <Image
                src="/images/booth_layout.png"
                alt="layout"
                fill
                objectFit="cover"
                className="h-full w-full"
              />
            </div>
          </div>
          {!selectedBooth && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAlertOpen)}
                className="flex w-full flex-col space-y-1"
              >
                <FormField
                  control={form.control}
                  name="boothCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px] font-medium text-primary-500">
                        Pilih Nomor Booth *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Booth" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableBooths.map((booth) => (
                            <SelectItem key={booth.id} value={booth.id}>
                              {booth.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="h-5" />
                <Button type="submit">Daftar</Button>
              </form>
            </Form>
          )}
        </div>
      </div>

      <AlertModal
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        handleAction={onSubmit}
        isLoading={isLoading}
      />

      <SuccessModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        onClose={handleReset}
        description="Terima kasih telah mendaftar booth ITB-x, silahkan tunggu konfirmasi selanjutnya"
      />
    </div>
  );
};

export default BookingForm;
