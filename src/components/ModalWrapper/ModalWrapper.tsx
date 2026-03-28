import { createPortal } from "react-dom";

interface IProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  children: React.ReactNode;
  className?: string;
}
function ModalWrapper({ open, setOpen, children, className }: IProps) {
  return createPortal(
    <div
      onMouseDown={() => setOpen(false)}
      className={`fixed inset-0 bg-black/30 transition-all z-50 ${open ? "visible opacity-100" : "invisible opacity-0"} ${className}`}
    >
      <div onMouseDown={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
}

export default ModalWrapper;
