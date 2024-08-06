import Image from "next/image";
import RegistrationForm from "./components/RegistrationForm";

const Page = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[url('/images/pink-background.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src="/images/starfish.svg"
        alt="starfish"
        width={100}
        height={100}
        className="absolute left-0 top-0 hidden h-[336px] w-[448px] md:block"
      />
      <Image
        src="/images/sea_slug.svg"
        alt="starfish"
        width={100}
        height={100}
        className="absolute bottom-0 right-0 hidden h-[336px] w-[448px] md:block"
      />
      <RegistrationForm />
    </div>
  );
};

export default Page;
