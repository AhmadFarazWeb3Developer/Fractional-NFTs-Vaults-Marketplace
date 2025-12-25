import ConnectButton from "./ConnectButton";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full border-b border-white/10 py-2 sm:py-3  ">
        <h1 className="  tracking-wide cursor-pointer">VAULTIQUE</h1>
        <ConnectButton />
      </div>
    </>
  );
};

export default Navbar;
