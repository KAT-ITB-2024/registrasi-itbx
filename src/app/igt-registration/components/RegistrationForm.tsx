"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import CategoryForm from "./CategoryForm";
import ProfileForm from "./ProfileForm";
import styles from "./styles.module.css";
import AlertModal from "~/components/AlertModal";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ["application/zip", "application/x-zip-compressed"];

const memberSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  programStudi: z.string().min(1, "Program Studi harus diisi"),
});

export const formSchema = z.object({
  instance: z.enum(["lembaga", "non-lembaga"], {
    required_error: "Instansi harus diisi",
  }),
  category: z.enum(["individu", "kelompok"], {
    required_error: "Kategori harus diisi",
  }),
  name: z.string().min(1, "Nama harus diisi"),
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  programStudi: z.string().min(1, "Program Studi harus diisi"),
  lineId: z.string().min(1, "ID Line harus diisi"),
  phoneNumber: z.string().min(1, "Nomor Telepon harus diisi"),
  instagram: z.string().min(1, "Username Instagram harus diisi"),
  members: z.array(memberSchema),
  ktm: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
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

const RegistrationForm = () => {
  const [isProfileForm, setIsProfileForm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instance: undefined,
      category: undefined,
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
      videoLink:
        "https://stackoverflow.com/questions/23914273/getting-the-file-type-of-a-zip-file-in-input-file",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("AWIODHAWIUD");
    console.log(values);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <div className="z-10 flex h-screen w-full max-w-xl items-center md:py-12">
      <div
        className={`flex h-fit max-h-full w-full justify-center overflow-y-auto rounded-2xl px-10 py-10 ${styles.glassmorphism}`}
      >
        {!isProfileForm && (
          <CategoryForm form={form} handleNext={() => setIsProfileForm(true)} />
        )}
        {isProfileForm && (
          <ProfileForm form={form} onSubmit={() => setIsAlertOpen(true)} />
        )}
      </div>
      <AlertModal
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        handleAction={() => handleSubmit}
        description="Anda berhasil mendaftar"
      />
    </div>
  );
};

export default RegistrationForm;
