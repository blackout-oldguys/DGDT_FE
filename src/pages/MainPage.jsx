import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MainPage() {
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 300)
    setTimeout(() => setShowTitle(true), 600);
    setTimeout(() => setShowSubtitle(true), 1000);
    setTimeout(() => setShowNav(true), 1500);
    localStorage.setItem('userType', '기증자');
  }, []);

  const handleChangeUser = () => {
    if (user) {
      setUser(false);
      localStorage.setItem('userType', '수증자');
    } else {
      setUser(true);
      localStorage.setItem('userType', '기증자');
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 relative">
      <Link to='/recent'>
        <button 
          className={`absolute top-6 z-30 right-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-700 ease-in-out ${showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        >
          최신 기증 기록 확인하기
        </button>
      </Link>

      <div className={`absolute top-8 left-8 flex items-center space-x-3 z-10 transition-all duration-700 ease-in-out ${showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <span className={`text-gray-700 font-medium  transition-all duration-700 ease-in-out  ${user ? "text-slate-200 ": "text-black "}`}>기증자</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={user}
            onChange={handleChangeUser}
          />
          <div
            className={`
              w-11 h-6 rounded-full
              transition-colors duration-200 ease-in-out
              ${user ? 'bg-blue-600' : 'bg-gray-200'}
              relative
            `}
          >
            <div
              className={`
                absolute top-0.5 left-0.5
                w-5 h-5 rounded-full
                bg-white shadow-md
                transition-transform duration-200 ease-in-out
                ${user ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </div>
        </label>
        <span className={`text-gray-700 font-medium transition-all duration-700 ease-in-out  ${user ? "text-black ": "text-slate-200 "}`}>수증자</span>
      </div>

      <div className="flex flex-col items-center justify-center h-screen px-4 relative">
        <div 
          className={`absolute inset-0 bg-contain bg-right bg-no-repeat duration-700 ease-in-out ${showLogo ? 'opacity-30' : 'opacity-0'}`}
          style={{ backgroundImage: "url('/logo_white.png')" }}
        ></div>
        <h1 className={`text-6xl font-Mont-Bold text-blue-600 mb-8 relative transition-opacity duration-700 ease-in-out ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
          Sperm Nest
        </h1>
        <div className={`text-center mb-16 relative transition-opacity duration-700 ease-in-out ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            블록체인 기반 정자 기증 네트워크
          </h2>
          <p className="text-xl text-gray-600">
            안전하고 투명한 정자 기증 프로세스를 위한 혁신적인 플랫폼
          </p>
        </div>
      </div>

      <div className={`fixed w-full bottom-0 h-1/5 left-0 right-0 bg-white shadow-lg border-t border-gray-200 transition-all duration-700 ease-in-out ${showNav ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="w-full h-full mx-auto flex justify-between items-center space-x-4">
          <div className="flex h-full items-center ">
            <div className="flex justify-center items-center bg-slate-50 h-full text-4xl font-Mont-Bold text-blue-600 px-10 ">Sperm Nest</div>
            <div className="ml-10 text-xl">
              블랙아웃 정자은행
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
                기증 받기
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;