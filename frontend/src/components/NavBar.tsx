import { SquaresExclude } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full py-2 sm:py-3 ">
        <div className="flex flex-row items-center gap-5 sm:gap-10">
          <div className="font-semibold sm:text-lg text-white sm:hidden">
            <SquaresExclude
              size={24}
              onClick={() => navigate("/")}
              className=" cursor-pointer"
            />
          </div>
          <div className="font-semibold sm:text-lg text-white hidden sm:block">
            <SquaresExclude
              size={30}
              onClick={() => navigate("/")}
              className=" cursor-pointer"
            />
          </div>
        </div>

        <ConnectButton />
      </div>
    </>
  );
};

export default Navbar;
