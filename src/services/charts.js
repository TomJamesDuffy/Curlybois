import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = [
  "#E7CD92",
  "#FFF3D7",
  "#FFEBBE",
  "#CEAE68",
  "#B28E3F",
  "#FFF5BE",
  "#FFEBD7",
  "#B2773F"
];

const SimplePieChart = ({ data }) => {
  return (
    <PieChart width={240} height={220}>
      <Pie
        dataKey={"value"}
        isAnimationActive={false}
        data={data}
        cx={110}
        cy={120}
        outerRadius={80}
        fill="#8884d8"
        label
      />
      {data.map((entry, index) => (
        <Cell fill={COLORS[index % COLORS.length]} />
      ))}
    </PieChart>
  );
};

export default SimplePieChart;
