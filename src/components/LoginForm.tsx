import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongData, setWrongData] = useState(false);
  const [emptyDate, setEmptyDate] = useState(false);

  const history = useNavigate();

  const handleSubmit = () => {
    if (email === "" || password === "") {
      setEmptyDate(true);
      return;
    }
    setWrongData(false);
    setEmptyDate(false);

    api.get("/user").then((res) => {
      if (email === res.data.email && password === res.data.password) {
        setWrongData(false);
        history("/main");
      } else {
        setWrongData(true);
      }
    });
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="bg-gray-800 w-96 p-6 rounded shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://logolook.net/wp-content/uploads/2021/12/Gryffindor-Logo.png"
              className="h-32"
              alt="logo"
            />
          </div>
          {emptyDate ? (
            <div className="bg-red-500 px-3 py-2 rounded text-gray-100 mb-3">
              <p>Empty data!</p>
            </div>
          ) : (
            ""
          )}
          {wrongData ? (
            <div className="bg-red-500 px-3 py-2 rounded text-gray-100 mb-3">
              <p>Wrong data entered!</p>
            </div>
          ) : (
            ""
          )}
          <label htmlFor="email" className="text-gray-100">
            Email
            <input
              id="email"
              type="email"
              minLength={5}
              value={email || ""}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full py-2 bg-gray-100 text-slate-900 px-1 outline-none mb-4"
            />
          </label>
          <label htmlFor="password" className="text-gray-100">
            Password
            <input
              id="password"
              type="password"
              minLength={3}
              value={password || ""}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full py-2 bg-gray-100 text-slate-900 px-1 outline-none mb-4"
            />
          </label>
          <button
            className="bg-gray-700 w-full text-gray-100 py-2 rounded hover:bg-gray-600 transition-colors"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
