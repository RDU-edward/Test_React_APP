import React from "react";

const CountDown = ({ countdown, dept }) => {
  return (
    <div className=" flex flex-col items-center">
      <div className="text-xl font-semibold mb-2">{dept} Filing Closes In:</div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": countdown.days }}></span>
          </span>
          <span className="text-xs">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": countdown.hours }}></span>
          </span>
          <span className="text-xs">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": countdown.minutes }}></span>
          </span>
          <span className="text-xs">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": countdown.seconds }}></span>
          </span>
          <span className="text-xs">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
