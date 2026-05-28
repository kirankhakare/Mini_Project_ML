import { useEffect, useState } from "react";

import API from "../services/api";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend

} from "recharts";


function Dashboard() {

  // Logged-in User

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // Dashboard State

  const [stats, setStats] = useState({

    totalPredictions: 0,

    latestResult: "N/A",

    accuracy: 0,

    passCount: 0,

    failCount: 0,

    predictions: []

  });


  // Fetch Dashboard Data

  useEffect(() => {

    fetchDashboardStats();

  }, []);


  const fetchDashboardStats = async () => {

    try {

      const token = localStorage.getItem("token");


      const response = await API.get(

        "/history/dashboard-stats",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );


      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  // Pie Chart Data

  const pieData = [

    {
      name: "Pass",
      value: stats.passCount
    },

    {
      name: "Fail",
      value: stats.failCount
    }

  ];


  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Welcome Section */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">

          Welcome,
          {" "}

          <span className="text-indigo-600">

            {user?.name}

          </span>

          👋

        </h1>

        <p className="text-gray-500 mt-2">

          Track your student performance predictions and analytics.

        </p>

      </div>


      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {/* Total Predictions */}

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-indigo-500 hover:shadow-2xl transition">

          <h2 className="text-lg font-semibold text-gray-600">

            Total Predictions

          </h2>

          <p className="text-5xl mt-5 font-bold text-indigo-600">

            {stats.totalPredictions}

          </p>

        </div>


        {/* Latest Result */}

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500 hover:shadow-2xl transition">

          <h2 className="text-lg font-semibold text-gray-600">

            Latest Result

          </h2>

          <p className="text-5xl mt-5 font-bold text-green-600">

            {stats.latestResult}

          </p>

        </div>


        {/* Accuracy */}

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 hover:shadow-2xl transition">

          <h2 className="text-lg font-semibold text-gray-600">

            Accuracy

          </h2>

          <p className="text-5xl mt-5 font-bold text-purple-600">

            {stats.accuracy}%

          </p>

        </div>

      </div>


      {/* Charts Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">

            Pass vs Fail Analysis

          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie

                data={pieData}

                dataKey="value"

                nameKey="name"

                cx="50%"

                cy="50%"

                outerRadius={120}

                label

              >

                <Cell fill="#22c55e" />

                <Cell fill="#ef4444" />

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>


        {/* Bar Chart */}

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">

            Study Hours vs Attendance

          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart

              data={stats.predictions}

              margin={{

                top: 20,

                right: 30,

                left: 0,

                bottom: 5

              }}

            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="study_hours" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar

                dataKey="attendance"

                fill="#6366f1"

                radius={[10, 10, 0, 0]}

              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* Recent Predictions */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">

          Recent Predictions

        </h2>


        {
          stats.predictions.length === 0 ? (

            <div className="bg-white p-6 rounded-2xl shadow-lg text-gray-500">

              No predictions found.

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {
                stats.predictions.slice(0, 3).map((item) => (

                  <div

                    key={item._id}

                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"

                  >

                    <h3 className="text-2xl font-bold text-indigo-600 mb-4">

                      {item.prediction}

                    </h3>

                    <div className="space-y-2 text-gray-700">

                      <p>

                        <span className="font-semibold">

                          Study Hours:

                        </span>

                        {" "}

                        {item.study_hours}

                      </p>

                      <p>

                        <span className="font-semibold">

                          Attendance:

                        </span>

                        {" "}

                        {item.attendance}%

                      </p>

                      <p>

                        <span className="font-semibold">

                          Recommendation:

                        </span>

                        {" "}

                        {item.recommendation}

                      </p>

                    </div>

                    <p className="text-sm text-gray-500 mt-4">

                      {
                        new Date(
                          item.createdAt
                        ).toLocaleString()
                      }

                    </p>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </div>
  );
}

export default Dashboard;