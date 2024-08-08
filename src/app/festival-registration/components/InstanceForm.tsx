import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { instanceSchema } from "./RegistrationForm";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { secondPartyContactAppEnum } from "~/server/db/schema";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

const InstanceForm = ({
  form,
  onSubmit,
  handleBack,
}: {
  form: UseFormReturn<z.infer<typeof instanceSchema>>;
  onSubmit: () => void;
  handleBack: () => void;
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-medium text-primary-500">
                  Kategori Lembaga *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Lembaga" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Lembaga 1">
                      Lembaga 1: UKM dan BSO (di bawah kabinet)
                    </SelectItem>
                    <SelectItem value="Lembaga 2">
                      Lembaga 2: HMPS, BSO HMPS, KM ITB, Keresidenan
                      Multikampus, KKN ITB
                    </SelectItem>
                    <SelectItem value="Lembaga 3">
                      Eksternal: Organisasi Intrakampus, Student Chapter, dll
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instanceName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="instanceName"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Nama Lembaga *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="instanceName"
                    placeholder="Masukkan Nama Lembaga"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondPartyName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="secondPartyName"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Nama Pihak Kedua *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="secondPartyName"
                    placeholder="Masukkan Nama Pihak Kedua"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondPartyNim"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="secondPartyNim"
                  className="text-[16px] font-medium text-primary-500"
                >
                  NIM Pihak Kedua *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="secondPartyNim"
                    placeholder="Masukkan NIM Pihak Kedua"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-1">
            <FormLabel className="text-[16px] font-medium text-primary-500">
              Kontak Pihak Kedua *
            </FormLabel>
            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="secondPartyContactType"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kontak" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {secondPartyContactAppEnum.enumValues.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
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
                name="secondPartyContact"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        id="secondPartyContact"
                        placeholder="Masukkan Kontak Pihak Kedua"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="secondPartyPosition"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="secondPartyPosition"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Jabatan Pihak Kedua *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="secondPartyPosition"
                    placeholder="Masukkan Jabatan Pihak Kedua"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isUsingNoisyProps"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-[18px] text-sm font-medium text-primary-500">
                    Apakah memakai properti yang menimbulkan kebisingan?
                  </FormLabel>
                  <FormControl className="flex items-center">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-x-5"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Ya" />
                        </FormControl>
                        <FormLabel
                          className={`text-[14px] font-normal text-neutral-400 ${field.value === "Ya" && "text-primary-400"}`}
                        >
                          Ya
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Tidak" />
                        </FormControl>
                        <FormLabel
                          className={`text-[14px] font-normal text-neutral-400 ${field.value === "Tidak" && "text-primary-400"}`}
                        >
                          Tidak
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-3 py-3">
            <Button
              className="flex-1"
              variant={"secondary"}
              onClick={handleBack}
            >
              Kembali
            </Button>
            <Button className="flex-1" type="submit">
              Selanjutnya
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InstanceForm;
