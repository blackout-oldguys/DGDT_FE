import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="min-h-screen bg-slate-200 relative">
      {/* 중앙 로고 섹션 */}
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-6xl font-bold text-blue-600 mb-8">Sperm Nest</h1>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            블록체인 기반 정자 기증 네트워크
          </h2>
          <p className="text-xl text-gray-600">
            안전하고 투명한 정자 기증 프로세스를 위한 혁신적인 플랫폼
          </p>
        </div>
      </div>

      {/* 하단 고정 네비게이션 바 */}
      <div className="fixed bottom-0 h-1/5 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="max-w-7xl h-full mx-auto flex justify-between items-center space-x-4">
          <div className="flex h-full items-center ">
            <div className="text-4xl font-bold text-blue-600 px-3 ">Sperm Nest</div>
            <div className="ml-3 text-xl ">
              블록체인 기반 정자 기증 네트워크
            </div>
          </div>
          <div className='flex h-full w-1/3 '>
            <Link className="w-1/2 flex justify-center border" to="/register">
              <button className="text-2xl text-black">
                기증자 접수
              </button>
            </Link>

            <Link className="w-1/2 flex justify-center bg-blue-600 " to="/recipient">
              <button className="text-2xl text-white">
                리스트 확인
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;