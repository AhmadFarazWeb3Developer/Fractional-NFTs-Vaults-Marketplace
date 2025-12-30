import { UserVaultShare, VaultType } from "@/types/Vault";
import { PieChart, Layers, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface UserSharesProps {
  userShares: UserVaultShare[];
  vaults: VaultType[];
}

const UserShares = ({ userShares, vaults }: UserSharesProps) => {
  const navigate = useNavigate();

  const totalShares = userShares.reduce((acc, v) => acc + v.userShares, 0);

  const avgOwnership =
    userShares.length > 0
      ? (
          userShares.reduce((acc, v) => acc + v.ownershipPercent, 0) /
          userShares.length
        ).toFixed(2)
      : "0";

  return (
    <div className="bg-black text-white">
      <div className="pl-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="border border-white/15 p-5">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Layers size={16} />
              Total Vaults
            </div>
            <div className="text-3xl mt-2">{userShares.length}</div>
          </div>

          <div className="border border-white/15 p-5">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <TrendingUp size={16} />
              Total Shares
            </div>
            <div className="text-3xl mt-2">{totalShares}</div>
          </div>

          <div className="border border-white/15 p-5">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <PieChart size={16} />
              Avg Ownership %
            </div>
            <div className="text-3xl mt-2">{avgOwnership}%</div>
          </div>
        </div>

        <div className="border border-white/15 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-poppins">
              Vault-wise Share Distribution
            </h2>
          </div>

          <table className="w-full text-sm font-poppins">
            <thead className="text-white/60 border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-3">Vault</th>
                <th className="text-left px-6 py-3">Shares</th>
                <th className="text-left px-6 py-3">Ownership</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {userShares.map((vault) => (
                <tr
                  key={vault.vaultAddress}
                  onClick={() =>
                    navigate(`/single-vault/${vault.vaultAddress}`)
                  }
                  className="border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="text-white">{vault.NFTName}</div>
                    <div className="text-xs text-white/40">
                      {vault.vaultAddress}
                    </div>
                  </td>

                  <td className="px-6 py-4">{vault.userShares}</td>

                  <td className="px-6 py-4">
                    <div className="w-full h-2 bg-white/10">
                      <div
                        className="h-full bg-[#21e786]"
                        style={{
                          width: `${vault.ownershipPercent}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-white/60">
                      {vault.ownershipPercent.toFixed(2)}%
                    </span>
                  </td>

                  <td
                    className={`px-6 py-4 ${
                      vault.status === "Full Ownership"
                        ? "text-[#21e786]"
                        : vault.status === "Partial"
                        ? "text-white/70"
                        : "text-white/40"
                    }`}
                  >
                    {vault.status}
                  </td>
                  <td className="px-6 py-4">
                    {vault.status === "Full Ownership" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/claim-nft/${vault.vaultAddress}`);
                        }}
                        className="px-3 py-1 text-xs border border-[#21e786] text-[#21e786] hover:bg-[#21e786] hover:text-black transition cursor-pointer"
                      >
                        Claim NFT
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {userShares.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-white/40">
                    No shares found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserShares;
