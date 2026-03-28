import { useEffect, useRef, useState } from "react";
import { useModals } from "../../contexts/ModalContext";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

function ConfirmCodeModal() {
  const [current, setCurrent] = useState(0);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const refs = [ref1, ref2, ref3, ref4];

  const [code, setCode] = useState(["", "", "", ""]);
  const { openConfirm, setOpenConfirm } = useModals();

  useEffect(() => {
    refs[current].current?.focus();
  }, [current]);
  return (
    <ModalWrapper
      className="flex items-center justify-center"
      open={openConfirm}
      setOpen={setOpenConfirm}
    >
      <div className="p-10.5 bg-white rounded-2xl w-[450px]">
        <div className="flex gap-7.5 mb-7.5">
          <div>
            <h2 className="text-[30px] font-semibold">Введите код</h2>
            <p className="opacity-40">
              SMS-код был отправлен на номер телефона +7 (921) 450-20-25
            </p>
          </div>
          <div>
            <img className="mt-2.5" src="/code.png" alt="code-icon" />
          </div>
        </div>
        <ul className="flex justify-center gap-3.75 mb-7.5">
          {[...Array(4)].map((_, i) => (
            <li
              key={i}
              className={`relative w-13.75 h-15 p-3 rounded-xl border border-[#E8E8E8] transition-all flex items-center justify-center focus-within:border-(--prime) focus-within:before:invisible ${!!code[i].length && "before:invisible"} before:absolute before:content-['.'] before:inset-0 before:flex before:items-center before:justify-center before:text-[24px] before:font-bold before:text-[#DADADA] before:pointer-events-none`}
            >
              <input
                ref={refs[i]}
                value={code[i]}
                onChange={(e) => {
                  setCode((prev) =>
                    prev.map((el, index) =>
                      index === i ? (el = e.target.value) : el,
                    ),
                  );
                  setCurrent(i < code.length - 1 ? i + 1 : i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    if (i === code.length - 1 && !!code[i].length)
                      return setCode((prev) =>
                        prev.map((el, index) => (i === index ? "" : el)),
                      );
                    setCode((prev) =>
                      prev.map((el, index) => (index === i - 1 ? "" : el)),
                    );
                    setCurrent(i > 0 ? i - 1 : i);
                  }
                }}
                onPaste={(e) => {
                  setCode(
                    e.clipboardData
                      .getData("text")
                      .split("")
                      .slice(0, code.length),
                  );
                  refs[i].current?.blur();
                }}
                className="w-full h-full outline-none font-medium text-2xl text-center"
                type="text"
                maxLength={1}
              />
            </li>
          ))}
        </ul>
        <button className="w-full py-4 rounded-[18px] bg-(--prime) text-white font-bold">
          Подтвердить
        </button>
      </div>
    </ModalWrapper>
  );
}
export default ConfirmCodeModal;
