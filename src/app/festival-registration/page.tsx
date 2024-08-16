import Image from "next/image";
import RegistrationForm from "./components/RegistrationForm";
import { redirect } from "next/navigation";

const Page = () => {
  redirect("/");
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[url('/images/pink-festival-background.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src="/images/bubble_lembaga.png"
        alt="bubble"
        width={100}
        height={100}
        className="absolute left-0 hidden aspect-[431/982] h-screen w-auto md:block"
      />
      <RegistrationForm />
    </div>
  );
};

export default Page;
