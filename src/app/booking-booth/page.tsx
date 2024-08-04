import { redirect } from "next/navigation";

const Page = () => {
  redirect("/");
  return <div>Hello, this is for booking booth in festival</div>;
};

export default Page;
