"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CategoryForm from "./CategoryForm";
import ProfileForm from "./ProfileForm";
import styles from "./styles.module.css";
import AlertModal from "~/components/AlertModal";
import { api } from "~/trpc/react";
import { uploadFile } from "~/lib/files";
import SuccessModal from "~/components/SuccessModal";
import { toast } from "sonner";
import { FolderEnum } from "~/server/bucket";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ["application/zip", "application/x-zip-compressed"];

const memberSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  programStudi: z.string().min(1, "Program Studi harus diisi"),
});

export const formSchema = z.object({
  groupName: z.string().min(1, "Nama Kelompok harus diisi"),
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
      return file?.[0] && file[0].size <= MAX_UPLOAD_SIZE;
    }, "KTM harus berukuran kurang dari 5MB")
    .refine((file: FileList) => {
      return ACCEPTED_FILE_TYPES.includes(file?.[0]?.type ?? "");
    }, "KTM harus berupa file ZIP"),
  description: z.string().min(1, "Deskripsi Performance harus diisi"),
  videoLink: z.string().url("Harus berupa URL yang valid"),
});

export const categorySchema = z.object({
  instance: z.enum(["UKM", "Non-Lembaga"], {
    required_error: "Instansi harus diisi",
  }),
  category: z.enum(["Individu", "Kelompok"], {
    required_error: "Kategori harus diisi",
  }),
});

const RegistrationForm = () => {
  const [isProfileForm, setIsProfileForm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categoryForm = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  const submitMutation = api.itbGotTalent.create.useMutation();
  const generateUrlForUpload = api.storage.genereateURLForUpload.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
      name: "",
      nim: "",
      programStudi: "",
      lineId: "",
      phoneNumber: "",
      instagram: "",
      members: [],
      ktm: undefined,
      description: "",
      videoLink: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const members = values.members.map(
      (member) => `${member.name}-${member.nim}-${member.programStudi}`,
    );
    const groupName =
      categoryForm.getValues("category") === "Kelompok" ? values.groupName : "";
    const toastId = toast("toast");
    try {
      setIsLoading(true);
      toast.loading("Loading...", {
        id: toastId,
      });

      const ktmFile = values.ktm[0];
      const fileName = values.nim;
      const ktmFilename = await uploadFile(
        ktmFile!,
        fileName,
        FolderEnum.ITBGOTTALENT,
      );

      const ktmPath = await generateUrlForUpload.mutateAsync({
        folder: FolderEnum.ITBGOTTALENT,
        fileName: ktmFilename,
      });

      await submitMutation.mutateAsync({
        instance: categoryForm.getValues("instance"),
        category: categoryForm.getValues("category"),
        groupName: groupName,
        name: values.name,
        nim: values.nim,
        programStudi: values.programStudi,
        lineId: values.lineId,
        phoneNumber: values.phoneNumber,
        instagram: values.instagram,
        members: members,
        ktmPath: ktmPath, // Use the URL of the uploaded KTM file
        description: values.description,
        videoLink: values.videoLink,
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

  const handleNext = () => {
    const groupName =
      categoryForm.watch("category") === "Kelompok" ? "" : "Individu";
    const newMember =
      categoryForm.watch("category") === "Kelompok"
        ? [{ name: "", nim: "", programStudi: "" }]
        : [];
    form.setValue("groupName", groupName);
    form.setValue("members", newMember);
    setIsProfileForm(true);
  };

  const handleReset = () => {
    form.reset();
    categoryForm.reset();
    setIsProfileForm(false);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  const isGroup = categoryForm.watch("category") === "Kelompok";

  return (
    <div className="z-10 flex h-screen w-full max-w-xl items-center md:py-12">
      <div
        className={`flex h-fit max-h-full w-full justify-center overflow-y-auto rounded-2xl px-10 py-10 ${styles.glassmorphism}`}
      >
        {!isProfileForm && (
          <CategoryForm form={categoryForm} handleNext={handleNext} />
        )}
        {isProfileForm && (
          <ProfileForm
            form={form}
            isGroup={isGroup}
            handleBack={() => setIsProfileForm(false)}
            onSubmit={() => setIsAlertOpen(true)}
          />
        )}
      </div>
      <AlertModal
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        handleAction={handleSubmit}
        isLoading={isLoading}
      />
      <SuccessModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        onClose={() => handleReset()}
        description="Terima kasih telah mendaftar pada Acara ITB Got Talent!"
      />
    </div>
  );
};

export default RegistrationForm;
