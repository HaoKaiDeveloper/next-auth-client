import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

interface tokenType {
  name: string;
  value: string;
}

interface userType {
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export async function GET(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token") as tokenType | undefined;
  if (!token?.value) {
    return NextResponse.json({ msg: "" }, { status: 401 });
  }

  const userInfo = verify(token.value, "jwtsecret") as userType | undefined;
  if (!userInfo) {
    return NextResponse.json({ msg: "" }, { status: 401 });
  }

  return NextResponse.json(
    {
      userInfo,
      token: token.value,
    },
    {
      status: 200,
    }
  );
}
