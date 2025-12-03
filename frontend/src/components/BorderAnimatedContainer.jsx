import {clsx} from "clsx";
function BorderAnimatedContainer({ children }) {
  const borderAnim = clsx("w-full h-full [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border animate-spin flex overflow-hidden");

  return (
     <div className={borderAnim}>
     <div className="absolute w-full h-full inset-0 border-2 border-transparent rounded-2xl overflow-hidden">
    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 256 128">
    <rect
      x="0"
      y="0"
      width="256"
      height="128"
      rx="16"
      ry="16"
      fill="none"
      stroke="#00eaff"        // light blue
      strokeWidth="20"        // border thickness
      strokeDasharray="20 656" // train length 20, remaining perimeter
      strokeDashoffset="0"
      className="animate-train"
    />
  </svg>
  </div>
  <div className="relative z-10 p-4 w-full m-0.5 text-white bg-slate-900 rounded-2xl">
 {children}
  </div>
       
    </div>
  );
}
export default BorderAnimatedContainer;