import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { paymentSchema } from "./RegistrationForm";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FaInfoCircle } from "react-icons/fa";
import { paymentOptionEnum } from "~/server/db/schema";
import { useMemo } from "react";

const PaymentForm = ({
  form,
  onSubmit,
  handleBack,
  instanceType,
}: {
  form: UseFormReturn<z.infer<typeof paymentSchema>>;
  onSubmit: () => void;
  handleBack: () => void;
  instanceType: string;
}) => {
  const fileRef = form.register("paymentProof");

  const nominal = useMemo(() => {
    if (instanceType === "Lembaga 1") {
      return 100000;
    } else if (instanceType === "Lembaga 2") {
      return 350000;
    } else {
      return 600000;
    }
  }, [instanceType]);

  return (
    <div className="h-fit w-full">
      <h1 className="mb-5 text-center font-mogula text-[48px] text-primary">
        Pembayaran
      </h1>
      <div className="my-5 flex flex-col justify-center rounded-lg bg-[#ffc4de] p-5 text-primary-500">
        <p>
          Seluruh lembaga <b>WAJIB</b> membayarkan Commitment Fee sebesar Rp
          100.000.
          <br />
        </p>
        {instanceType === "Lembaga 2" && (
          <p>
            <br />
            Lembaga 2 yang mendaftar <b>WAJIB</b> membayar tambahan sebesar Rp
            250.000
          </p>
        )}
        {instanceType === "Lembaga 3" && (
          <p>
            <br />
            Lembaga 3 yang mendaftar <b>WAJIB</b> membayar tambahan sebesar Rp
            500.000
          </p>
        )}
        <p>
          <br />
          Pembayaran dapat dilakukan melalui transfer ke rekening atau nomor
          berikut:
          <br />
        </p>
        <ul className="ml-6 list-disc">
          <li>
            <b>BRI</b>: 059301003841531 a.n Qoniaturohmah
          </li>
          <li>
            <b>Gopay</b>: 085816429746 a.n Qonia
          </li>
        </ul>
        <p>
          <br />
          Tuliskan{" "}
          <span className="rounded-md bg-primary-400 px-1 py-0.5 text-white">
            Nama Lembaga_Tujuan Pembayaran
          </span>{" "}
          di <b>deskripsi transfer</b> dan <b>nama file bukti pembayaran</b>.
          <br />
          <br />
          Dengan mengirimkan MOU yang telah ditandatangani dan Commitment Fee,
          berarti lembaga yang terdaftar <b>WAJIB</b> mematuhi seluruh aturan
          yang berlaku
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-medium text-primary-500">
                  Tipe Pembayaran *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Tipe Pembayaran" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentOptionEnum.enumValues.map((paymentType) => (
                      <SelectItem key={paymentType} value={paymentType}>
                        {paymentType}
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
            name="accountName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel
                  htmlFor="accountName"
                  className="text-[16px] font-medium text-primary-500"
                >
                  Nama Pemilik Rekening *
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="accountName"
                    placeholder="Masukkan Nama Pemilik Rekening"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative my-5 flex flex-col justify-center rounded-lg bg-[#ffc4de] py-3 pl-10 pr-5 text-primary-500">
            <p>
              Nominal yang harus dibayarkan berjumlah{" "}
              <b>Rp {nominal.toLocaleString("de-DE")}</b>
            </p>
            <div className="absolute left-4 top-1/2 z-10 h-fit w-fit -translate-y-[37%]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button">
                    <FaInfoCircle className="text-primary-500" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Commitment Fee: Rp 100.000</p>
                    {instanceType === "Lembaga 2" && (
                      <p>Biaya Tambahan: Rp 250.000</p>
                    )}
                    {instanceType === "Lembaga 3" && (
                      <p>Biaya Tambahan: Rp 500.000</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <FormField
            control={form.control}
            name="paymentProof"
            render={() => (
              <FormItem className="space-y-1">
                <div className="flex items-center gap-3">
                  <FormLabel
                    htmlFor="paymentProof"
                    className="text-[16px] font-medium text-primary-500"
                  >
                    Bukti Pembayaran *
                  </FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <FaInfoCircle className="text-primary-500" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Gambar dalam bentuk JPG/PNG</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Input
                    {...fileRef}
                    id="paymentProof"
                    type="file"
                    accept="image/*"
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

export default PaymentForm;
