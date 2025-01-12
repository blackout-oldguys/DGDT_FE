import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerDonor } from '../api/api';

const steps = [
  '동의서 확인',
  '개인정보 입력',
  '의료정보 입력',
  '최종 확인'
];

function RegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('홍길동');
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(183);
  const [weight, setWeight] = useState(75);
  const [bodyType, setBodyType] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [personality, setPersonality] = useState('');
  const [education, setEducation] = useState('');
  const [religion, setReligion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [medicalInfo, setMedicalInfo] = useState({
    bloodInfo: {
      bloodType: "",
      hav: false,
      hbv: false,
      hcv: false,
      venerealDisease: false
    },
    semenTestInfo: {
      semenVolume: 0,
      spermCount: 0,
      spermMotility: "",
      spermShape: ""
    },
    interviewInfo: {
      medicalHistory: {
        mentalRetardation: false,
        mentalIllness: false,
        epilepsy: false,
        otherConditions: []
      },
      pastHistory: {
        drugUse: false,
        otherConditions: []
      },
      geneticDisorders: [],
      familyHistory: []
    }
  });

  const handleCheckboxChange = (category, subCategory, field) => {
    setMedicalInfo(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: {
          ...prev[category][subCategory],
          [field]: !prev[category][subCategory][field]
        }
      }
    }));
  };

  const handleInputChange = (category, field, value) => {
    setMedicalInfo(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const finalData = {
      name,
      age,
      physicalInfo: {
        height,
        weight,
        bodyType,
        ethnicity,
        personality,
        education,
        religion
      },
      ...medicalInfo
    };

    // API 전송 로직 예시
    console.log('Submitting data:', finalData);

    try {
      const donorInfo = await registerDonor(finalData);
      console.log("Donor registered successfully:", donorInfo);
      alert('전송되었습니다.');
      navigate('/');
    } catch (e) {
      console.log("에러가 발생했습니다. " + e);
      alert('에러가 발생했습니다.');
    }
  };

  const handleFamilyHistoryChange = (index, field, value) => {
    const updatedFamilyHistory = [...medicalInfo.interviewInfo.familyHistory];
    updatedFamilyHistory[index] = {
      ...updatedFamilyHistory[index],
      [field]: value
    };
    
    setMedicalInfo(prev => ({
      ...prev,
      interviewInfo: {
        ...prev.interviewInfo,
        familyHistory: updatedFamilyHistory
      }
    }));
  };

  const addFamilyHistory = () => {
    setMedicalInfo(prev => ({
      ...prev,
      interviewInfo: {
        ...prev.interviewInfo,
        familyHistory: [...prev.interviewInfo.familyHistory, { relation: "", condition: "" }]
      }
    }));
  };

  const removeFamilyHistory = (index) => {
    setMedicalInfo(prev => ({
      ...prev,
      interviewInfo: {
        ...prev.interviewInfo,
        familyHistory: prev.interviewInfo.familyHistory.filter((_, i) => i !== index)
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="h-full w-full bg-slate-200 overflow-y-auto pb-3 ">
      <div className="shadow-sm border-b border-gray-200">
        <div className="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
          <Link to="/">
            <div className="text-3xl font-Mont-Bold text-blue-600">Sperm Nest</div>
          </Link>
          <div className="mr-10 text-xl font-bold text-slate-700 ">정자 기증자 등록</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-6 mb-5 ">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center" onClick={() => setCurrentStep(index + 1)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                ${currentStep > index + 1 ? 'bg-green-300' :
                  currentStep === index + 1 ? 'bg-blue-400' : 'bg-gray-300'}
                text-white`}>
                {index + 1}
              </div>
              <div className={`ml-2 text-lg ${currentStep === index + 1 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                {step}
              </div>
              {/* {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
              )} */}
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md ">
            <h2 className="text-2xl text-center font-bold mb-4">정자등록 동의서</h2>
            <div className="h-72 mb-4 p-4 rounded text-sm text-gray-600 bg-slate-50 overflow-y-auto">
              <p className="mb-4">
                본 동의서는 정자 등록 절차와 관련하여 귀하의 개인정보 및 생체 정보 보호, 등록된 정자의 사용 목적, 그리고 관련 법률에 따른 의무사항을 포함한 중요한 내용을 포함하고 있습니다. 아래의 내용을 주의 깊게 읽어보시고 동의 여부를 결정해주시기 바랍니다.
              </p>
              <p className="mb-4">
                1. 귀하는 본 서비스를 통해 귀하의 정자를 블록체인 기반 정자등록 시스템에 등록하는 것에 동의합니다. 등록된 정보는 귀하의 동의 없이는 어떠한 경우에도 타 목적으로 사용되지 않으며, 법률에 따라 엄격하게 보호됩니다.
              </p>
              <p className="mb-4">
                2. 등록된 정자는 의료법 및 생명윤리 관련 법규에 따라 안전하게 관리됩니다. 이를 위해 귀하의 정자 및 개인정보는 블록체인 기술을 통해 암호화되어 저장되며, 해킹 및 데이터 유출 방지에 최적화된 보안 체계가 적용됩니다.
              </p>
              <p className="mb-4">
                3. 본 시스템은 귀하의 개인정보 보호를 최우선으로 합니다. 귀하의 이름, 생년월일, 연락처 등 개인정보는 관련 법률(예: 개인정보 보호법, 의료법 등)에 따라 수집 및 처리되며, 귀하의 사전 동의 없이는 어떠한 제3자와도 공유되지 않습니다.
              </p>
              <div className="mb-4">
                4. 귀하가 제공한 정자 정보는 다음과 같은 목적으로만 사용됩니다:
                <ul className="list-disc ml-6">
                  <li>정자 보관 및 관리 서비스 제공</li>
                  <li>의료적 용도로의 사용 (귀하의 명시적 동의가 있을 경우에 한함)</li>
                  <li>관련 연구 및 통계 목적 (개인 식별 불가능한 형태로 익명화 처리된 경우에 한함)</li>
                </ul>
              </div>
              <p className="mb-4">
                5. 귀하는 언제든 본 서비스 이용을 중단하거나 정자 정보 삭제를 요청할 수 있습니다. 삭제 요청은 본 서비스의 고객 지원 채널을 통해 접수되며, 요청 처리 이후 귀하의 정보는 즉시 삭제됩니다.
              </p>
              <p className="mb-4">
                6. 귀하는 본 서비스에서 제공되는 모든 데이터를 신뢰할 수 있음을 인정하며, 등록 절차와 관련된 모든 법적 책임은 관련 법규 및 약관에 따라 처리됩니다.
              </p>
              <p className="mb-4">
                7. 귀하는 본 서비스와 관련하여 제공되는 모든 정보가 정확하고 최신임을 보장하며, 본인의 정보 관리와 관련된 의무를 준수할 책임이 있습니다.
              </p>
              <p className="mb-4">
                본 동의서는 귀하와 본 서비스 제공자 간의 법적 계약으로 간주되며, 귀하가 본 계약에 동의함으로써 상호 신뢰를 바탕으로 서비스를 제공합니다. 아래 버튼을 클릭함으로써 귀하는 본 동의서의 모든 내용에 동의하는 것으로 간주됩니다.
              </p>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="agree" className="ml-2">
                위 내용을 모두 읽었으며 이에 동의합니다.
              </label>
            </div>

            <button
              onClick={handleNext}
              disabled={!agreed}
              className={`w-full text-xl py-2 px-4 rounded ${agreed
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
            >
              다음 단계로
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-center font-bold mb-4">개인정보 입력</h2>
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">이름</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">나이</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  placeholder="30"
                  className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
              </div>
              </div>
      
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">키 (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="170"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">체중 (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="70"
                  />
                </div>
              </div>
      
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">체형</label>
                <select className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
                  <option value="">선택해주세요</option>
                  <option value="Slim">마른 체형</option>
                  <option value="Athletic">운동선수형</option>
                  <option value="Average">보통</option>
                  <option value="Muscular">근육질</option>
                </select>
              </div>
      
              <div>
                <label className="block text-lg font-medium text-gray-700">인종</label>
                <select className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)}>
                  <option value="">선택해주세요</option>
                  <option value="Asian">아시아인</option>
                  <option value="Caucasian">백인</option>
                  <option value="African">흑인</option>
                  <option value="Hispanic">히스패닉</option>
                  <option value="Other">기타</option>
                </select>
              </div>
              </div>
      
              <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-lg font-medium text-gray-700">성격</label>
                <select className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={personality} onChange={(e) => setPersonality(e.target.value)}>
                  <option value="">선택해주세요</option>
                  <option value="Introverted">내향적</option>
                  <option value="Extroverted">외향적</option>
                  <option value="Ambivert">둘 다</option>
                </select>
              </div>
      
              <div>
                <label className="block text-lg font-medium text-gray-700">최종학력</label>
                <select className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={education} onChange={(e) => setEducation(e.target.value)}>
                  <option value="">선택해주세요</option>
                  <option value="HighSchool">고등학교 졸업</option>
                  <option value="Bachelor">학사</option>
                  <option value="Master">석사</option>
                  <option value="PhD">박사</option>
                </select>
              </div>
              </div>
      
              <div>
                <label className="block text-lg font-medium text-gray-700">종교</label>
                <select className="mt-1 block w-full text-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" value={religion} onChange={(e) => setReligion(e.target.value)}>
                  <option value="">선택해주세요</option>
                  <option value="None">무교</option>
                  <option value="Christianity">기독교</option>
                  <option value="Buddhism">불교</option>
                  <option value="Catholic">천주교</option>
                  <option value="Islam">이슬람교</option>
                  <option value="Other">기타</option>
                </select>
              </div>
            </div>
      
            <button
              onClick={handleNext}
              disabled={!agreed}
              className={`w-full text-xl py-2 px-4 rounded mt-6 ${
                agreed
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              다음 단계로
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-2">
              <h2 className="text-2xl text-center font-bold mb-6">의료정보 입력</h2>
              
              {/* Blood Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">혈액 정보</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">혈액형</label>
                    <select 
                      value={medicalInfo.bloodInfo.bloodType}
                      onChange={(e) => handleInputChange("bloodInfo", "bloodType", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">선택해주세요</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="O">O</option>
                      <option value="AB">AB</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-4 ">
                    {["hav", "hbv", "hcv", "venerealDisease"].map((field) => (
                      <div key={field} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={medicalInfo.bloodInfo[field]}
                          onChange={() => handleInputChange("bloodInfo", field, !medicalInfo.bloodInfo[field])}
                          className="h-4 w-4 text-blue-600"
                        />
                        <label className="ml-2 text-lg">
                          {field === "venerealDisease" ? "성병" : field.toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
        
              {/* Semen Test Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">정액 검사 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">정액량 (mL)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={medicalInfo.semenTestInfo.semenVolume}
                      onChange={(e) => handleInputChange("semenTestInfo", "semenVolume", parseInt(e.target.value, 10))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb</div>-2">정자 수</label>
                    <input
                      type="number"
                      value={medicalInfo.semenTestInfo.spermCount}
                      onChange={(e) => handleInputChange("semenTestInfo", "spermCount", parseInt(e.target.value, 10))}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">정자 운동성</label>
                    <select
                      value={medicalInfo.semenTestInfo.spermMotility}
                      onChange={(e) => handleInputChange("semenTestInfo", "spermMotility", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">선택해주세요</option>
                      <option value="Excellent">최상</option>
                      <option value="Good">좋음</option>
                      <option value="Average">평균</option>
                      <option value="Bad">나쁨</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">정자 형태</label>
                    <select
                      value={medicalInfo.semenTestInfo.spermShape}
                      onChange={(e) => handleInputChange("semenTestInfo", "spermShape", e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">선택해주세요</option>
                      <option value="Normal">정상</option>
                      <option value="Abnormal">비정상</option>
                    </select>
                  </div>
                </div>
              </div>
        
              {/* Medical History */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">병력 정보</h3>
                <div className="grid grid-cols-3 ">
                  {["mentalRetardation", "mentalIllness", "epilepsy"].map((field) => (
                    <div key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={medicalInfo.interviewInfo.medicalHistory[field]}
                        onChange={() => handleCheckboxChange("interviewInfo", "medicalHistory", field)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label className="ml-2 text-lg">
                        {field === "mentalRetardation" ? "정신지체" : 
                         field === "mentalIllness" ? "정신질환" : "간질"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
        
              {/* Family History */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">가족력</h3>
                  <button
                    onClick={addFamilyHistory}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    추가
                  </button>
                </div>
                
                {medicalInfo.interviewInfo.familyHistory.map((history, index) => (
                  <div key={index} className="flex space-x-4 items-center mb-4">
                    <input
                      type="text"
                      value={history.relation}
                      onChange={(e) => handleFamilyHistoryChange(index, "relation", e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                      placeholder="관계"
                    />
                    <input
                      type="text"
                      value={history.condition}
                      onChange={(e) => handleFamilyHistoryChange(index, "condition", e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                      placeholder="질환"
                    />
                    <button
                      onClick={() => removeFamilyHistory(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={!agreed}
                className={`w-full text-xl py-2 px-4 rounded mt-2 ${
                  agreed
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  다음 단계로
              </button>
            </div>
        )}

        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-8">최종 정보 확인</h2>
              {/* 개인 정보 섹션 */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">기본 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">이름</p>
                    <p className="font-medium">{name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">나이</p>
                    <p className="font-medium">{age}세</p>
                  </div>
                  <div>
                    <p className="text-gray-600">신장</p>
                    <p className="font-medium">{height}cm</p>
                  </div>
                  <div>
                    <p className="text-gray-600">체중</p>
                    <p className="font-medium">{weight}kg</p>
                  </div>
                  <div>
                    <p className="text-gray-600">체형</p>
                    <p className="font-medium">{bodyType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">인종</p>
                    <p className="font-medium">{ethnicity}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">성격</p>
                    <p className="font-medium">{personality}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">학력</p>
                    <p className="font-medium">{education}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">종교</p>
                    <p className="font-medium">{religion}</p>
                  </div>
                </div>
              </section>

              {/* 혈액 정보 섹션 */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">혈액 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">혈액형</p>
                    <p className="font-medium">{medicalInfo.bloodInfo.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">검사 결과</p>
                    <ul className="list-disc ml-5">
                      {medicalInfo.bloodInfo.hav && <li>HAV 양성</li>}
                      {medicalInfo.bloodInfo.hbv && <li>HBV 양성</li>}
                      {medicalInfo.bloodInfo.hcv && <li>HCV 양성</li>}
                      {medicalInfo.bloodInfo.venerealDisease && <li>성병 양성</li>}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 정액 검사 정보 섹션 */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">정액 검사 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">정액량</p>
                    <p className="font-medium">{medicalInfo.semenTestInfo.semenVolume}mL</p>
                  </div>
                  <div>
                    <p className="text-gray-600">정자 수</p>
                    <p className="font-medium">{medicalInfo.semenTestInfo.spermCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">정자 운동성</p>
                    <p className="font-medium">{medicalInfo.semenTestInfo.spermMotility}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">정자 형태</p>
                    <p className="font-medium">{medicalInfo.semenTestInfo.spermShape}</p>
                  </div>
                </div>
              </section>

              {/* 병력 정보 섹션 */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">병력 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">정신 건강</p>
                    <ul className="list-disc ml-5">
                      {medicalInfo.interviewInfo.medicalHistory.mentalRetardation && <li>정신지체</li>}
                      {medicalInfo.interviewInfo.medicalHistory.mentalIllness && <li>정신질환</li>}
                      {medicalInfo.interviewInfo.medicalHistory.epilepsy && <li>간질</li>}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-600">기타 질환</p>
                    <p className="font-medium">
                      {medicalInfo.interviewInfo.medicalHistory.otherConditions.join(', ') || '없음'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">약물 사용</p>
                    <p className="font-medium">{medicalInfo.interviewInfo.pastHistory.drugUse ? '있음' : '없음'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">기타 과거 병력</p>
                    <p className="font-medium">
                      {medicalInfo.interviewInfo.pastHistory.otherConditions.join(', ') || '없음'}
                    </p>
                  </div>
                </div>
              </section>

              {/* 가족력 섹션 */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 pb-2 border-b">가족력</h3>
                <div className="space-y-2">
                  {medicalInfo.interviewInfo.familyHistory.map((history, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="font-medium">{history.relation}:</div>
                      <div>{history.condition}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 제출 버튼 */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSubmit}
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
                    "정보 제출하기"
                  )}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default RegisterPage;