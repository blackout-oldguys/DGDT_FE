import React from 'react';

function Loading() {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center">
      <div className="text-center">
        <svg width="200" height="100" viewBox="0 0 200 100" className="mb-4">
          {/* 정자 이동 경로 */}
          <path
            id="motionPath"
            d="M 20,50 C 50,40 150,60 180,50"
            fill="none"
            stroke="transparent"
          />
          
          {/* 정자 모양 */}
          <g id="sperm">
            {/* 정자 머리 - 타원형 */}
            <ellipse cx="0" cy="0" rx="6" ry="4" fill="#2563eb" />
            
            {/* 첨체(선두부) */}
            <path
              d="M 6,-2 L 8,0 L 6,2 Z"
              fill="#2563eb"
            />
            
            {/* 꼬리 */}
            <path
              d="M -2,0 Q -10,8 -15,0 Q -20,-8 -25,0"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
            >
              <animate
                attributeName="d"
                dur="0.5s"
                repeatCount="indefinite"
                values="
                  M -2,0 Q -10,8 -15,0 Q -20,-8 -25,0;
                  M -2,0 Q -10,-8 -15,0 Q -20,8 -25,0;
                  M -2,0 Q -10,8 -15,0 Q -20,-8 -25,0
                "
              />
            </path>
          </g>
          
          {/* 정자 이동 애니메이션 */}
          <animateMotion
            href="#sperm"
            dur="3s"
            repeatCount="indefinite"
            path="M 20,50 C 50,40 150,60 180,50"
            rotate="auto"
          >
            <mpath href="#motionPath" />
          </animateMotion>
        </svg>
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;