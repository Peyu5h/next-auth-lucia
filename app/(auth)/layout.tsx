import { validateRequest } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth",
};

export default async function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (user) {
    redirect("/");
  }
  return <div className="">{children}</div>;
}
