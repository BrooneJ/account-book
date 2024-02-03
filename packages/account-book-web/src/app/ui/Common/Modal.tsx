import Overlay from "@/app/ui/Common/Overlay";
import { AnimatePresence } from "framer-motion";
import CloseButton from "@/app/ui/Common/CloseButton";

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
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg shadow-lg h-[463px] w-[285px] z-10 ${className}`}
      >
        <AnimatePresence>{visible && children}</AnimatePresence>
      </div>
      <div className="absolute right-[45px] top-[54px] z-10">
        <CloseButton />
      </div>
    </>
  );
}

export default Modal;
