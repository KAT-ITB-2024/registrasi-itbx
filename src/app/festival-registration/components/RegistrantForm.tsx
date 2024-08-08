import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { registrantSchema } from "./RegistrationForm";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { angkatanEnum, fakultasEnum } from "~/server/db/schema";
import { Button } from "~/components/ui/button";

const RegistrantForm = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof registrantSchema>>;
  onSubmit: () => void;
}) => {
  return (
    <div className="h-fit w-full">
      <h1 className="mb-5 text-center font-mogula text-[48px] text-primary">
        Registrasi Lembaga
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="name"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Nama Pendaftar *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Masukkan Nama Lengkap"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nim"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="nim"
                  className="text-[16px] font-medium text-primary-500"
                >
                  NIM Pendaftar *
                </FormLabel>
                <FormControl>
                  <Input {...field} id="nim" placeholder="Masukkan NIM Prodi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[16px] font-medium text-primary-500">
                    Fakultas *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Fakultas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fakultasEnum.enumValues.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[16px] font-medium text-primary-500">
                    Angkatan *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Angkatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {angkatanEnum.enumValues.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="major"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Program Studi *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="major"
                    placeholder="Masukkan Nama Program Studi (Contoh: Teknik Informatika)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lineId"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="lineId"
                  className="text-[16px] font-medium text-primary-500"
                >
                  ID Line *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="lineId"
                    placeholder="Masukkan ID Line"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="phoneNumber"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Nomor WhatsApp *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="Masukkan Nomor WhatsApp Aktif (Contoh: 081234567890)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-end px-10" type="submit">
            Selanjutnya
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrantForm;
