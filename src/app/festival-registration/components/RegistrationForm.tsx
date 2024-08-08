"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AlertModal from "~/components/AlertModal";
import SuccessModal from "~/components/SuccessModal";
import styles from "./styles.module.css";
import {
  angkatanEnum,
  fakultasEnum,
  lembagaEnum,
  paymentOptionEnum,
  secondPartyContactAppEnum,
} from "~/server/db/schema";
import RegistrantForm from "./RegistrantForm";
import InstanceForm from "./InstanceForm";
import CommitmentForm from "./CommitmentForm";
import PaymentForm from "./PaymentForm";
import { api } from "~/trpc/react";
import { uploadFile } from "~/lib/files";
import { FolderEnum } from "~/server/bucket";
import Link from "next/link";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_FILE_TYPES = ["application/pdf"];
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const registrantSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  nim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  faculty: z.enum(fakultasEnum.enumValues, {
    required_error: "Fakultas harus diisi",
  }),
  major: z.string().min(1, "Program Studi harus diisi"),
  year: z.enum(angkatanEnum.enumValues, {
    required_error: "Angkatan harus diisi",
  }),
  lineId: z.string().min(1, "ID Line harus diisi"),
  phoneNumber: z.string().min(1, "Nomor Telepon harus diisi"),
});

export const instanceSchema = z.object({
  type: z.enum(lembagaEnum.enumValues, {
    required_error: "Jenis Lembaga harus diisi",
  }),
  instanceName: z.string().min(1, "Nama Lembaga harus diisi"),
  secondPartyName: z.string().min(1, "Nama Pihak Kedua harus diisi"),
  secondPartyNim: z.string().regex(/^\d{8}$/, "Masukkan NIM yang valid"),
  secondPartyContactType: z.enum(secondPartyContactAppEnum.enumValues, {
    required_error: "Tipe Kontak harus diisi",
  }),
  secondPartyContact: z.string().min(1, "Kontak Pihak Kedua harus diisi"),
  secondPartyPosition: z.string().min(1, "Jabatan Pihak Kedua harus diisi"),
  isUsingNoisyProps: z.enum(["Ya", "Tidak"], {
    required_error: "Penggunaan Props Berisik harus diisi",
  }),
});

export const commitmentSchema = z.object({
  mou: z
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
    }, "KTM harus berupa file PDF"),
});

export const paymentSchema = z.object({
  paymentType: z.enum(paymentOptionEnum.enumValues, {
    required_error: "Tipe Pembayaran harus diisi",
  }),
  accountName: z.string().min(1, "Nama Akun harus diisi"),
  paymentProof: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .refine((file: FileList) => {
      return !file || file.length > 0;
    }, "Bukti Pembayaran harus diisi")
    .refine((file: FileList) => {
      return file?.[0] && file[0].size <= MAX_UPLOAD_SIZE;
    }, "Bukti Pembayaran harus berukuran kurang dari 5MB")
    .refine((file: FileList) => {
      return ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type ?? "");
    }, "Bukti Pembayaran harus berupa file PDF"),
});

const RegistrationForm = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState<
    "Registrant" | "Instance" | "Commitment" | "Payment"
  >("Registrant");

  const submitMutation = api.lembaga.registerLembaga.useMutation();
  const generateUrlForUpload = api.storage.genereateURLForUpload.useMutation();

  const registrantForm = useForm<z.infer<typeof registrantSchema>>({
    resolver: zodResolver(registrantSchema),
    defaultValues: {
      name: "",
      nim: "",
      faculty: undefined,
      major: "",
      year: undefined,
      lineId: "",
      phoneNumber: "",
    },
  });

  const instanceForm = useForm<z.infer<typeof instanceSchema>>({
    resolver: zodResolver(instanceSchema),
    defaultValues: {
      type: undefined,
      instanceName: "",
      secondPartyName: "",
      secondPartyNim: "",
      secondPartyContactType: undefined,
      secondPartyContact: "",
      secondPartyPosition: "",
      isUsingNoisyProps: undefined,
    },
  });

  const commitmentForm = useForm<z.infer<typeof commitmentSchema>>({
    resolver: zodResolver(commitmentSchema),
    defaultValues: {
      mou: undefined,
    },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentType: undefined,
      accountName: "",
      paymentProof: undefined,
    },
  });

  const handleNext = () => {
    if (step === "Registrant") {
      setStep("Instance");
    } else if (step === "Instance") {
      setStep("Commitment");
    } else if (step === "Commitment") {
      setStep("Payment");
    } else {
      setIsAlertOpen(true);
    }
  };

  const onSubmit = async () => {
    const toastId = toast("toast");
    try {
      setIsLoading(true);
      toast.loading("Loading...", {
        id: toastId,
      });

      const commitmentSheetFile = commitmentForm.getValues("mou")[0];

      const paymentProofFile = paymentForm.getValues("paymentProof")[0];

      const fileName = registrantForm.getValues("nim");

      const commitmentSheetFileName = await uploadFile(
        commitmentSheetFile!,
        fileName,
        FolderEnum.COMMITMENT,
      );

      const commitmentSheetPath = await generateUrlForUpload.mutateAsync({
        folder: FolderEnum.COMMITMENT,
        fileName: commitmentSheetFileName,
      });

      const paymentProofFileName = await uploadFile(
        paymentProofFile!,
        fileName,
        FolderEnum.PAYMENT,
      );

      const paymentProofPath = await generateUrlForUpload.mutateAsync({
        folder: FolderEnum.PAYMENT,
        fileName: paymentProofFileName,
      });

      await submitMutation.mutateAsync({
        name: registrantForm.getValues("name"),
        nim: registrantForm.getValues("nim"),
        password: "password",
        fakultas: registrantForm.getValues("faculty"),
        programStudi: registrantForm.getValues("major"),
        angkatan: registrantForm.getValues("year"),
        lineId: registrantForm.getValues("lineId"),
        phoneNumber: registrantForm.getValues("phoneNumber"),
        lembaga: instanceForm.getValues("type"),
        lembagaName: instanceForm.getValues("instanceName"),
        secondPartyName: instanceForm.getValues("secondPartyName"),
        secondPartyNim: instanceForm.getValues("secondPartyNim"),
        secondPartyContactApp: instanceForm.getValues("secondPartyContactType"),
        secondPartyContact: instanceForm.getValues("secondPartyContact"),
        position: instanceForm.getValues("secondPartyPosition"),
        isNoisy: instanceForm.getValues("isUsingNoisyProps") === "Ya",
        commitmentSheetPath: commitmentSheetPath,
        paymentOption: paymentForm.getValues("paymentType"),
        accountName: paymentForm.getValues("accountName"),
        paymentProofPath: paymentProofPath,
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
    registrantForm.reset();
    instanceForm.reset();
    commitmentForm.reset();
    paymentForm.reset();
    setStep("Registrant");
  };

  const instanceType = instanceForm.getValues("type");

  const description = (
    <p>
      Terima kasih telah mendaftarkan lembaga Anda di Festival ITBx OSKM ITB
      2024.
      <br />
      <br />
      Untuk mempermudah penyampaian informasi dan diskusi, silahkan{" "}
      <b>bergabung</b> dalam grup berikut{" "}
      <Link
        target="_blank"
        href="https://line.me/ti/g/286mmjo0ab"
        className="font-semibold underline"
      >
        {" "}
        https://line.me/ti/g/286mmjo0ab{" "}
      </Link>{" "}
      dan mengisi dokumen berikut (link menyusul)
    </p>
  );

  return (
    <div className="z-10 flex h-screen w-full max-w-xl items-center md:py-12">
      <div
        className={`flex h-fit max-h-full w-full justify-center overflow-y-auto rounded-2xl px-10 py-10 ${styles.glassmorphism}`}
      >
        {step === "Registrant" && (
          <RegistrantForm form={registrantForm} onSubmit={handleNext} />
        )}
        {step === "Instance" && (
          <InstanceForm
            form={instanceForm}
            onSubmit={handleNext}
            handleBack={() => setStep("Registrant")}
          />
        )}
        {step === "Commitment" && (
          <CommitmentForm
            form={commitmentForm}
            onSubmit={handleNext}
            handleBack={() => setStep("Instance")}
          />
        )}
        {step === "Payment" && (
          <PaymentForm
            form={paymentForm}
            instanceType={instanceType}
            onSubmit={handleNext}
            handleBack={() => setStep("Commitment")}
          />
        )}
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
        description={description}
      />
    </div>
  );
};

export default RegistrationForm;
