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
import { type CategorySchema } from "./RegistrationForm";


const CategoryForm = ({
  form,
  handleNext,
}: {
  form: UseFormReturn<z.infer<typeof CategorySchema>>;
  handleNext: () => void;
}) => {

  function onSubmit(data: z.infer<typeof CategorySchema>) {
    console.log(data);
    handleNext();
  }

  return (
    <div className="w-full">
      <h1 className="text-center font-mogula text-[48px] text-primary">
        ITB GOT TALENT
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="instance"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-[18px] text-primary-500 font-medium">Instansi*</FormLabel>
                  <FormControl className="flex items-center">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-x-5"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="lembaga" />
                        </FormControl>
                        <FormLabel className={`font-normal text-[14px] text-neutral-400 ${field.value === "lembaga" && "text-primary-400"}`} >
                          Lembaga
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="non-lembaga" />
                        </FormControl>
                        <FormLabel className={`font-normal text-[14px] text-neutral-400 ${field.value === "non-lembaga" && "text-primary-400"}`}>
                          Non-Lembaga
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage className="self-end"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-[18px] text-primary-500 font-medium">Kategori*</FormLabel>
                  <FormControl className="flex items-center">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-x-5"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="individu" />
                        </FormControl>
                        <FormLabel className={`font-normal text-[14px] text-neutral-400 ${field.value === "individu" && "text-primary-400"}`} >
                          Individu
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="kelompok" />
                        </FormControl>
                        <FormLabel className={`font-normal text-[14px] text-neutral-400 ${field.value === "kelompok" && "text-primary-400"}`}>
                          Kelompok
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage className="self-end"/>
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end">Selanjutnya</Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
