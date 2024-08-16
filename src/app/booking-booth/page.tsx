import Image from "next/image";
import BookingForm from "./components/BookingForm";

const Page = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/images/pink-background.png')] bg-cover bg-center bg-no-repeat">
      <Image
        src="/images/second-ubur.svg"
        alt="starfish"
        width={100}
        height={100}
        className="absolute -bottom-[30%] -left-[20%] hidden h-[776px] w-[776px] md:block"
      />
      <Image
        src="/images/sea_slug.svg"
        alt="starfish"
        width={100}
        height={100}
        className="absolute bottom-0 right-0 hidden h-[336px] w-[448px] md:block"
      />
      <BookingForm
        availableBooths={[
          "A1",
          "A2",
          "A3",
          "A4",
          "A5",
          "A6",
          "A7",
          "A8",
          "A9",
          "A10",
        ]}
        instanceName="Himpunan Mahasiswa Informatika"
        instanceType="Lembaga 2"
        selectedBooth=""
      />
    </div>
  );
};

export default Page;
