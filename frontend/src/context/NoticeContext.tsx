import { createContext, useContext } from "react";

interface NoticeContextType {
  showNotice: boolean;
}

interface NoticeProviderProps {
  showNotice: boolean;
  children: React.ReactNode;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export const NoticeProvider = ({
  showNotice,
  children,
}: NoticeProviderProps) => {
  return (
    <NoticeContext.Provider value={{ showNotice }}>
      {children}
    </NoticeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) {
    throw new Error("useNotice must be used within a NoticeProvider");
  }
  return context;
};
