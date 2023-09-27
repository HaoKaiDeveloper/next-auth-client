"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
  });

  async function getData() {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();

      if (res.status === 200) {
        const { userInfo, token } = data;
        setUser({ name: userInfo.name, email: userInfo.email, token });
      } else {
        router.push("/");
      }
    } catch (err) {
      router.push("/");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" h-[100vh] flex items-center justify-center">
      <div className="text-white text-2xl w-[40%] h-auto mx-auto break-all">
        <h1 className="text-center my-3">Client component auth</h1>
        <p className="my-3">name : {user.name}</p>
        <p className="my-3">email : {user.email}</p>
        <p className="my-3">token : {user.token}</p>
      </div>
    </div>
  );
};

export default Page;
