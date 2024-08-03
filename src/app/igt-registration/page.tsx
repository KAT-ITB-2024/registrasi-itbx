import Image from "next/image";
import ProfileForm from "./components/ProfileForm";
import RegistrationForm from "./components/RegistrationForm";

const Page = () => {
  return (
    <div className="relative h-screen w-full bg-[url('/images/pink-background.png')] bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <Image
        src="/images/starfish.svg"
        alt="starfish"
        width={100}
        height={100}
        className="w-[448px] h-[336px] absolute top-0 left-0 hidden md:block"
      />
      <Image
        src="/images/sea_slug.svg"
        alt="starfish"
        width={100}
        height={100}
        className="w-[448px] h-[336px] absolute bottom-0 right-0 hidden md:block"
      />
      <RegistrationForm />
    </div>
  );
};

export default Page;
