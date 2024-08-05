import { redirect } from "next/navigation";

const Page = () => {
  redirect("/");
  return <div>Hello, this is for login</div>;
};

export default Page;
