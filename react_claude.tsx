import React from 'react';

const TetFestivalCompactTimeline = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-4 rounded-xl shadow-md max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold text-red-700 text-center mb-4">Phiên Chợ Tết: 2023-2025</h1>
      
      <div className="relative flex flex-col items-center">
        {/* Timeline Background */}
        <div className="absolute w-1 bg-red-400 top-0 bottom-0 h-110vh z-0"></div>
        
        {/* 2023 */}
        <div className="z-10 w-full flex items-center justify-center mb-5">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold border-4 border-white">
            23
          </div>
        </div>
        
        <div className="z-10 w-full flex mb-8">
          <div className="w-1/2 pr-6 flex justify-end">
            <div>
              <h2 className="text-lg font-bold text-red-800">
                <span className="text-green-600">🌱</span> 2023: Khởi Đầu
              </h2>
              <div className="bg-blue-100 mt-2 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">👥</span>
                <span className="font-medium text-blue-800">Khách hàng: 730</span>
              </div>
              <div className="bg-red-100 mt-1 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">🎁</span>
                <span className="font-medium text-red-800">Hàng hóa: 8.213</span>
              </div>
            </div>
          </div>
          
          <div className="w-1/2 pl-6">
            <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center">
              <span className="mr-1">🏪</span>
              <span className="font-medium text-yellow-800">Gian hàng: 18</span>
            </div>
            <div className="bg-green-100 mt-1 px-3 py-1 rounded-full flex items-center">
              <span className="mr-1">👨‍🔧</span>
              <span className="font-medium text-green-800">TNV: 80</span>
            </div>
          </div>
        </div>
        
        {/* 2024 */}
        <div className="z-10 w-full flex items-center justify-center mb-5">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold border-4 border-white">
            24
          </div>
        </div>
        
        <div className="z-10 w-full flex mb-8">
          <div className="w-1/2 pr-6 flex justify-end">
            <div>
              <h2 className="text-lg font-bold text-red-800">
                <span className="text-pink-500">🚀</span> 2024: Phát Triển
              </h2>
              <div className="bg-blue-100 mt-2 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">👥</span>
                <span className="font-medium text-blue-800">Khách hàng: 1.500</span>
              </div>
              <div className="bg-red-100 mt-1 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">🎁</span>
                <span className="font-medium text-red-800">Hàng hóa: 15.596</span>
              </div>
            </div>
          </div>
          
          <div className="w-1/2 pl-6">
            <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center">
              <span className="mr-1">🏪</span>
              <span className="font-medium text-yellow-800">Gian hàng: 28</span>
            </div>
            <div className="bg-green-100 mt-1 px-3 py-1 rounded-full flex items-center">
              <span className="mr-1">👨‍🔧</span>
              <span className="font-medium text-green-800">TNV: 100</span>
            </div>
          </div>
        </div>
        
        {/* 2025 */}
        <div className="z-10 w-full flex items-center justify-center mb-5">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold border-4 border-white">
            25
          </div>
        </div>
        
        <div className="z-10 w-full flex">
          <div className="w-1/2 pr-6 flex justify-end">
            <div>
              <h2 className="text-lg font-bold text-red-800">
                <span className="text-yellow-500">⭐</span> 2025: Chuyển Đổi
              </h2>
              <div className="bg-blue-100 mt-2 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">👥</span>
                <span className="font-medium text-blue-800">Khách hàng: 1.309</span>
              </div>
              <div className="bg-red-100 mt-1 px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">🎁</span>
                <span className="font-medium text-red-800">Hàng hóa: 13.914</span>
              </div>
            </div>
          </div>
          
          <div className="w-1/2 pl-6">
            <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center">
              <span className="mr-1">🏪</span>
              <span className="font-medium text-yellow-800">Gian hàng: 28</span>
            </div>
            <div className="bg-green-100 mt-1 px-3 py-1 rounded-full flex items-center">
              <span className="mr-1">👨‍🔧</span>
              <span className="font-medium text-green-800">TNV: 150</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-6">
        🧧 Chúc Mừng Năm Mới 🧧
      </div>
      
      {/* Indicator that timeline continues */}
      <div className="flex justify-center mt-2 mb-2">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full mt-1"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default TetFestivalCompactTimeline;
