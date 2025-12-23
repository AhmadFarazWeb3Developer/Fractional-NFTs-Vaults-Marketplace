import { SquaresExclude } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full py-2 sm:py-3 ">
        <h1 className=" font-bold">Vaultique</h1>

        <ConnectButton />
      </div>
    </>
  );
};

export default Navbar;
