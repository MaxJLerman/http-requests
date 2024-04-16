import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ open, children, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    //? possibly remove
    if (dialog.current !== null) {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")!,
  );
};
