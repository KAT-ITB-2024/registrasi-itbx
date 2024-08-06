"use client";

import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { categorySchema } from "./RegistrationForm";

const CategoryForm = ({
  form,
  handleNext,
}: {
  form: UseFormReturn<z.infer<typeof categorySchema>>;
  handleNext: () => void;
}) => {
  const instance = form.watch("instance");
  return (
    <div className="w-full">
      <h1 className="mb-5 text-center font-mogula text-[48px] text-primary">
        ITB GOT TALENT
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNext)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="instance"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-[18px] font-medium text-primary-500">
                    Instansi*
                  </FormLabel>
                  <FormControl className="flex items-center">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-x-5"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="UKM" />
                        </FormControl>
                        <FormLabel
                          className={`text-[14px] font-normal text-neutral-400 ${field.value === "UKM" && "text-primary-400"}`}
                        >
                          UKM
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Non-Lembaga" />
                        </FormControl>
                        <FormLabel
                          className={`text-[14px] font-normal text-neutral-400 ${field.value === "Non-Lembaga" && "text-primary-400"}`}
                        >
                          Nonlembaga
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage className="self-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-[18px] font-medium text-primary-500">
                    Kategori*
                  </FormLabel>
                  <FormControl className="flex items-center">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-x-5"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Individu" />
                        </FormControl>
                        <FormLabel
                          className={`text-[14px] font-normal text-neutral-400 ${field.value === "Individu" && "text-primary-400"}`}
                        >
                          Individu
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Kelompok" />
                        </FormControl>
                        <FormLabel
                          className={`text-[14px] font-normal text-neutral-400 ${field.value === "Kelompok" && "text-primary-400"}`}
                        >
                          Kelompok
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage className="self-end" />
              </FormItem>
            )}
          />
          <div
            className={`w-full origin-top scale-y-0 rounded-lg bg-pink-200 px-3 py-2 text-[14px] text-primary transition-all duration-500 ${instance && "scale-y-100"}`}
          >
            {instance === "UKM" && (
              <p>
                Pemenang kategori <b>UKM</b> akan mendapatkan kesempatan untuk
                tampil di <b>ITB-X</b>
              </p>
            )}
            {instance === "Non-Lembaga" && (
              <p>
                Pemenang kategori <b>Nonlembaga</b> akan mendapatkan kesempatan
                untuk tampil di <b>OSKM</b>
              </p>
            )}
          </div>
          <Button type="submit" className="self-end">
            Selanjutnya
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
