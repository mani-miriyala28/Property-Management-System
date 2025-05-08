import React, { useRef, useState, useEffect } from "react";

interface OTPWidgetProps {
  length?: number; // Default to 4 digits
  onChange: (otp: string) => void;
  error?: boolean; // Prop to indicate if there's an error
  errorMessage?: string; // Error message to display
  onResend?: () => void; // Callback for resend OTP
}

const OTPWidget: React.FC<OTPWidgetProps> = ({
  length = 4,
  onChange,
  error = false,
  errorMessage = "Invalid OTP",
  onResend,
}) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [otpArray, setOtpArray] = useState<string[]>(Array(length).fill(""));
  const [timer, setTimer] = useState(30); // Timer for resend OTP
  const [canResend, setCanResend] = useState(false); // Resend button state

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval on unmount
    } else {
      setCanResend(true); // Enable resend button when timer reaches 0
    }
  }, [timer]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d$/.test(value) && value !== "") return; // Allow only digits

    const updatedOtpArray = [...otpArray];
    updatedOtpArray[index] = value;
    setOtpArray(updatedOtpArray);
    onChange(updatedOtpArray.join(""));

    // Move to the next input box if a digit is entered
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !inputsRef.current[index]?.value &&
      index > 0
    ) {
      // Move to the previous input box on Backspace if the current box is empty
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return; // Allow only digits

    const updatedOtpArray = pastedData.split("");
    updatedOtpArray.forEach((digit, idx) => {
      if (inputsRef.current[idx]) {
        inputsRef.current[idx].value = digit;
      }
    });
    setOtpArray(updatedOtpArray);
    onChange(updatedOtpArray.join(""));

    // Focus the last filled input box
    const lastIndex = Math.min(updatedOtpArray.length, length) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  const handleResend = () => {
    if (onResend) {
      onResend(); // Trigger the resend callback
    }
    setTimer(30); // Reset the timer
    setCanResend(false); // Disable resend button
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            ref={(el) => (inputsRef.current[index] = el!)}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      <div className="mt-4">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-gray-500 text-sm">Resend OTP in {timer} seconds</p>
        )}
      </div>
    </div>
  );
};

export default OTPWidget;
