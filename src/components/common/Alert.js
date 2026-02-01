import React from "react";
import { XCircle, CheckCircle, AlertCircle } from "lucide-react";

const Alert = ({ type = "info", message }) => {
  const styles = {
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const icons = {
    error: <XCircle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />,
  };

  return (
    <div
      className={`flex items-center gap-2 p-3 border rounded-lg ${styles[type]}`}
    >
      {icons[type]}
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Alert;
