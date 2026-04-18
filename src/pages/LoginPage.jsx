import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import backgroundImage from "../assets/background.jpeg";

// Mock database of students
const MOCK_USERS = [
  {
    roll: "202401100200100",
    password: "Ganga@123",
    name: "Ganga Tripathi",
    email: "ganga@kiet.edu",
    branch: "CSE",
    year: "2",
  },
  {
    roll: "202401100200189",
    password: "Manish@123",
    name: "Manish Sharma",
    email: "manish.2428cse246@kiet.edu",
    branch: "CSE",
    year: "2",
  },
  {
    roll: "202401100200220",
    password: "Om@123",
    name: "Om Prakash Yadav",
    email: "om.2428cse1742@kiet.edu",
    branch: "CSE",
    year: "2",
  },
  {
    roll: "20240110020099",
    password: "Gagan@123",
    name: "Gagan Sharma",
    email: "gagan.2428cse242@kiet.edu",
    branch: "CSE",
    year: "2",
  },
];

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!roll || !password) {
      toast.error("Please enter both Roll Number and Password!");
      return;
    }

    const foundUser = MOCK_USERS.find(
      (u) => u.roll === roll && u.password === password,
    );

    if (foundUser) {
      setUser(foundUser);
      toast.success(`Welcome back, ${foundUser.name.split(" ")[0]}!`);
      navigate("/");
    } else {
      toast.error("Invalid Roll Number or Password!");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat z-50 overflow-y-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-slate-900/30 fixed"></div>

      <div className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 dark:border-slate-700/50 m-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/30">
            <span className="text-2xl">KE</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            KIET Events
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Secure student portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
              Roll Number
            </label>
            <input
              type="text"
              placeholder="e.g. 202401100200100"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none hover:-translate-y-0.5 mt-2"
          >
            Login to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/admin"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            Admin access
          </Link>
        </div>

        <div className="mt-8 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl text-xs text-slate-600 dark:text-slate-400 text-center border border-slate-200/50 dark:border-slate-700/50">
          <p
            onClick={() => setShowAccounts(!showAccounts)}
            className="font-bold mb-2 text-slate-800 dark:text-slate-200 cursor-pointer hover:text-indigo-600 transition"
          >
            Test Accounts {showAccounts ? "▲" : "▼"}
          </p>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showAccounts ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showAccounts
                  ? "max-h-[500px] opacity-100 scale-100"
                  : "max-h-0 opacity-0 scale-95"
              }`}
            >
              <div className="flex flex-col gap-1 mt-2">
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    showAccounts
                      ? "max-h-40 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  }`}
                >
                  <div className="flex flex-col gap-1 mt-2">
                    {MOCK_USERS.map((user, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setRoll(user.roll);
                          setPassword(user.password);
                          toast.success("Credentials filled!");
                        }}
                        className="cursor-pointer text-center py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-600 transition-all duration-200"
                      >
                        Roll: {user.roll} | Pass: {user.password}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}