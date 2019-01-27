import React from "react";
import styles from "./InfoPanel.styles";
import SimplePieChart from "../../services/charts";

const InfoPanel = ({ pieData, textData, heading }) => {
  const pieDataExists = pieData && pieData.length > 0;
  const textDataExists = textData && textData.length > 0;
  const presentTextList = () => {
    return textData.map((line, index) => {
      return (
        <p style={styles.displayText}>
          {" "}
          {index + 1}. {line.name || line[0]} {line.value || line[1]}{" "}
        </p>
      );
    });
  };
  return (
    <div style={styles.panel}>
      <h5 className="heading">{heading}</h5>
      {pieDataExists && <SimplePieChart data={pieData} />}
      {textDataExists && presentTextList()}
    </div>
  );
};

export default InfoPanel;
