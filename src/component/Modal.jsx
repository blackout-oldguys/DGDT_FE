import { useEffect, useState } from 'react';

// 공통 스타일 상수
const STYLES = {
  sectionContainer: "space-y-2",
  sectionTitle: "text-lg font-semibold border-b pb-2",
  gridLayout: "grid grid-cols-4 gap-4",
  subTitle: "font-medium",
};

// 정보 섹션 컴포넌트
const InfoSection = ({ title, children }) => (
  <div className={STYLES.sectionContainer}>
    <h3 className={STYLES.sectionTitle}>{title}</h3>
    <div className={STYLES.gridLayout}>{children}</div>
  </div>
);

// 혈액 정보 컴포넌트
const BloodInfo = ({ bloodInfo }) => (
  <InfoSection title="혈액 정보">
    <div>혈액형: {bloodInfo.bloodType}</div>
    <div>HAV: {bloodInfo.hav ? "양성" : "음성"}</div>
    <div>HBV: {bloodInfo.hbv ? "양성" : "음성"}</div>
    <div>HCV: {bloodInfo.hcv ? "양성" : "음성"}</div>
    <div>성병: {bloodInfo.venerealDisease ? "양성" : "음성"}</div>
  </InfoSection>
);

// 정액 검사 정보 컴포넌트
const SemenInfo = ({ semenTestInfo }) => (
  <InfoSection title="정액 검사 정보">
    <div>정액량: {semenTestInfo.semenVolume}μl</div>
    <div>정자 수: {semenTestInfo.spermCount}마리</div>
    <div>정자 운동성: {semenTestInfo.spermMotility}</div>
    <div>정자 형태: {semenTestInfo.spermShape}</div>
  </InfoSection>
);

// 제출 버튼 컴포넌트
const SubmitButton = ({ isSubmitting, onTrade }) => (
  <button
    onClick={() => {
      onTrade();
    }}
    disabled={isSubmitting}
    className={`px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold relative
      ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'}`}
  >
    {isSubmitting ? (
      <>
        <span className="opacity-0">정보 제출하기</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
        </div>
      </>
    ) : (
      "수증 신청하기"
    )}
  </button>
);

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

  const handleSubmit = () => {
    setIsSubmitting(true);
    onTrade();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto m-4 pb-5 pt-6 px-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-3">기증자 상세 정보</h2>

        <div className="space-y-6">
          <BloodInfo bloodInfo={donor.bloodInfo} />
          <SemenInfo semenTestInfo={donor.semenTestInfo} />
          
          <InfoSection title="기본 의료 정보">
            {/* 의료 정보 내용 */}
          </InfoSection>

          <InfoSection title="신체 정보">
            <div>신장: {donor.physicalInfo.height}cm</div>
            <div>체중: {donor.physicalInfo.weight}kg</div>
            <div>체형: {donor.physicalInfo.bodyType}</div>
            <div>인종: {donor.physicalInfo.ethnicity}</div>
          </InfoSection>

          <InfoSection title="개인 정보">
            <div>성격: {donor.personalInfo.personality}</div>
            <div>학력: {donor.personalInfo.education}</div>
            <div>종교: {donor.personalInfo.religion}</div>
          </InfoSection>
        </div>

        <div className="flex justify-center space-x-4 my-5">
          <SubmitButton isSubmitting={isSubmitting} onTrade={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Modal;