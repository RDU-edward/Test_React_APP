import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import testImage from "../assets/unsplash.jpg";
import Loader from "../components/Loader";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("User", "Admin");
      navigate("/admin");

      setIsLoading(false);
    }, 10000);
    // Add admin login logic
  };

  const studentLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("User", "Student");
      navigate("/student/homepage");

      setIsLoading(false);
    }, 10000);
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     // perform login
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-500 to-black">
      {/* Centered Loader with disabled backdrop click */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-75">
          {/* Prevent interaction with content behind */}
          <div className="pointer-events-none">
            <Loader />
          </div>
        </div>
      )}

      {/* Main Login Card & Side Info Section */}
      <div className="flex min-h-screen">
        {/* Login Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="card w-96 bg-base-100 shadow-xl z-10">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl tracking-widest">
                Smart Vote
              </h2>
              <form className="space-y-4 mt-6">
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
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  onClick={studentLogin}
                >
                  Login as Student
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

        {/* Right Side Info Section */}
        <div className="relative w-1/2 py-8 px-12 hidden md:flex flex-col overflow-hidden">
          {/* Background image */}
          <img
            src={testImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-1 opacity-40 blur-xs"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-5 z-0"></div>

          {/* Text content */}
          <div className="relative z-20 mt-20 text-4xl font-bold tracking-wider text-white">
            "Empowering Every Student Voice — Vote Anytime, Anywhere."
          </div>
          <div className="relative z-20 mt-10 text-justify text-2xl font-bold italic text-white">
            Welcome to Smart Vote
          </div>
          <div className="text-base mt-4 text-justify text-white">
            The innovative online voting system designed to streamline and
            secure the election process for our school community. With Smart
            Vote, students can easily register as voters,
          </div>
        </div>
      </div>
    </div>
  );
}
