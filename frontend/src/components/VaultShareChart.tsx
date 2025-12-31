import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react";

type ShareEvent = {
  timestamp: string;
  sharesChange: { $numberDecimal: string };
  type: "buy" | "redeem";
  user: string;
  vaultAddress: string;
};

type Props = {
  vaultAddress: string;
};

const VaultShareChart: React.FC<Props> = ({ vaultAddress }) => {
  const [data, setData] = useState<
    { time: string; totalShares: number; shares: number }[]
  >([]);
  const [stats, setStats] = useState({
    currentShares: 0,
    totalBuys: 0,
    totalRedeems: 0,
    uniqueUsers: 0,
    percentChange: 0,
    highestShares: 0,
    lowestShares: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShareEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL_V1}/vault-events/${vaultAddress}`
        );
        const events: ShareEvent[] = await res.json();

        if (!events || events.length === 0) {
          setLoading(false);
          return;
        }

        const sortedEvents = events.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        let total = 0;
        let highest = 0;
        let lowest = Infinity;
        const uniqueUsersSet = new Set<string>();
        let buys = 0;
        let redeems = 0;

        // Convert wei to readable shares (assuming 18 decimals like most ERC20 tokens)
        const WEI_DECIMALS = 18;
        const weiToShares = (wei: number) => wei / Math.pow(10, WEI_DECIMALS);

        const chartData = sortedEvents.map((e) => {
          const sharesWei = Number(e.sharesChange.$numberDecimal);
          const shares = weiToShares(sharesWei);

          if (e.type === "buy") {
            total += shares;
            buys++;
          } else {
            total -= shares;
            redeems++;
          }

          uniqueUsersSet.add(e.user);
          highest = Math.max(highest, total);
          lowest = Math.min(lowest, total);

          return {
            time: new Date(e.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            totalShares: Math.round(total * 1000) / 1000, // 3 decimal places
            shares: Math.round(shares * 1000) / 1000,
          };
        });

        const firstValue = chartData[0]?.totalShares || 0;
        const lastValue = chartData[chartData.length - 1]?.totalShares || 0;
        const percentChange =
          firstValue !== 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

        setStats({
          currentShares: lastValue,
          totalBuys: buys,
          totalRedeems: redeems,
          uniqueUsers: uniqueUsersSet.size,
          percentChange: Math.round(percentChange * 100) / 100,
          highestShares: highest,
          lowestShares: lowest === Infinity ? 0 : lowest,
        });

        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchShareEvents();
  }, [vaultAddress]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a0a0a] border border-[#21e786] p-3 rounded shadow-lg">
          <p className="text-white font-medium text-sm mb-1">
            {payload[0].payload.time}
          </p>
          <p className="text-[#21e786] font-bold text-base">
            {payload[0].value.toFixed(3)} shares
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-black border border-white/15 p-6 mt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-white/50 font-poppins">
            Loading chart data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-white/15 mt-6 font-poppins">
      {/* Header */}
      <div className="border-b border-white/15 p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-white font-semibold">
            Share Trading History
          </h3>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#21e786]" />
            <span className="text-white/70 text-sm">{data.length} Events</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded border border-white/10">
            <div className="text-white/60 text-xs mb-1">Current Shares</div>
            <div className="text-white text-lg font-bold">
              {stats.currentShares.toFixed(3)}
            </div>
            <div
              className={`flex items-center gap-1 text-xs mt-1 ${
                stats.percentChange >= 0 ? "text-[#21e786]" : "text-red-400"
              }`}
            >
              {stats.percentChange >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(stats.percentChange)}%</span>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded border border-white/10">
            <div className="text-white/60 text-xs mb-1">Total Buys</div>
            <div className="text-[#21e786] text-lg font-bold">
              {stats.totalBuys}
            </div>
            <div className="text-white/40 text-xs mt-1">Purchase events</div>
          </div>

          <div className="bg-white/5 p-3 rounded border border-white/10">
            <div className="text-white/60 text-xs mb-1">Total Redeems</div>
            <div className="text-red-400 text-lg font-bold">
              {stats.totalRedeems}
            </div>
            <div className="text-white/40 text-xs mt-1">Redemption events</div>
          </div>

          <div className="bg-white/5 p-3 rounded border border-white/10">
            <div className="text-white/60 text-xs mb-1">Unique Users</div>
            <div className="text-white text-lg font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-[#21e786]" />
              {stats.uniqueUsers}
            </div>
            <div className="text-white/40 text-xs mt-1">Participants</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-white/60">
            Range: {stats.lowestShares.toFixed(3)} -{" "}
            {stats.highestShares.toFixed(3)} shares
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="shareGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#21e786" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#21e786" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fill: "#999", fontSize: 12 }}
              stroke="#444"
            />
            <YAxis
              tick={{ fill: "#999", fontSize: 12 }}
              stroke="#444"
              tickFormatter={(value) => value.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="totalShares"
              stroke="#21e786"
              strokeWidth={2}
              fill="url(#shareGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#21e786] rounded-full"></div>
            <span className="text-white/60">Total Shares</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#21e786] rounded-full opacity-30"></div>
            <span className="text-white/60">Fill Area</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultShareChart;
