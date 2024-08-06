"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const AlertModal = ({
  open,
  setOpen,
  handleAction,
  isLoading,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAction: () => void;
  isLoading: boolean;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-[386px] bg-[#FEFDA3] py-10">
        <button
          className="absolute right-4 top-4 text-primary-500"
          onClick={() => setOpen(false)}
          disabled={isLoading}
        >
          <IoClose size={24} />
        </button>
        <AlertDialogHeader className="flex flex-col items-center">
          <Image
            src={"/icon/question-mark.svg"}
            width={60}
            height={60}
            alt="question mark"
            className="mb-6"
          />
          <AlertDialogTitle className="font-mogula text-[32px] font-normal leading-none text-primary-500">
            Apakah kamu yakin?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] text-primary-500">
            Periksa kembali data yang sudah diisi!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form onSubmit={handleAction} className="w-full">
            <Button type="submit" className="w-full" disabled={isLoading}>
              Continue
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
