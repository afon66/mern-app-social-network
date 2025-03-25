import { createContext, useEffect, useState } from "react"
import type { FC, ReactNode } from "react"

type ThemeContextType = {
  theme: "light" | "dark"
  toggleTheme: () => void
}

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
})

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme")
    return storedTheme === "dark" ? "dark" : "light"
  })

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
