import { useState } from "react";
import Navbar from "../components/NavBar";

const LearnMorePage = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "What is Fractional NFT Vaults?",
      content: (
        <div className="space-y-6  font-poppins">
          <h2 className="text-3xl  text-white">
            Fractional NFTs Vaults Marketplace
          </h2>

          <p className="text-white/70 leading-relaxed text-justify">
            Fractional NFTs Vaults Marketplace is a protocol where each vault
            represents a single NFT. Users can invest in these vaults by
            purchasing fractional shares of the NFT stored inside. This makes it
            possible for multiple investors to collectively own and benefit from
            high-value NFTs that may otherwise be too expensive to purchase
            individually. By holding shares, users can trade, redeem, or
            collectively profit from the underlying NFT.
          </p>
        </div>
      ),
    },
    {
      title: "What We Offer",
      content: (
        <div className="space-y-10 font-poppins text-justify">
          <div className="space-y-4">
            <h3 className="text-2xl  text-white">Working</h3>
            <ul className="list-decimal list-inside text-white/70 space-y-2">
              <li>
                <span className=" text-white">Factory:</span> Tracks the vaults.
              </li>
              <li>
                <span className=" text-white">Vault Creator:</span> Creates a
                vault for an NFT and deposits the NFT into it.
              </li>
              <li>
                <span className=" text-white">User:</span> Users can buy shares
                in any of the vaults.
              </li>
            </ul>
          </div>

          <div className="space-y-4 font-poppins ">
            <h3 className="text-2xl  text-white">Revenue Model</h3>

            <div className="space-y-3 ">
              <h4 className="text-lg text-white">For Share Buyers:</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>
                  On each purchase of shares, the vault token price increases by
                  <code className="text-[#21e786]"> 0.1%</code>.
                </li>
                <li>
                  Users can withdraw their shares at any time and take advantage
                  of the increased value from more shareholders.
                </li>
                <li>
                  The more shareholders there are, the higher the profit
                  potential.
                </li>
                <li>
                  A smaller number of shares with more holders will benefit
                  early buyers more.
                </li>
                <li>
                  If someone holds 100% of the shares at any time, they can
                  withdraw the NFT.
                </li>
                <li>
                  Maximum shares are <code className="text-[#21e786]">100</code>
                  .
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-4">
              <h4 className="text-lg  text-white">For Marketplace Owner:</h4>
              <ul className="list-disc list-inside text-white/70">
                <li>
                  On each share sale by a user, the marketplace takes a
                  <code className="text-[#21e786]"> 0.3%</code> cut from the ETH
                  that the user withdraws.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex min-h-screen">
        <aside className="w-[300px] border-r border-white/10 py-8 pr-8 space-y-6">
          {steps.map((item, index) => (
            <button
              key={index}
              onClick={() => setStep(index)}
              className={`w-full text-left p-4 border transition-all cursor-pointer ${
                step === index
                  ? "border-[#21e786] text-white"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              <div className="">{item.title}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          {steps[step].content}

          <div className="pt-12">
            {step < steps.length - 1 && (
              <button
                onClick={nextStep}
                className="bg-[#21e786] text-black px-8 py-2  cursor-pointer"
              >
                Next
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearnMorePage;
