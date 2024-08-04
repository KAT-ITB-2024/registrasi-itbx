import { redirect } from "next/navigation";

const Page = () => {
  redirect("/");
  return <div>Hello, this is for Festival Registration</div>;
};

export default Page;
