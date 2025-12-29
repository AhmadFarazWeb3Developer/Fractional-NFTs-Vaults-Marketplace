import { createContext } from "react";

type VaultContextType = {
  areVaultsChanged: boolean;
  setAreVaultsChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const VaultContext = createContext<VaultContextType | null>(null);

export default VaultContext;
