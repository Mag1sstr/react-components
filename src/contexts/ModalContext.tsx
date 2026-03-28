import { createContext, useContext, useState } from "react";

interface IModalContext {
  openCart: boolean;
  setOpenCart: (b: boolean) => void;
  openConfirm: boolean;
  setOpenConfirm: (b: boolean) => void;
}

export const ModalContext = createContext({} as IModalContext);

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openCart, setOpenCart] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(true);

  return (
    <ModalContext.Provider
      value={{ openCart, setOpenCart, openConfirm, setOpenConfirm }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModals = () => useContext(ModalContext);
