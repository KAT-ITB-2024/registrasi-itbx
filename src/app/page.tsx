import Image from "next/image";

export default async function Home() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[url('/images/blue_background.svg')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-10 flex aspect-square w-[80%] max-w-lg justify-center md:w-full">
        <Image
          src="/images/coming-soon-bubble.svg"
          className="h-full w-full"
          fill
          alt="logo"
        />
        <div className="my-10 flex h-fit w-3/4 flex-col items-center justify-center md:my-16">
          <Image
            src="/images/coming-soon.svg"
            className="aspect-[370/239] w-[80%]"
            width={200}
            height={200}
            alt="logo"
          />
          <p className="w-[80%] text-center text-sm font-semibold text-orange-600 sm:text-lg md:text-lg">
            Kapal selam kami sedang menjelajahi samudera selanjutnya....
          </p>
        </div>
      </div>
      <Image
        src="/images/first-ubur.svg"
        className="absolute left-0 top-6 aspect-square w-[218px] md:left-10 md:top-10"
        width={100}
        height={100}
        alt="logo"
      />
      <Image
        src="/images/second-ubur.svg"
        className="absolute bottom-10 left-0 hidden aspect-square w-[245px] md:block lg:left-[20%]"
        width={100}
        height={100}
        alt="logo"
      />
      <Image
        src="/images/third-ubur.svg"
        className="absolute bottom-20 right-0 aspect-square w-[107px] md:right-[40%]"
        width={100}
        height={100}
        alt="logo"
      />
      <Image
        src="/images/bubble.svg"
        className="absolute bottom-0 left-0 aspect-[612/468] w-[612px]"
        width={100}
        height={100}
        alt="logo"
      />
    </div>
  );
}
``;
