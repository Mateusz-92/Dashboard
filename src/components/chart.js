import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryLegend,
} from "victory";

import styles from "./chart.module.css";

const Chart = ({ products, id, onCloseChart }) => {
  const data = products.map((product) => ({
    title: product.title,
    price: product.price,
    discountedPrice: product.discountedPrice,
  }));
  const legendData = [
    { name: "Price", symbol: { fill: "rgb(75, 192, 192)" } },
    { name: "Discounted Price", symbol: { fill: "rgb(255, 99, 132)" } },
  ];
  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <h3>Basket {id}</h3>
        <span className={styles.span} onClick={onCloseChart}>
          X
        </span>
      </div>

      <VictoryChart
        width={800}
        height={500}
        padding={{ top: 10, bottom: 380, left: 50, right: 50 }}
      >
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              angle: 0,
              verticalAnchor: "middle",
              textAnchor: "end",
              fontSize: 16,
            },
          }}
          tickFormat={(t) => `${t}`}
        />

        <VictoryScatter
          data={data}
          x="title"
          y="price"
          style={{ data: { fill: "rgb(75, 192, 192)" } }}
        />
        <VictoryScatter
          data={data}
          x="title"
          y="discountedPrice"
          style={{ data: { fill: "rgb(75, 192, 192)" } }}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              angle: -90,
              verticalAnchor: "middle",
              textAnchor: "end",
              fontSize: 16,
            },
          }}
          tickFormat={(t) => t}
        />
        <VictoryLine
          data={data}
          x="title"
          y="price"
          style={{ data: { stroke: "rgb(75, 192, 192)" } }}
          name=" Price"
        />
        <VictoryLine
          data={data}
          x="title"
          y="discountedPrice"
          style={{ data: { stroke: "rgb(255, 99, 132)" } }}
          name="Discounted Price"
        />
        <VictoryLegend
          x={50}
          y={10}
          orientation="horizontal"
          gutter={20}
          data={legendData}
        />
      </VictoryChart>
    </div>
  );
};

export default Chart;
