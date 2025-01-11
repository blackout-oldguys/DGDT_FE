import { useState } from 'react'
import './App.css'
function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const steps = [
    '동의서 확인',
    '개인정보 입력',
    '의료정보 입력',
    '최종 확인'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="h-full w-full bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                ${currentStep > index + 1 ? 'bg-green-500' :
                  currentStep === index + 1 ? 'bg-blue-500' : 'bg-gray-300'}
                text-white`}>
                {index + 1}
              </div>
              <div className={`ml-2 text-sm ${currentStep === index + 1 ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                {step}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">정자등록 동의서</h2>
            <div className="h-96 overflow-y-auto mb-4 p-4 border border-gray-200 rounded">
              <p className="mb-4">
                본 동의서는 정자등록 절차와 관련된 중요한 내용을 포함하고 있습니다.
              </p>
              <p className="mb-4">
                1. 귀하는 본인의 정자를 등록하는 것에 동의합니다.
              </p>
              <p className="mb-4">
                2. 등록된 정자는 의료법에 따라 안전하게 보관됩니다.
              </p>
              <p className="mb-4">
                3. 개인정보는 관련 법률에 따라 보호됩니다.
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
              className={`w-full py-2 px-4 rounded ${
                agreed
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              다음 단계로
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App