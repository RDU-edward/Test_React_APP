import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 w-full">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="ID"
              className="input input-bordered w-full"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>
          <div className="text-center w-full mt-4">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="link link-hover font-medium text-blue-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
