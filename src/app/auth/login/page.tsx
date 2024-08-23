import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import LightbulbMomentSVG from "@/components/LightbulbMomentSVG";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { brandFont } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Introverted Ink - Login",
};

export default async function LoginPage() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 h-full px-1 sm:px-5">
      <div className="hidden sm:block lg:col-span-2 relative">
        <div className={"mt-20 leading-10 text-5xl " + brandFont.className}>
          Unlock your <br />{" "}
          <span className={brandFont.className + " text-rose-700"}>
            {" "}
            Personalized Experience.
          </span>
        </div>
        <div className="absolute h-24 w-72 left-0 bottom-80 -scale-x-100">
          <LightbulbMomentSVG />
        </div>
      </div>
      <div className="h-full flex justify-center flex-col px-5">
        <div
          className={
            "text-center mb-20 text-5xl font-bold text-rose-700 " +
            brandFont.className
          }
        >
          Welcome back.
        </div>
        <LoginForm />
        <div className="flex gap-2 py-2 justify-center">
          <div>Don't have an account?</div>
          <Link
            href="/auth/signup"
            className="font-bold text-rose-700 hover:text-rose-600 active:text-rose-400"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </div>
  );
}
