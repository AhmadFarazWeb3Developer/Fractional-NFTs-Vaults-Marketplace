import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import VaultContext from "../context/VaultContext";

function App() {
  const [areVaultsChanged, setAreVaultsChanged] = useState(false);

  return (
    <>
      <VaultContext.Provider value={{ areVaultsChanged, setAreVaultsChanged }}>
        <div className="w-full bg-black font-bakbak  sm:px-12  ">
          <Outlet />
        </div>
        <Toaster position="top-center" richColors={false} />
      </VaultContext.Provider>
    </>
  );
}

export default App;
