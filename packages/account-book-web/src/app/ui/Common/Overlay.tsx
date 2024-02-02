"use client";

import { AnimatePresence, motion } from "framer-motion";

type OverlayProps = {
  visible: boolean;
};

function Overlay({ visible }: OverlayProps) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        />
      )}
    </AnimatePresence>
  );
}

export default Overlay;
