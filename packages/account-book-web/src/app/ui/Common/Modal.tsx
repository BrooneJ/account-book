import Overlay from "@/app/ui/Common/Overlay";
import { AnimatePresence } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
};

function Modal({ children, visible, className }: ModalProps) {
  return (
    <>
      <Overlay visible={visible} />
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-96 ${className}`}
      >
        <AnimatePresence>{visible && children}</AnimatePresence>
      </div>
    </>
  );
}

export default Modal;
