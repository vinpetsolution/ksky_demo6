import { removeStorageKey } from "@/utils/storage";
import { getStorageKey, getRefreshTokenKey, getUserKey } from "@/constants/store-key";

export const clearAllAuthData = () => {
  removeStorageKey({ key: getStorageKey() });

  if (typeof window !== "undefined") {
    sessionStorage.removeItem(getRefreshTokenKey());
    sessionStorage.removeItem(getUserKey());
    sessionStorage.removeItem("token");
    localStorage.removeItem(getRefreshTokenKey());
    localStorage.removeItem(getUserKey());
    localStorage.removeItem(getStorageKey());
  }
};
