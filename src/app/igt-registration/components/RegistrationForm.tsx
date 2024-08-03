"use client";

import { useState } from "react";
import CategoryForm from "./CategoryForm";
import ProfileForm from "./ProfileForm";
import styles from './styles.module.css';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const CategorySchema = z.object({
  instance: z.enum(["lembaga", "non-lembaga"], {
    required_error: "Instansi harus diisi",
  }),
  category: z.enum(["individu", "kelompok"], {
    required_error: "Kategori harus diisi",
  }),
});

const RegistrationForm = () => {
  const [isProfileForm, setIsProfileForm] = useState(false);
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
  });

  return (
    <div className="w-full max-w-xl z-10 h-screen md:py-12 flex items-center">
      <div className={`w-full h-fit max-h-full overflow-y-auto px-10 py-10 flex justify-center rounded-2xl ${styles.glassmorphism}`}>
        {!isProfileForm && (
          <CategoryForm 
            form={form}
            handleNext={() => setIsProfileForm(true)}
          />
        )}
        {isProfileForm && <ProfileForm />}
      </div>
    </div>
  );
};

export default RegistrationForm;
