"use client";
import { useRef, useState, useEffect, FormEvent } from "react";
import FormInput from "./components/FormInput";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    if (!name || !email) return;
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ name, email }),
      });
      if (res.status == 200) {
        router.push("/secret");
      } else {
        throw new Error("error");
      }
    } catch (err) {
      setErrMsg(true);
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (errMsg) {
      timeout = setTimeout(() => {
        setErrMsg(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [errMsg]);

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="absolute top-[30%] left-[40%] w-[20%] flex flex-col items-center gap-5 bg-slate-50 p-5 rounded-[7px]"
      >
        <label htmlFor="name" className="w-full">
          Name:
          <FormInput type="text" name="name" id="name" refTarget={nameRef} />
        </label>
        <label htmlFor="email" className="w-full">
          Email:
          <FormInput
            type="email"
            name="email"
            id="email"
            refTarget={emailRef}
          />
        </label>
        {errMsg && <p className="text-[red]">發生錯誤</p>}
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
