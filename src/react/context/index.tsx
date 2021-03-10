import { Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { preferredTheme, saveTheme } from "../themes";

type AppContextType={
  lang: string;
  authenticated: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void
}

export const AppContext = React.createContext<AppContextType>({
  lang: "en",
  authenticated: false,
  theme: preferredTheme,
  setTheme: () => {}
});

interface AppProviderProps {}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(preferredTheme);

  useEffect(() =>{
    console.log("1theme is: " + theme.palette.type)
  },[theme])

  return (
    <AppContext.Provider
      value={{
        lang: "en",
        authenticated: false,
        theme,
        setTheme: (theme: Theme) =>{
          setTheme(theme);
          saveTheme(theme);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
