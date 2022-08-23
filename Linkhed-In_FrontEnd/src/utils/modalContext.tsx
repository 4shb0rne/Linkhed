import { createContext, useContext, useState } from "react";

interface ModalContextInterface {
  isOpen: any;
  setIsOpen: any;
  isOpen2: any;
  setIsOpen2: any;
}
const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);
export const ModalProvider = ({ children }: { children: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const ModalContextData: ModalContextInterface = {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    isOpen2: isOpen2,
    setIsOpen2: setIsOpen2
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
