import { redirect } from "next/navigation";

const Page = () => {
  redirect("/");
  return <div>Hello, this is for IGT Registration</div>;
};

export default Page;
