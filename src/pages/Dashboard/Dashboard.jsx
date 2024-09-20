import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const incomeByMonth = [
  { month: "January", income: 10000 },
  { month: "February", income: 12000 },
  { month: "March", income: 9000 },
  { month: "April", income: 15000 },
  { month: "May", income: 13000 },
];

const salesByCategory = [
  { category: "Electronics", sales: 20000 },
  { category: "Clothing", sales: 15000 },
  { category: "Home & Kitchen", sales: 12000 },
  { category: "Books", sales: 5000 },
  { category: "Sports", sales: 8000 },
];

const ordersByMonth = [
  { month: "January", orders: 300 },
  { month: "February", orders: 320 },
  { month: "March", orders: 250 },
  { month: "April", orders: 400 },
  { month: "May", orders: 350 },
];

const topProducts = [
  { product: "Smartphone", sales: 5000 },
  { product: "Laptop", sales: 4000 },
  { product: "Headphones", sales: 3000 },
  { product: "Smartwatch", sales: 2000 },
  { product: "Camera", sales: 1500 },
];

const Dashboard = () => {
  // Data for the income by month bar chart
  const incomeData = {
    labels: incomeByMonth.map((data) => data.month),
    datasets: [
      {
        label: "Income by Month",
        data: incomeByMonth.map((data) => data.income),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the sales by category pie chart
  const categoryData = {
    labels: salesByCategory.map((data) => data.category),
    datasets: [
      {
        label: "Sales by Category",
        data: salesByCategory.map((data) => data.sales),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for the orders by month line chart
  const ordersData = {
    labels: ordersByMonth.map((data) => data.month),
    datasets: [
      {
        label: "Orders by Month",
        data: ordersByMonth.map((data) => data.orders),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h2>Income by Month</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          {incomeByMonth.map((data, index) => (
            <tr key={index}>
              <td>{data.month}</td>
              <td>${data.income}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Income by Month (Chart)</h2>
      <div style={{ width: "600px", height: "400px" }}>
        <Bar
          data={incomeData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      <h2>Sales by Category (Chart)</h2>
      <div style={{ width: "600px", height: "400px" }}>
        <Pie
          data={categoryData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      <h2>Orders by Month</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {ordersByMonth.map((data, index) => (
            <tr key={index}>
              <td>{data.month}</td>
              <td>{data.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Orders by Month (Chart)</h2>
      <div style={{ width: "600px", height: "400px" }}>
        <Line
          data={ordersData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      <h2>Top Products</h2>
      <ul>
        {topProducts.map((data, index) => (
          <li key={index}>
            {data.product}: ${data.sales}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
