import { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/transactions/stats/dashboard");
      setStats(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "No data available"}
        </div>
      </div>
    );
  }

  const lineChartData = {
    labels: stats.monthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Income",
        data: stats.monthlyData.map((d) => d.income),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
      },
      {
        label: "Expense",
        data: stats.monthlyData.map((d) => d.expense),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(stats.expensesByCategory),
    datasets: [
      {
        data: Object.values(stats.expensesByCategory),
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xl">
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 mb-1">Total Income</p>
              <p className="text-3xl font-bold">
                ${stats.totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-linear-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 mb-1">Total Expense</p>
              <p className="text-3xl font-bold">
                ${stats.totalExpense.toFixed(2)}
              </p>
            </div>
            <div className="text-4xl">💸</div>
          </div>
        </div>

        <div
          className={`bg-linear-to-br rounded-xl p-6 text-white shadow-lg ${
            stats.balance >= 0
              ? "from-blue-500 to-blue-600"
              : "from-orange-500 to-orange-600"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Balance</p>
              <p className="text-3xl font-bold">${stats.balance.toFixed(2)}</p>
            </div>
            <div className="text-4xl">{stats.balance >= 0 ? "✅" : "⚠️"}</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Income vs Expense
          </h2>
          {stats.monthlyData.length > 0 ? (
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No data available for chart
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Expenses by Category
          </h2>
          {Object.keys(stats.expensesByCategory).length > 0 ? (
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No expense data available
            </p>
          )}
        </div>
      </div>

      {/* Recent Transactions Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-800">
              {stats.monthlyData.reduce(
                (sum, d) => sum + d.income + d.expense,
                0
              ) > 0
                ? "Active"
                : "None"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Categories</p>
            <p className="text-2xl font-bold text-gray-800">
              {Object.keys(stats.expensesByCategory).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
