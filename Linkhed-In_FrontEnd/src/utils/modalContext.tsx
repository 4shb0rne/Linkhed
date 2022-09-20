import { createContext, useContext, useState } from "react";

interface ModalContextInterface {
  isOpen: any;
  setIsOpen: any;
  isOpen2: any;
  setIsOpen2: any;
  isOpen3: any;
  setIsOpen3: any;
  isOpen4: any;
  setIsOpen4: any;
  isOpen5: any;
  setIsOpen5: any;
}
const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);
export const ModalProvider = ({ children }: { children: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const ModalContextData: ModalContextInterface = {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    isOpen2: isOpen2,
    setIsOpen2: setIsOpen2,
    isOpen3: isOpen3,
    setIsOpen3: setIsOpen3,
    isOpen4: isOpen4,
    setIsOpen4: setIsOpen4,
    isOpen5: isOpen5,
    setIsOpen5: setIsOpen5,
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
