"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useUser } from "./UserProvider";
import { LoginModal } from "@/components/ui/LoginModal";
import { RegistrationModal } from "@/components/ui/RegistrationModal";

interface AuthModalContextValue {
  openLogin: () => void;
  openSignUp: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useUser();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const loginFromQuery = searchParams.get("login") === "1" && !currentUser;
  if (loginFromQuery && !isLoginModalOpen) {
    setIsLoginModalOpen(true);
  }

  useEffect(() => {
    if (!loginFromQuery) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("login");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [loginFromQuery, searchParams, pathname, router]);

  const openLogin = useCallback(() => setIsLoginModalOpen(true), []);

  const openSignUp = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegistrationModalOpen(true);
  }, []);

  return (
    <AuthModalContext.Provider value={{ openLogin, openSignUp }}>
      {children}
      <LoginModal
        isOpen={isLoginModalOpen || loginFromQuery}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignUp={openSignUp}
      />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
