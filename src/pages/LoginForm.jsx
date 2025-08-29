import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  const handleAdminLogin = () => {
    // Add admin login logic here
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 w-full">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline bg-orange-700 text-white w-full"
              onClick={handleAdminLogin}
            >
              Login as Admin
            </button>
          </form>
          <div className="text-center w-full mt-4">
            Don't have an account?&nbsp;
            <Link
              to="/register"
              className="link link-hover font-medium text-blue-600"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
