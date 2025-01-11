import { useState } from 'react';

const steps = [
  '동의서 확인',
  '개인정보 입력',
  '의료정보 입력',
  '최종 확인'
];

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="h-full w-full bg-slate-200">
      <div className="shadow-sm border-b border-gray-200">
        <div className="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
          <div className="text-3xl font-bold text-blue-600">Sperm Nest</div>
          <div className="mr-10 text-xl text-black">정자 기증자 등록</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-6">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
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
              <p className="mb-4">
                4. 귀하가 제공한 정자 정보는 다음과 같은 목적으로만 사용됩니다:
                <ul className="list-disc ml-6">
                  <li>정자 보관 및 관리 서비스 제공</li>
                  <li>의료적 용도로의 사용 (귀하의 명시적 동의가 있을 경우에 한함)</li>
                  <li>관련 연구 및 통계 목적 (개인 식별 불가능한 형태로 익명화 처리된 경우에 한함)</li>
                </ul>
              </p>
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
      </div>
    </div>
  );
}

export default RegisterPage;