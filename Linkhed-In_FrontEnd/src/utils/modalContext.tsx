import { createContext, useContext, useState } from "react";

interface ModalContextInterface {
  isOpen: any;
  setIsOpen: any;
}
const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);
export const ModalProvider = ({ children }: { children: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ModalContextData: ModalContextInterface = {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
  };
  return (
    <ModalContext.Provider value={ModalContextData}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
