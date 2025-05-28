import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PortalOverlay = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.body) : null;
};

// const PopupOverlay = ({
//   children,
//   show,
//   width,
//   onClick,
//   className,
// }: PopupOverlayInterface) => {
//   // const ref = useRef<Element | null>(null);
//   // useEffect(() => {
//   //   ref.current = document.getElementById(selector);
//   // }, [selector]);
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);
//   return mounted
//     ? createPortal(
//         <LocalOverlay
//           show={show}
//           width={width}
//           onClick={onClick}
//           className={className || ""}
//         >
//           {children}
//         </LocalOverlay>,
//         document.body
//       )
//     : null;
// };

export default PortalOverlay;
