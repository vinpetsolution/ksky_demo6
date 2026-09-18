"use server";

import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import type { AuthResponse } from "@/types";

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    timingSafeEqual(aBuf, aBuf);
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

function createDemoSession(userName: string): AuthResponse {
  return {
    success: true,
    message: "로그인 성공!",
    result: {
      token: "demo",
      user: {
        id: "demo",
        userName,
        nickName: userName,
        role: "USER",
        balanceMoney: 0,
        balancePoint: 0,
        balancePot: 0,
      },
    },
  };
}

export async function demoLogin(
  userName: string,
  password: string,
): Promise<AuthResponse> {
  const expectedUser = process.env.DEMO_USERNAME ?? "";
  const expectedPass = process.env.DEMO_PASSWORD ?? "";

  const fail: AuthResponse = {
    success: false,
    message: "로그인에 실패했습니다.",
    result: {
      token: "",
      user: {
        id: "",
        userName: "",
        nickName: "",
        role: "USER",
        balanceMoney: 0,
        balancePoint: 0,
        balancePot: 0,
      },
    },
  };

  if (!expectedUser || !expectedPass || !userName || !password) {
    return fail;
  }

  const userOk = safeEqual(userName, expectedUser);
  const passOk = safeEqual(password, expectedPass);
  if (!userOk || !passOk) {
    return fail;
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return createDemoSession(userName);
}

export async function demoLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
