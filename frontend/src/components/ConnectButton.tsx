import React, { useEffect, useState } from "react";
import { Eip1193Provider, ethers } from "ethers";
import { Wallet, ChevronDown, User } from "lucide-react";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useAppKitNetwork,
  useAppKitState,
} from "@reown/appkit/react";
import getChainName from "../blockchain-interaction/helpers/getChainName";
import { getNetworkToken } from "../blockchain-interaction/helpers/getNetworkToken";
import { useNavigate } from "react-router-dom";

const ConnectButton = () => {
  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork, chainId } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider("eip155");
  const { open: isModalOpen } = useAppKitState();

  const navigate = useNavigate();

  const [balance, setBalance] = useState("0.00");
  const [nativeToken, setNativeToken] = useState({
    symbol: "ETH",
    name: "Ether",
  });
  const [previousChainId, setPreviousChainId] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (
      previousChainId !== null &&
      previousChainId !== chainId &&
      isModalOpen
    ) {
      close();
    }
    if (!chainId) return;
    setPreviousChainId(chainId);
  }, [chainId, isModalOpen, close, previousChainId]);

  useEffect(() => {
    if (chainId) {
      const numericChainId =
        typeof chainId === "string" ? parseInt(chainId) : chainId;
      setNativeToken(getNetworkToken(numericChainId));
    }
  }, [chainId]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && address && walletProvider) {
        try {
          const provider = new ethers.BrowserProvider(
            walletProvider as Eip1193Provider
          );
          const balanceWei = await provider.getBalance(address);
          setBalance(parseFloat(ethers.formatEther(balanceWei)).toFixed(4));
        } catch {
          setBalance("0.00");
        }
      }
    };
    fetchBalance();
  }, [isConnected, address, chainId, walletProvider]);

  useEffect(() => {
    setImageLoaded(false);
  }, [chainId, caipNetwork]);

  const getNetworkImageUrl = () => {
    if (!chainId) return null;
    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const chainName = getChainName(numericChainId);
    return chainName
      ? `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/info/logo.png`
      : null;
  };

  const networkImageUrl = getNetworkImageUrl();

  return (
    <div className="navbar flex flex-row justify-between items-center  tracking-wide font-poppins">
      <div className="flex flex-row items-center gap-3">
        {isConnected ? (
          <div className="flex flex-row items-center gap-2 p-1 shadow-lg cursor-pointer ">
            <div className="flex items-center justify-center gap-2 px-4 py-2  ">
              <Wallet size={18} color="#ffffff" strokeWidth={1.5} />
              <div className="flex items-center gap-1">
                <span className="text-sm text-white ">{balance}</span>
                <span className="text-sm text-white ">
                  {nativeToken.symbol}
                </span>
              </div>
            </div>

            {caipNetwork && (
              <button
                onClick={() => open({ view: "Networks" })}
                className="flex items-center gap-2 px-3 py-2  text-white hover:bg-[#21e786] hover:text-black transition-all cursor-pointer"
              >
                {networkImageUrl && (
                  <img
                    src={networkImageUrl}
                    alt={caipNetwork.name || "Network"}
                    className="w-5 h-5 ring-2 ring-white  rounded-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
                    style={{ display: imageLoaded ? "block" : "none" }}
                  />
                )}

                {(!networkImageUrl || !imageLoaded) && (
                  <div className="w-5 h-5 bg-black flex items-center justify-center text-[10px]  text-white ring-1 ring-white rounded-full ">
                    {caipNetwork.name?.charAt(0)?.toUpperCase() || "N"}
                  </div>
                )}

                <span className="text-sm">{caipNetwork.name}</span>
                <ChevronDown size={14} />
              </button>
            )}

            <button
              onClick={() => open({ view: "Account" })}
              className="flex items-center gap-2 px-5 py-2.5  text-white hover:bg-[#21e786] hover:text-black transition-all shadow-2xl cursor-pointer"
            >
              <span className="text-sm">
                {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
              <ChevronDown size={14} />
            </button>
            <div
              onClick={() => navigate("/dashboard")}
              className=" border border-[#21e786] p-1 rounded-full  text-[#21e786] "
            >
              <User size={18} />
            </div>
          </div>
        ) : (
          <button
            onClick={() => open()}
            className=" bg-[#21e786] text-black cursor-pointer text-sm  py-1 px-4 sm:px-6 sm:text-lg flex flex-row items-center justify-center gap-2 transition-colors"
          >
            <Wallet size={20} strokeWidth={3} />
            <p>CONNECT</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectButton;
