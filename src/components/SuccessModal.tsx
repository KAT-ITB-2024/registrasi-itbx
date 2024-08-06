import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const SuccessModal = ({
  open,
  setOpen,
  onClose,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose?: () => void;
}) => {
  const handleClose = () => {
    onClose && onClose();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[386px] bg-[#FEFDA3] px-10 py-10">
        <DialogClose
          className="absolute right-4 top-4 text-primary-500"
          onClick={handleClose}
        >
          <X size={24} />
        </DialogClose>
        <DialogHeader className="flex flex-col items-center">
          <Image
            src={"/icon/success.svg"}
            width={60}
            height={60}
            alt="question mark"
            className="mb-6"
          />
          <DialogTitle className="font-mogula text-[32px] font-normal leading-none text-primary-500">
            Pendaftaran Berhasil
          </DialogTitle>
          <DialogDescription className="text-center text-[14px] text-primary-500">
            Terima kasih telah mendaftar pada Acara ITB Got Talent!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
