import React, { createContext, useState, useContext, useMemo } from 'react';

// 1. Definir a interface para o valor do contexto
interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

// 2. Criar o Contexto com um valor padrão (pode ser undefined se o provider for sempre usado)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Criar o componente Provedor
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Usar useMemo para evitar recriar o objeto de valor em cada renderização
  const value = useMemo(() => ({
    darkMode,
    toggleTheme
  }), [darkMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Criar um hook customizado para usar o contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
