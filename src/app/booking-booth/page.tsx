import Image from "next/image";
import BookingForm from "./components/BookingForm";
import { api } from "~/trpc/server";
import type { Lembagas } from "~/server/db/schema";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

type LembagaType = {
  lembaga: "Lembaga 1" | "Lembaga 2" | "Lembaga 3";
  lembagaName: string;
  boothId: string | null;
  booth: {
    code: string;
  } | null;
};

export type BoothType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
};

const Page = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/"); // Redirect to login page
  }
  
  const lembaga: LembagaType | undefined = await api.lembaga.getLembaga();
  
  const availableBooths = await api.booth.getAllBooths();

  if(!lembaga) {
    redirect("/");
  }

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
        availableBooths={availableBooths}
        instanceName={lembaga.lembagaName}
        instanceType={lembaga.lembaga}
        selectedBooth={lembaga.booth?.code}
      />
    </div>
  );
};

export default Page;
