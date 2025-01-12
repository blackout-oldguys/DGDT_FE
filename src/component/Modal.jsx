import { useEffect, useState } from 'react';

const Modal = ({ donor, isOpen, onClose, onTrade }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !donor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto m-4 pb-5 pt-6 px-6">
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 제목 */}
        <h2 className="text-2xl font-bold mb-3">기증자 상세 정보</h2>

        <div className="space-y-6">
          {/* 혈액 정보 섹션 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">혈액 정보</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>혈액형: {donor.bloodInfo.bloodType}</div>
              <div>HAV: {donor.bloodInfo.hav ? "양성" : "음성"}</div>
              <div>HBV: {donor.bloodInfo.hbv ? "양성" : "음성"}</div>
              <div>HCV: {donor.bloodInfo.hcv ? "양성" : "음성"}</div>
              <div>성병: {donor.bloodInfo.venerealDisease ? "양성" : "음성"}</div>
            </div>
          </div>

          {/* 정액 검사 정보 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">정액 검사 정보</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>정액량: {donor.semenTestInfo.semenVolume}ml</div>
              <div>정자 수: {donor.semenTestInfo.spermCount}/ml</div>
              <div>정자 운동성: {donor.semenTestInfo.spermMotility}</div>
              <div>정자 형태: {donor.semenTestInfo.spermShape}</div>
            </div>
          </div>

          {/* 면담 정보 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">기본 의료 정보</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium">병력</h4>
                <div className="">
                  <div>정신지체: {donor.interviewInfo.medicalHistory.mentalRetardation ? "있음" : "없음"}</div>
                  <div>정신질환: {donor.interviewInfo.medicalHistory.mentalIllness ? "있음" : "없음"}</div>
                  <div>간질: {donor.interviewInfo.medicalHistory.epilepsy ? "있음" : "없음"}</div>
                  {donor.interviewInfo.medicalHistory.otherConditions.length > 0 && (
                    <div>기타: {donor.interviewInfo.medicalHistory.otherConditions.join(", ")}</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium">과거력</h4>
                <div className="">
                  <div>약물사용: {donor.interviewInfo.pastHistory.drugUse ? "있음" : "없음"}</div>
                  {donor.interviewInfo.pastHistory.otherConditions.length > 0 && (
                    <div>기타: {donor.interviewInfo.pastHistory.otherConditions.join(", ")}</div>
                  )}
                </div>
              </div>

              {donor.interviewInfo.geneticDisorders.length > 0 && (
                <div>
                  <h4 className="font-medium">유전질환</h4>
                  <div className="ml-2">
                    {donor.interviewInfo.geneticDisorders.join(", ")}
                  </div>
                </div>
              )}

              {donor.interviewInfo.familyHistory.length > 0 && (
                <div>
                  <h4 className="font-medium">가족력</h4>
                  {donor.interviewInfo.familyHistory.map((item, index) => (
                    <div key={index} className="">
                      {item.relations}: {item.condition}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 신체 정보 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">신체 정보</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>신장: {donor.physicalInfo.height}cm</div>
              <div>체중: {donor.physicalInfo.weight}kg</div>
              <div>체형: {donor.physicalInfo.bodyType}</div>
              <div>인종: {donor.physicalInfo.ethnicity}</div>
            </div>
          </div>

          {/* 개인 정보 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2">개인 정보</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>성격: {donor.personalInfo.personality}</div>
              <div>학력: {donor.personalInfo.education}</div>
              <div>종교: {donor.personalInfo.religion}</div>
            </div>
          </div>
        </div>

        {/* 거래 버튼 */}
        <div className="flex justify-center space-x-4 my-5 ">
                <button
                  onClick={() => {setIsSubmitting(true); onTrade();}}
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold relative
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">정보 제출하기</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    </>
                  ) : (
                    "수증 신청하기"
                  )}
                </button>
              </div>
      </div>
    </div>
  );
};

export default Modal;