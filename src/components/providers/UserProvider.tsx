"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getStorageKey, saveStorageKey } from "@/utils/storage";
import { AuthResponse } from "@/types";
import { getStorageKey as getStorageKeyName } from "@/constants/store-key";

type Props = PropsWithChildren<object>;

function withZeroBalance(user: AuthResponse): AuthResponse {
  return {
    ...user,
    result: {
      ...user.result,
      user: {
        ...user.result.user,
        balanceMoney: 0,
        balancePoint: 0,
        balancePot: 0,
      },
    },
  };
}

interface UserContextType {
  loadingUser: boolean;
  currentUser: AuthResponse | undefined;
  setCurrentUser: (user: AuthResponse | undefined) => void;
  refetchUserInfo: (userName?: string) => Promise<void>;
}

const initialUserContext: UserContextType = {
  loadingUser: true,
  currentUser: undefined,
  setCurrentUser: () => {},
  refetchUserInfo: async () => {},
};

const UserContext = createContext<UserContextType>(initialUserContext);

function UserProviderInner({ children }: Props) {
  const [currentUser, setCurrentUserState] = useState<AuthResponse | undefined>();
  const [loadingUser, setLoadingUser] = useState(true);

  const setCurrentUser = useCallback((user: AuthResponse | undefined) => {
    if (!user) {
      setCurrentUserState(undefined);
      return;
    }
    setCurrentUserState(withZeroBalance(user));
  }, []);

  const refetchUserInfo = useCallback(async () => {
    setCurrentUserState((prev) => (prev ? withZeroBalance(prev) : prev));
  }, []);

  useEffect(() => {
    try {
      const raw = getStorageKey({ key: getStorageKeyName() });
      if (!raw) {
        setLoadingUser(false);
        return;
      }
      const parsed = JSON.parse(raw) as AuthResponse;
      if (parsed?.success && parsed.result?.token) {
        const normalized = withZeroBalance(parsed);
        setCurrentUserState(normalized);
        saveStorageKey({
          key: getStorageKeyName(),
          data: JSON.stringify(normalized),
        });
      }
    } catch {
      setCurrentUserState(undefined);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        loadingUser,
        currentUser,
        setCurrentUser,
        refetchUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function UserProvider({ children }: Props) {
  return <UserProviderInner>{children}</UserProviderInner>;
}

export function useUser(): UserContextType {
  return useContext(UserContext);
}
