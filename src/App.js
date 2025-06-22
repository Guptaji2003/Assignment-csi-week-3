import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-64 min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6 shadow-lg">
    <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
    <nav className="flex flex-col gap-4 text-lg">
      <Link to="/" className="hover:text-yellow-300 transition">Dashboard</Link>
      <Link to="/calendar" className="hover:text-yellow-300 transition">Calendar</Link>
      <Link to="/kanban" className="hover:text-yellow-300 transition">Kanban</Link>
      <Link to="/charts" className="hover:text-yellow-300 transition">Charts</Link>
      <Link to="/tables" className="hover:text-yellow-300 transition">Tables</Link>
    </nav>
  </div>
);

const Navbar = () => (
  <div className="bg-white px-5 py-7  text-2xl font-semibold border-b ">Admin Dashboard</div>
);

const Footer = () => (
  <div className="bg-white py-3 text-center text-xl text-gray-800 border-t">&copy; 2025 Dashboard. All rights reserved.</div>
);

const Dashboard = () => (
  <div className="bg-white p-6 rounded ">Welcome to the Dashboard</div>
);

const Tables = () => (
  <div className="bg-white p-6 rounded ">This is the Tables page</div>
);

const App = () => {
  return (
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 p-6 space-y-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar/>} />
                <Route path="/kanban" element={<Kanbanboard />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/tables" element={<Tables />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
  );
};

const Calendar = () => {
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1));

  return (
    <div className="grid grid-cols-7 gap-3 bg-white p-4 rounded shadow">
      {days.map((day, idx) => (
        <div
          key={idx}
          className={`border p-3 text-center rounded bg-${today.getDate()==day.getDate()?"blue-300":"gray-100"} hover:bg-blue-100 transition`}
        >
         {day.getDate()}
        </div>
      ))}
    </div>
  );
};

const Kanbanboard = () => {
  const [tasks] = React.useState({
    todo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    done: ["Task 4"]
  });

  return (
    <div className="flex gap-6">
      {Object.entries(tasks).map(([stage, items]) => (
        <div key={stage} className="flex-1 bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg border-b pb-2 mb-4 capitalize">{stage}</h2>
          {items.map((task, i) => (
            <div key={i} className="bg-gray-100 p-3 rounded mb-3 hover:bg-blue-50 transition">
              {task}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Charts = () => {
  const data = [12, 19, 3, 5];
  const labels = ["Jan", "Feb", "Mar", "Apr"];
  const max = Math.max(...data);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
      <div className="flex gap-6 items-end h-60">
        {data.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              style={{ height: `${(val / max) * 100}%` }}
              className="w-12 bg-blue-600 rounded-t"
            ></div>
            <span className="mt-2 text-sm text-gray-600">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;