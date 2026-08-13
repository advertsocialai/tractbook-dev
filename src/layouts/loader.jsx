import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-[3px] border-gray-200"></div>
        
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-[3px] border-transparent border-t-blue-600 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;