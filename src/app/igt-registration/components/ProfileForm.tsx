"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ["application/zip", "application/x-zip-compressed"];

const memberSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  programStudi: z.string().min(1, "Program Studi harus diisi"),
});

const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  programStudi: z.string().min(1, "Program Studi harus diisi"),
  lineId: z.string().min(1, "ID Line harus diisi"),
  phoneNumber: z.string().min(1, "Nomor Telepon harus diisi"),
  instagram: z.string().min(1, "Username Instagram harus diisi"),
  members: z.array(memberSchema),
  ktm: z
    .instanceof(FileList)
    .refine((file: FileList) => {
      return !file || file.length > 0;
    }, "KTM harus diisi")
    .refine((file: FileList) => {
      return file[0] && file[0].size <= MAX_UPLOAD_SIZE;
    }, "KTM harus berukuran kurang dari 5MB")
    .refine((file: FileList) => {
      return ACCEPTED_FILE_TYPES.includes(file[0]?.type ?? "");
    }, "KTM harus berupa file ZIP"),
  description: z.string().min(1, "Deskripsi Performance harus diisi"),
  videoLink: z.string().url("Harus berupa URL yang valid"),
});

// type MemberType = z.infer<typeof formSchema>["members"][0];

const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Kevin Sebastian",
      nim: "18221143",
      programStudi: "Teknik Informatika",
      lineId: "kevin.sst",
      phoneNumber: "085236961165",
      instagram: "Halo",
      members: [
        {
          name: "Abdul Aziz",
          nim: "18221143",
          programStudi: "Teknik Informatika",
        },
      ],
      ktm: undefined,
      description: "adwdawd",
      videoLink: "https://stackoverflow.com/questions/23914273/getting-the-file-type-of-a-zip-file-in-input-file",
    },
  });

  const fileRef = form.register("ktm");

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("DIUAHIDHAID");
    console.log(values);
  };

  return (
    <div className="h-fit w-full">
      <h1 className="mb-5 text-center font-mogula text-[48px] text-primary-500">
        Pendaftaran Individu
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-3"
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
                  Nama Lengkap *
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
                  NIM
                </FormLabel>
                <FormControl>
                  <Input {...field} id="nim" placeholder="Masukkan NIM Prodi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="programStudi"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="programStudi"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Program Studi *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="programStudi"
                    placeholder="Masukkan Nama Program Studi (Contoh: Teknik Informatika)"
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
                  Nomor Telepon *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="Masukkan Nomor Aktif"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="instagram"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Username Instagram *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="instagram"
                    placeholder="Masukkan Username Instagram"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <div className="flex w-full items-center justify-between mb-2">
                  <h1 className="text-[16px] font-medium text-primary-500">
                    Data Anggota Tim {index + 2} *
                  </h1>
                  {index > 0 && <button
                    type="button"
                    onClick={() => remove(index)}
                    className="aspect-square w-6 rounded-sm border-2 border-primary-500 font-bold leading-none text-primary-500"
                  >
                    -
                  </button>}
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={`members.${index}.name` as const}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <Input {...field} placeholder={`Masukkan Nama Anggota Tim ${index + 2}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${index}.nim` as const}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <Input {...field} placeholder={`Masukkan NIM Anggota Tim ${index + 2}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${index}.programStudi` as const}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <Input {...field} placeholder={`Masukkan Prodi Anggota Tim ${index + 2}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            );
          })}
          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                nim: "",
                programStudi: "",
              })
            }
          >
            Tambah Anggota
          </Button>
          <FormField
            control={form.control}
            name="ktm"
            render={() => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="ktm"
                  className="text-[16px] font-medium text-primary-500"
                >
                  KTM *
                </FormLabel>
                <FormControl>
                  <Input {...fileRef} id="ktm" type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="description"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Deskripsi Performance *
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Tuliskan deskripsi singkat dari performance yang akan dilakukan"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoLink"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="videoLink"
                  className="text-[16px] font-medium text-primary-500"
                >
                  URL Video (YouTube) *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="videoLink"
                    placeholder="Masukkan URL Video"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-3 py-3">
            <Button className="flex-1" variant={"secondary"}>
              Kembali
            </Button>
            <Button className="flex-1" type="submit">
              Daftar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
