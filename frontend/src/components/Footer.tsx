import {
  FaDiscord,
  FaXTwitter,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-10 ">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-white text-2xl cursor-pointer">VAULTIQUE</div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-[#21e786] cursor-pointer transition-all">
            <FaDiscord size={24} />
          </a>
          <a href="#" className="text-[#21e786] cursor-pointer transition-all">
            <FaXTwitter size={24} />
          </a>
          <a href="#" className="text-[#21e786] cursor-pointer transition-all">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-[#21e786] cursor-pointer transition-all">
            <FaGithub size={24} />
          </a>
          <a href="#" className="text-[#21e786] cursor-pointer transition-all">
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>

      <div className="mt-10 text-center text-white/50 text-sm font-poppins">
        © {new Date().getFullYear()} NFT Vaults. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
