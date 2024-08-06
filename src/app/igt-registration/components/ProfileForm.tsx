"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
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
import { formSchema } from "./RegistrationForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { FaInfoCircle } from "react-icons/fa";

const ProfileForm = ({
  form,
  isGroup,
  handleBack,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  isGroup: boolean;
  handleBack: () => void;
  onSubmit: () => void;
}) => {
  const fileRef = form.register("ktm");

  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  return (
    <div className="h-fit w-full">
      <h1 className="mb-5 text-center font-mogula text-[48px] text-primary-500">
        Pendaftaran {isGroup ? "Kelompok" : "Individu"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4"
        >
          {isGroup && (
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel
                    htmlFor="groupName"
                    className="text-[16px] font-medium text-primary-500"
                  >
                    Nama Tim *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="groupName"
                      placeholder="Masukkan Nama Tim"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="name"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Nama Lengkap {isGroup && "Perwakilan Tim"} *
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
                  NIM {isGroup && "Perwakilan Tim"} *
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
                  Program Studi {isGroup && "Perwakilan Tim"}*
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
                  Nomor Telepon {isGroup && "Perwakilan Tim"} *
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
            name="lineId"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="lineId"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Line ID {isGroup && "Perwakilan Tim"} *
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
            name="instagram"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="instagram"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Username Instagram {isGroup && "Perwakilan Tim"} *
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
          {isGroup && (
            <>
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <div className="mb-2 flex w-full items-center justify-between">
                      <h1 className="text-[16px] font-medium text-primary-500">
                        Data Anggota Tim {index + 2} *
                      </h1>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="aspect-square w-6 rounded-sm border-2 border-primary-500 font-bold leading-none text-primary-500"
                        >
                          -
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name={`members.${index}.name` as const}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={`Masukkan Nama Anggota Tim ${index + 2}`}
                              />
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
                              <Input
                                {...field}
                                placeholder={`Masukkan NIM Anggota Tim ${index + 2}`}
                              />
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
                              <Input
                                {...field}
                                placeholder={`Masukkan Prodi Anggota Tim ${index + 2}`}
                              />
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
            </>
          )}
          <FormField
            control={form.control}
            name="ktm"
            render={() => (
              <FormItem className="space-y-1">
                <div className="flex items-center gap-3">
                  <FormLabel
                    htmlFor="ktm"
                    className="text-[16px] font-medium text-primary-500"
                  >
                    KTM {isGroup && "Seluruh Anggota Tim"} *
                  </FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <FaInfoCircle className="text-primary-500" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Compress dalam bentuk .zip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Input
                    {...fileRef}
                    id="ktm"
                    type="file"
                    accept="application/zip"
                  />
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
            <Button
              className="flex-1"
              variant={"secondary"}
              onClick={handleBack}
            >
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
