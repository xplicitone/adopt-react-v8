import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

// pass children through if it has otherwise it wont render itself
const Modal = ({ children }: { children: ReactElement }) => {
  // ref is i have this piece of something i want to have the same thing back everytime
  // ref is container to give yourself back same thing every time.
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // if don't have a ref, create one. want same div on every single re-render.
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    // need cleanup. Class you would use ComponentWillUnmount bc component about to exit the DOM you wanna run that method. For FUnction component:

    // anything you return in an effect will be run before a component will be totally unmounted from the DOM
    // remove child at end otherwise infinite divs left inside of this portal/modal.
    // if doing some external event listening, go in here and remove the event listener
    // stopping a timer (setTimeout or requestAnimationFrame or setInterval), cancel it here.
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  // can say (children) but for css classes / styling, it needs it
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
