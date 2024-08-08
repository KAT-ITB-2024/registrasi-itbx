import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { commitmentSchema } from "./RegistrationForm";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

const CommitmentForm = ({
  form,
  onSubmit,
  handleBack,
}: {
  form: UseFormReturn<z.infer<typeof commitmentSchema>>;
  onSubmit: () => void;
  handleBack: () => void;
}) => {
  const fileRef = form.register("mou");

  return (
    <div className="h-fit w-full">
      <h1 className="mb-5 text-center font-mogula text-[48px] text-primary">
        Lembar Komitmen
      </h1>
      <div className="my-5 flex flex-col justify-center rounded-lg bg-[#ffc4de] p-5 text-primary-500">
        <p>
          Sebelum mengirimkan form ini, harap untuk memahami TOR dan SOP yang
          akan berlaku (TOR dan SOP dapat diakses pada linktree yang tertera)
          <br />
          <br />
          Lembaga yang akan berpartisipasi wajib memahami isi MOU Keikutsertaan
          serta menandatanganinya pada link berikut.
          <br />
          <br />
        </p>
        <Link
          href="https://drive.google.com/drive/folders/1KSp4TDxR0Lpt5mOlpqUVnmIu1yaAM-fF"
          className="text-center text-lg font-bold underline"
        >
          MoU Keikutsertaan
        </Link>
        <p>
          <br />
          Harap mengirimkan kembali MOU yang telah ditandatangani
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="mou"
            render={() => (
              <FormItem className="space-y-1">
                <div className="flex items-center gap-3">
                  <FormLabel
                    htmlFor="ktm"
                    className="text-[16px] font-medium text-primary-500"
                  >
                    Dokumen MoU*
                  </FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <FaInfoCircle className="text-primary-500" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>File dalam bentuk PDF</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Input
                    {...fileRef}
                    id="mou"
                    type="file"
                    accept="application/pdf"
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
              Selanjutnya
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommitmentForm;
