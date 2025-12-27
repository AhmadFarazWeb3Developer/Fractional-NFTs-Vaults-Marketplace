// // // import { useState } from "react";
// // // import CreateVaultForm from "../components/CreateVaultForm";
// // // import UploadNFTImageForm from "../components/UploadNFTImageForm";

// // // const CreateVaultPage = () => {
// // //   const [step, setStep] = useState<1 | 2>(1);
// // //   const [vaultAddress, setVaultAddress] = useState<string>("");

// // //   return (
// // //     <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
// // //       <div className="w-full max-w-[480px] border border-white/15 p-8">
// // //         {step === 1 && (
// // //           <CreateVaultForm
// // //             onSuccess={(address) => {
// // //               setVaultAddress(address);
// // //               setStep(2);
// // //             }}
// // //           />
// // //         )}

// // //         {step === 2 && <UploadNFTImageForm vaultAddress={vaultAddress} />}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreateVaultPage;

// // import { useState } from "react";
// // import { ArrowLeft, ArrowRight } from "lucide-react";
// // import CreateVaultForm from "../components/CreateVaultForm";
// // import UploadNFTImageForm from "../components/UploadNFTImageForm";

// // const CreateVaultPage = () => {
// //   const [step, setStep] = useState<1 | 2>(1);
// //   const [vaultAddress, setVaultAddress] = useState<string>("");

// //   return (
// //     <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
// //       <div className="relative w-full max-w-[480px] border border-white/15 p-8 overflow-hidden">
// //         <div className="absolute top-4 right-4 flex gap-2">
// //           {step === 2 && (
// //             <button
// //               onClick={() => setStep(1)}
// //               className="p-2 border border-white/20 hover:border-white/40 transition cursor-pointer"
// //             >
// //               <ArrowLeft size={18}  />
// //             </button>
// //           )}

// //           {step === 1 && (
// //             <button
// //               disabled
// //               className="p-2 border border-white/10 text-white/30 cursor-not-allowed"
// //             >
// //               <ArrowRight size={18} />
// //             </button>
// //           )}
// //         </div>

// //         {/* STEP CONTAINER */}
// //         <div
// //           className={`transition-all duration-300 ease-in-out ${
// //             step === 1
// //               ? "opacity-100 translate-x-0"
// //               : "opacity-0 -translate-x-6 absolute inset-8"
// //           }`}
// //         >
// //           {step === 1 && (
// //             <CreateVaultForm
// //               onSuccess={(address) => {
// //                 setVaultAddress(address);
// //                 setStep(2);
// //               }}
// //             />
// //           )}
// //         </div>

// //         <div
// //           className={`transition-all duration-300 ease-in-out ${
// //             step === 2
// //               ? "opacity-100 translate-x-0"
// //               : "opacity-0 translate-x-6 absolute inset-8"
// //           }`}
// //         >
// //           {step === 2 && <UploadNFTImageForm vaultAddress={vaultAddress} />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateVaultPage;

// import { useState } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import CreateVaultForm from "../components/CreateVaultForm";
// import UploadNFTImageForm from "../components/UploadNFTImageForm";

// const CreateVaultPage = () => {
//   const [step, setStep] = useState<1 | 2>(1);
//   const [vaultAddress, setVaultAddress] = useState<string>("");

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
//       {/* WRAPPER */}
//       <div className="relative w-full max-w-[520px] flex items-center">
//         {/* LEFT ICON */}
//         {step === 2 && (
//           <button
//             onClick={() => setStep(1)}
//             className="absolute -left-12 p-2 border border-white/20 hover:border-white/40 transition cursor-pointer"
//           >
//             <ArrowLeft size={18} />
//           </button>
//         )}

//         {/* FORM BOX */}
//         <div className="w-full border border-white/15 p-8 overflow-hidden">
//           <div
//             className={`transition-all duration-300 ease-in-out ${
//               step === 1
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 -translate-x-6 absolute"
//             }`}
//           >
//             {step === 1 && (
//               <CreateVaultForm
//                 onSuccess={(address) => {
//                   setVaultAddress(address);
//                   setStep(2);
//                 }}
//               />
//             )}
//           </div>

//           <div
//             className={`transition-all duration-300 ease-in-out ${
//               step === 2
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-6 absolute"
//             }`}
//           >
//             {step === 2 && <UploadNFTImageForm vaultAddress={vaultAddress} />}
//           </div>
//         </div>

//         {/* RIGHT ICON */}
//         {step === 1 && (
//           <button
//             disabled
//             className="absolute -right-12 p-2 border border-white/10 text-white/30 cursor-not-allowed"
//           >
//             <ArrowRight size={18} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateVaultPage;

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CreateVaultForm from "../components/CreateVaultForm";
import UploadNFTImageForm from "../components/UploadNFTImageForm";

const CreateVaultPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [vaultAddress, setVaultAddress] = useState<string>("");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
      <div className="relative w-full max-w-[520px] flex items-center">
        {/* LEFT ICON */}
        <button
          onClick={() => setStep(1)}
          className={`absolute -left-12 p-2 border transition cursor-pointer
            ${
              step === 1
                ? "border-white/10 text-white/30"
                : "border-white/20 hover:border-white/40"
            }`}
        >
          <ArrowLeft size={18} />
        </button>

        {/* FORM BOX */}
        <div className="w-full border border-white/15 p-8 overflow-hidden relative">
          {/* STEP 1 */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              step === 1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6 absolute inset-0"
            }`}
          >
            <CreateVaultForm
              onSuccess={(address) => {
                setVaultAddress(address);
              }}
            />
          </div>

          {/* STEP 2 */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              step === 2
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-6 absolute inset-0"
            }`}
          >
            <UploadNFTImageForm vaultAddress={vaultAddress} />
          </div>
        </div>

        {/* RIGHT ICON */}
        <button
          onClick={() => setStep(2)}
          className={`absolute -right-12 p-2 border transition cursor-pointer
            ${
              step === 2
                ? "border-white/10 text-white/30"
                : "border-white/20 hover:border-white/40"
            }`}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CreateVaultPage;
