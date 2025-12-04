import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import {
  FaCheckCircle,
  FaChevronCircleLeft,
  FaChevronLeft,
} from "react-icons/fa";
import { FaArrowLeftLong, FaCircleXmark } from "react-icons/fa6";
import CountDown from "../components/CountDown";
import ElectionCountdown from "../components/ElectionCountdown";
import Footer from "../components/Footer";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

export default function SmartvoteElection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [role, setRole] = useState("president"); // Added role state
  const [candidates, setCandidates] = useState(null);
  const [tabActive, setTabActive] = useState("tab1");
  const [isLoading, setIsLoading] = useState(false);

  //?facial

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("Loading models...");
  const [isModelsReady, setIsModelsReady] = useState(false);
  const [openCam, setOpenCam] = useState(false);
  const [isFaceMatched, setIsFaceMatched] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "",
  }); // {message, type}

  const dept = tabActive == "tab1" ? "SSG" : "BSIT";
  const studentData = JSON.parse(localStorage.getItem("UserData"));

  const [votersData, setVotersData] = useState({
    student_id: studentData?.student_id,
    voters_id: studentData?.voters_id,
    fullname: studentData?.firstname + " " + studentData.lastname,
    email: studentData?.email,
    department: studentData?.department,
    election_type: "",
    president: "",
    vice_president: "",
    secretary: "",
  });

  const [emptyFields, setEmptyFields] = useState({
    president: false,
    vice_president: false,
    secretary: false,
  });

  const handleTabClick = (tab) => {
    // Switch the tab
    setTabActive(tab);
    setVotersData({
      ...votersData,
      president: "",
      vice_president: "",
      secretary: "",
    });
  };

  const getCandidates = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3004/smart-vote/approved-candidates/${dept}`
      );
      if (response.data.success === true) {
        setCandidates(response.data.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const filteredPresident = candidates?.filter(
    (candidate) => candidate.position === "President"
  );
  const filteredVicePres = candidates?.filter(
    (candidate) => candidate.position === "Vice President"
  );
  const filteredSecretary = candidates?.filter(
    (candidate) => candidate.position === "Secretary"
  );

  // console.log(filteredSsgCandidates);

  // console.log(candidates);

  // Data for each role, you can customize as needed
  const roleData = {
    president: filteredPresident,
    "vice-president": filteredVicePres,
    secretary: filteredSecretary,
    // president: [
    //   {
    //     id: 1,
    //     title: "Party A",
    //     image:
    //       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, atque perspiciatis cupiditate fuga soluta tenetur in laudantium tempore incidunt voluptatem. Natus facilis cupiditate omnis itaque nesciunt possimus aliquam nulla aliquid?",
    //   },
    //   {
    //     id: 2,
    //     title: "Party B",
    //     image:
    //       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    //     description:
    //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, atque perspiciatis cupiditate fuga soluta tenetur in laudantium tempore incidunt voluptatem. Natus facilis cupiditate omnis itaque nesciunt possimus aliquam nulla aliquid?.",
    //   },
    // ],
    // "vice-president": [
    //   {
    //     id: 3,
    //     title: "Party C",
    //     image:
    //       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    //     description:
    //       "Vice President candidate info. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   },
    //   {
    //     id: 4,
    //     title: "Party C",
    //     image:
    //       "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    //     description:
    //       "Vice President candidate info. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   },
    // ],
  };

  // Map role to display text
  const roleDisplayName = {
    president: "-- PRESIDENT --",
    "vice-president": "-- VICE PRESIDENT --",
    secretary: "-- SECRETARY --",
  };
  const [showVotersForm, setShowVotersForm] = useState(false);
  // Handle Next button click
  const handleNext = () => {
    switch (role) {
      case "president":
        setRole("vice-president");
        break;
      case "vice-president":
        setRole("secretary");
        break;
      case "secretary":
        // setRole("secretary");
        setShowVotersForm(true);

        break;
      default:
        setRole("president");
    }
    setActiveCard(null); // close modal if open when switching role
  };

  // Handle Previous button click
  const handlePrevious = () => {
    switch (role) {
      case "president":
        setRole("president");
        break;
      case "vice-president":
        setRole("president");
        break;
      case "secretary":
        setRole("vice-president");
        break;
      default:
        setRole("president");
    }
    setActiveCard(null); // close modal if open when switching role
  };

  const cards = roleData[role];

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const data = [
    {
      adminId: "test1",
      adminPassword: "testpass",
      closeFileDate: "2025-09-18T16:59",
      department: "SSG",
      filingStatus: "open",
    },
    {
      adminId: "test1",
      adminPassword: "testpass",
      closeFileDate: "2025-09-18T16:40",
      department: "BSIT",
      filingStatus: "open",
    },
  ];

  const getCloseElectionDate =
    tabActive == "tab1" ? data[0]?.closeFileDate : data[1]?.closeFileDate;
  const getFilingStatus =
    tabActive == "tab1" ? data[0]?.filingStatus : data[1]?.filingStatus;

  const closeDate = getCloseElectionDate;

  useEffect(() => {
    // if (!candidacyOpened || !closeDate) return;

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
  }, [closeDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVotersData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setVotersData({
      ...votersData,
      president: "",
      vice_president: "",
      secretary: "",
    });
  };

  const handleSubmitVote = async (e) => {
    e.preventDefault();

    // console.log({ ...votersData, election_type: dept });
    // console.log(dept);

    const requiredFields = ["president", "vice_president", "secretary"];

    let newEmptyFields = { ...emptyFields };
    // Check if any required field is empty and mark it in the state
    requiredFields.forEach((field) => {
      newEmptyFields[field] = !votersData[field];
    });

    setEmptyFields(newEmptyFields);

    // If any field is empty, prevent submission
    if (requiredFields.some((field) => !votersData[field])) {
      console.log("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3004/smart-vote/insert-votes",
        { ...votersData, election_type: dept }
      );

      if (response.data.success === true) {
        setTimeout(() => {
          setIsLoading(false);
          setResponseMessage({
            message: response.data.message || "Registration successful!",
            type: "success", // or any other type for styling
          });
          handleClear();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 3000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setResponseMessage({
            message: response.data.message || "Registration failed.",
            type: "error",
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 3000);
      }
      // Set a timeout to remove the responseMessage after 5 seconds
      setTimeout(() => {
        setResponseMessage({ message: "", type: "" }); // Clear message after 5 seconds
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      console.error(error);
    }
  };

  const facial_descriptor = studentData?.face_descriptor.split(",");
  const handleVerifyFace = () => {
    setOpenCam(true);
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
        setStatus("Models loaded ✅");
        setIsModelsReady(true);
      } catch (err) {
        setStatus("Failed to load models ❌");
        console.error(err);
      }
    };
    loadModels();
  }, []);
  // console.log(userdata);

  // Run face verification only for the logged-in user's descriptor
  useEffect(() => {
    if (!isModelsReady || !studentData || !facial_descriptor) return;

    const targetDescriptor = new Float32Array(facial_descriptor);
    const labeledDescriptor = new faceapi.LabeledFaceDescriptors(
      studentData.student_id,
      [targetDescriptor]
    );

    const matcher = new faceapi.FaceMatcher([labeledDescriptor], 0.6);

    const interval = setInterval(async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;

        const detections = await faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const dims = {
          width: video.videoWidth,
          height: video.videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, dims);
        const resized = faceapi.resizeResults(detections, dims);
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, dims.width, dims.height);

        resized.forEach((det) => {
          const match = matcher.findBestMatch(det.descriptor);
          const { box } = det.detection;

          const drawBox = new faceapi.draw.DrawBox(box, {
            label: match.toString(),
          });
          drawBox.draw(canvasRef.current);

          if (match.label === studentData.student_id) {
            setIsFaceMatched(true);
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isModelsReady, studentData]);

  // Handle successful face match
  useEffect(() => {
    if (isFaceMatched && studentData) {
      setTimeout(() => {
        setOpenCam(false);
        setHideButton(true);
      }, 5000);
    }
    console.log("Matche");
    console.log(hideButton);
  }, [isFaceMatched]);

  if (openCam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 space-y-4">
        <h1 className="text-2xl text-gray-600 font-bold">
          Verifying Facial Recognition
        </h1>
        <div className="relative w-[640px] h-[480px]">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
            videoConstraints={{ facingMode: "user" }}
            className="rounded shadow"
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="absolute top-0 left-0 z-10"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200 w-full overflow-auto">
      <Navbar />
      <div className="mt-20 flex justify-center">
        {getFilingStatus === "open" ? (
          <ElectionCountdown countdown={countdown} dept={dept} />
        ) : (
          <div className="text-xl mt-4 font-bold tracking-wider">
            NOT AVAILABLE
          </div>
        )}
      </div>

      {/* Loaders */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-75">
          {/* Prevent interaction with content behind */}
          <div className="pointer-events-none">
            <Loader />
          </div>
        </div>
      )}

      {/* Conditionally render the response message */}
      {responseMessage.message && (
        <div className="flex justify-center mt-4 px-4">
          <div
            className={`alert w-72 md:w-86 ${
              responseMessage.type === "success"
                ? "alert-success"
                : "alert-error"
            }`}
          >
            {responseMessage.type === "success" ? (
              <FaCheckCircle />
            ) : (
              <FaCircleXmark />
            )}

            <span>{responseMessage.message}</span>
          </div>
        </div>
      )}
      <div className="px-6 md:px-20 py-8 flex flex-col justify-center">
        <div className="">
          <button
            className={`btn border-0 rounded-none border-b-0 border-red-400 tracking-wider ${
              tabActive === "tab1" ? "btn-active border-1" : ""
            }`}
            onClick={() => handleTabClick("tab1")}
          >
            SSG Election
          </button>
          <button
            className={`btn border-0 rounded-none border-b-0 border-red-400 tracking-wider ${
              tabActive === "tab2" ? "btn-active border-1" : ""
            }`}
            onClick={() => handleTabClick("tab2")}
          >
            BSIT Election
          </button>
        </div>
        {getFilingStatus != "open" ? (
          <div className="h-96 border border-gray-500 flex justify-center items-center">
            <div className="font-semibold tracking-wider text-xl">
              Election is not available
            </div>
          </div>
        ) : (
          <>
            {showVotersForm ? (
              <div className="relative flex items-center justify-center w-full p-4 border border-gray-500">
                <div
                  className=" absolute top-0 left-0 p-2 flex items-center gap-2 cursor-pointer hover:scale-105 w-fit"
                  onClick={() => setShowVotersForm(false)}
                >
                  <FaArrowLeftLong /> Back
                </div>
                <form action="" className=" w-full rounded-md border-base-300 ">
                  <div className="text-center text-base py-4 border-b-2 border-base-300 mb-2">
                    Voters Form
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
                          value={studentData?.student_id}
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="text-xs">
                          Voters ID
                        </label>
                        <input
                          type="text"
                          placeholder="ID"
                          value={studentData?.voters_id}
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="text-xs">
                          Fullname
                        </label>
                        <input
                          type="text"
                          placeholder="fullname"
                          value={
                            studentData?.firstname + " " + studentData.lastname
                          }
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="" className="text-xs">
                          Email Address
                        </label>
                        <input
                          type="text"
                          placeholder="email"
                          value={studentData?.email}
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </div>

                      <div>
                        <label htmlFor="" className="text-xs">
                          Department/Course
                        </label>
                        <input
                          type="text"
                          value={studentData?.department}
                          placeholder="Department"
                          className="input input-bordered w-full"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
                      <div>
                        <div className="mt-4 text-sm mb-1">President</div>
                        <div
                          className={`border p-4 rounded-md ${
                            emptyFields.president ? "border-red-400" : ""
                          }`}
                        >
                          <div className="text-xs md:text-sm grid grid-cols-2 gap-4">
                            {filteredPresident.map((president, index) => (
                              <div key={index} className="flex gap-4">
                                <label htmlFor="">
                                  {president.firstname} {president.lastname}
                                </label>
                                <input
                                  type="radio"
                                  name="president"
                                  value={`${president.firstname} ${president.lastname}`} // Full name as the value
                                  className="radio radio-info"
                                  onChange={handleChange}
                                  checked={
                                    votersData.president ===
                                    `${president.firstname} ${president.lastname}`
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mt-4 text-sm mb-1">Vice President</div>
                        <div
                          className={`border p-4 rounded-md ${
                            emptyFields.vice_president ? "border-red-400" : ""
                          }`}
                        >
                          <div className="text-xs md:text-sm grid grid-cols-2 gap-4">
                            {filteredVicePres.map((vp, index) => (
                              <div key={index} className="flex gap-4">
                                <label htmlFor="">
                                  {vp.firstname} {vp.lastname}
                                </label>
                                <input
                                  type="radio"
                                  name="vice_president"
                                  value={`${vp.firstname} ${vp.lastname}`} // Full name as the value
                                  className="radio radio-info"
                                  onChange={handleChange}
                                  checked={
                                    votersData.vice_president ===
                                    `${vp.firstname} ${vp.lastname}`
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
                      <div>
                        <div className="mt-4 text-sm mb-1">Secretary</div>
                        <div
                          className={`border p-4 rounded-md ${
                            emptyFields.secretary ? "border-red-400" : ""
                          }`}
                        >
                          <div className="text-xs md:text-sm grid grid-cols-2 gap-4">
                            {filteredSecretary.map((secretary, index) => (
                              <div key={index} className="flex gap-4">
                                <label htmlFor="">
                                  {secretary.firstname} {secretary.lastname}
                                </label>
                                <input
                                  type="radio"
                                  name="secretary"
                                  value={`${secretary.firstname} ${secretary.lastname}`} // Full name as the value
                                  className="radio radio-info"
                                  onChange={handleChange}
                                  checked={
                                    votersData.secretary ===
                                    `${secretary.firstname} ${secretary.lastname}`
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!hideButton && (
                    <div className="flex justify-center">
                      <div
                        className="btn btn-warning text-white mx-auto w-full"
                        onClick={handleVerifyFace}
                      >
                        Verify Face
                      </div>
                    </div>
                  )}

                  {/* show button */}
                  {hideButton && (
                    <>
                      <div className="text-center text-green-500 font-bold">
                        ✅ Face Verified
                      </div>
                      <div className="flex gap-2 justify-between p-5">
                        <button
                          className="btn btn-error"
                          onClick={handleSubmitVote}
                        >
                          Submit Vote
                        </button>
                        <div className="btn" onClick={handleClear}>
                          Clear Form
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>
            ) : (
              <div className="w-auto py-2 flex flex-col items-center justify-center  border border-gray-500">
                <div className="text-md font-bold tracking-wider mb-4 ">
                  {roleDisplayName[role]}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cards?.map((card) => (
                    <div
                      key={card.id}
                      className="card bg-base-100 w-72 shadow-sm flex-shrink-0 snap-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                    >
                      <figure>
                        <img src={card.image} alt={card.party} />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{card.party}</h2>
                        <p>
                          {card.firstname} {card.lastname}{" "}
                        </p>
                        <p>{card.department}</p>
                        <div className="card-actions justify-end">
                          <button
                            className="btn btn-outline w-full"
                            onClick={() => {
                              setActiveCard(card);
                              setIsOpen(true);
                            }}
                          >
                            Candidate Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 gap-6">
                  <button className="btn btn-outline" onClick={handlePrevious}>
                    Previous
                  </button>
                  <button
                    className="btn btn-outline w-24"
                    // disabled={disableBtn}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>

                {activeCard && (
                  <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30  backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
                      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div
                      className={`bg-base-100 p-6 rounded-lg shadow-lg w-[90%] max-w-xl transform transition-transform duration-500 ease-in-out ${
                        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                    >
                      <h2 className="text-xl mb-4 ">{activeCard.title}</h2>

                      <img
                        src={activeCard.image}
                        alt={activeCard.title}
                        className="mb-4 rounded"
                      />
                      <div className="text-xl font-bold ">John Doe</div>
                      <div className="text-xl ">BS Information Technology</div>
                      <p className="mb-4">{activeCard.description}</p>
                      <div className="w-full flex justify-end ">
                        <button
                          className="btn btn-secondary "
                          onClick={() => setIsOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className="mb-4">
        <Footer />
      </div>
    </div>
  );
}
