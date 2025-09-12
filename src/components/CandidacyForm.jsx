import { useEffect, useState } from "react";
import CountDown from "./CountDown";
import Navbar from "./Navbar";

export default function CandidacyForm() {
  const [candidacyOpened, setCandidacyOpened] = useState(false);
  // const [closeDate, setCloseDate] = useState("");

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const data = JSON.parse(localStorage.getItem("candidacyData"));
  const closeDate = data?.closeFileDate;
  useEffect(() => {
    if (data && data.filingStatus === "open") {
      setCandidacyOpened(true);
      // setShowCandidacyForm(false);
    } else {
      setCandidacyOpened(false);
      // setShowCandidacyForm(true);
    }
  }, [data]);

  // Update countdown every second
  useEffect(() => {
    if (!candidacyOpened || !closeDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(closeDate);
      const diff = Math.max(0, end - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [candidacyOpened, closeDate]);
  const dept = "SSG";
  return (
    <div className="min-h-screen bg-base-200 w-full overflow-auto">
      <Navbar />
      <div className="mt-20 flex justify-center">
        <CountDown countdown={countdown} dept={dept}  />
      </div>
      <div className="px-6 md:px-20 py-8 flex flex-col justify-center">
        <form action="" className="border-2  rounded-md border-base-300 ">
          <div className="text-center text-2xl py-4 border-b-2 border-base-300 mb-2">
            Candidacy Form
          </div>
          <div className="w-full p-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-4 rounded-md">
              <div>
                <label htmlFor="" className="text-xs">
                  Student ID
                </label>
                <input
                  type="text"
                  placeholder="ID"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="" className="text-xs">
                  Date
                </label>
                <input
                  type="text"
                  placeholder="Date"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="" className="text-xs">
                  Position
                </label>
                <input
                  type="text"
                  placeholder="Position"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="" className="text-xs">
                  Department/Course
                </label>
                <input
                  type="text"
                  placeholder="ID"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm">Tell us about yourself</div>
              <textarea
                name=""
                id=""
                className="border w-full rounded-md text-sm p-4"
                placeholder="Enter a brief description"
              ></textarea>
            </div>
            <div className="mt-4">
              <div className="text-sm">Purpose of filing</div>
              <textarea
                name=""
                id=""
                className="border w-full rounded-md text-sm p-4"
                placeholder="Enter a brief description"
              ></textarea>
            </div>
            <div>
              <div className="text-sm">Attachments</div>
              <div className="h-24 flex justify-center items-center border-2 border-gray-400 border-dashed rounded-md">
                Attachments
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center p-6">
            <button className="btn btn-error">Submit Candidacy</button>
            <button className="btn ">Clear Form</button>
          </div>
        </form>
      </div>
    </div>
  );
}
