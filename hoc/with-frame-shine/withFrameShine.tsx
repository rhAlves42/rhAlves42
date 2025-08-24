import { useEffect } from "react";
import type { ComponentType } from "react";

export function withFrameShine<P extends { className?: string }>(
  Component: ComponentType<P>
): ComponentType<P> {
  const insertStyle = () => {
    const style = document.createElement("style");
    style.innerHTML = `
              @keyframes maskShine {
                0% { -webkit-mask-position: 200%; }
                100% { -webkit-mask-position: -100%; }
              }
              .maskShine {
                -webkit-mask-image: linear-gradient(to right, transparent 30%, #EEE 50%, transparent 70%);
                -webkit-mask-size: 150% auto;
                animation: maskShine 5s ease-in-out infinite;
              }
            `;
    document.head.appendChild(style);
  };
  return (props: P) => {
    useEffect(() => {
      insertStyle();
    }, []);

    const { className, ...rest } = props;
    const combinedClassName = [className, "maskShine"].filter(Boolean).join(" ");

    return <Component {...(rest as P)} className={combinedClassName} />;
  };
}
