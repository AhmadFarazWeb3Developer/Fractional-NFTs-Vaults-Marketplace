import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
  const [data, setData] = useState<{ time: string; totalShares: number }[]>([]);

  useEffect(() => {
    const fetchShareEvents = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL_V1}/vault-events/${vaultAddress}`
        );
        const events: ShareEvent[] = await res.json();

        console.log(events);

        let total = 0;

        const chartData = events
          .sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
          .map((e, idx) => {
            const shares = Number(e.sharesChange.$numberDecimal);

            total += e.type === "buy" ? shares : -shares;

            return {
              time: new Date(e.timestamp).toLocaleDateString(),
              totalShares: total,
            };
          });

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchShareEvents();
  }, [vaultAddress]);

  return (
    <div className="bg-black border border-white/15 p-6 mt-6">
      <h3 className="text-lg text-white mb-2 font-poppins">
        Share Trading History
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#21e786",
              color: "#000",
              fontFamily: "poppins",
            }}
          />
          <Line
            type="monotone"
            dataKey="totalShares"
            stroke="#21e786"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VaultShareChart;
