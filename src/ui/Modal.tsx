import {
  createContext,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

type ContextType = {
  openId: string | null;
  closeModal: () => void;
  openModal: (id: string) => void;
};

const ModalContext = createContext<ContextType | null>(null);

function Modal({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setOpenId(id);
  };

  const closeModal = () => {
    setOpenId(null);
  };

  return (
    <ModalContext.Provider value={{ openId, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalOpener({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("ModalOpener must be used within a Modal");
  }
  const { openModal } = context;

  return (
    <div
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        openModal(id);
      }}
    >
      {children}
    </div>
  );
}

function ModalContent({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalContent must be used within a Modal");
  }
  const { openId, closeModal } = context;
  const ref = useOutsideClick(closeModal);
  const isOpen = openId === id;

  useEffect(
    function () {
      if (!isOpen) return;
      function handleKeyDown(e: KeyboardEventInit) {
        if (e.key === "Escape") {
          closeModal();
        }
      }
      document.addEventListener("keydown", handleKeyDown);
    },
    [isOpen, closeModal],
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/25 backdrop-blur-sm ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-all duration-300`}
    >
      <div
        className={`${isOpen ? "translate-y-0" : "translate-y-2"} translate-all relative w-96 rounded-lg bg-white p-6 shadow-lg duration-300`}
        ref={ref}
      >
        <button
          className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.ModalOpener = ModalOpener;
Modal.ModalContent = ModalContent;

export default Modal;
