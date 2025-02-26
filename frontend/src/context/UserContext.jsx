import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const UserContext = createContext();
const LOCAL_STORAGE_KEY = "userProfile";

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [profile]);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);