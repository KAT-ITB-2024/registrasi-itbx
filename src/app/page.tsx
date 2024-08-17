import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import LoginForm from "./LoginForm";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/booking-booth");
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[url('/images/pink-background.png')] bg-cover bg-center bg-no-repeat">
      <div className="z-10 flex h-screen w-full max-w-xl items-center md:py-12">
        <LoginForm />
      </div>
    </div>
  );
}
