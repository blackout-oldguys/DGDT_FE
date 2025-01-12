import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown } from 'lucide-react';

const mockDonors = [
  {
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },
  {
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },
  {
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },{
    id: 1,
    personalInfo: {
      name: "Donor123",
      birth: 28,
      physicalInfo: {
        height: 180,
        weight: 75,
        bodyType: "Athletic"
      },
      ethnicity: "Asian",
      personality: "Extroverted",
      education: "대학원 졸업",
      religion: "None"
    },
    bloodInfo: {
      bloodType: "A+",
    },
    semenTestInfo: {
      semenVolume: 3.2,
      spermCount: 120000000,
      spermMotility: "Normal",
      spermShape: "Normal"
    }
  },
  // ... 더 많은 목업 데이터 추가 가능
];

function RecipientPage() {
  const [filters, setFilters] = useState({
    bloodType: '',
    minHeight: '',
    maxHeight: '',
    education: '',
    ethnicity: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="h-full w-full">
      {/* 헤더 섹션 - z-index 추가 */}
      <div className="shadow-sm border-b border-gray-200 bg-slate-200 relative z-10">
        <div className="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
          <Link to="/">
            <div className="text-3xl font-Mont-Bold text-blue-600">Sperm Nest</div>
          </Link>
          <div className="mr-10 text-xl font-bold text-slate-700">정자 수증받기</div>
        </div>
      </div>

      {/* 컨텐츠 영역 - 백그라운드 이미지 z-index 조정 */}
      <div className="relative bg-slate-200 pb-3">
        <div 
          className="fixed inset-0 bg-contain bg-right bg-no-repeat opacity-20 z-0"
          style={{ backgroundImage: "url('/logo_white.png')" }}
        ></div>
        
        <div className="relative z-1 p-8">
          <h2 className="text-3xl text-center font-bold px-2 pb-4">정자 기증자 목록</h2>
          {/* 검색 및 필터 섹션 */}
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full p-3 pl-10 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                필터
                <ChevronDown size={20} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* 필터 패널 */}
            {showFilters && (
              <div className="p-4 border rounded-lg mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">혈액형</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.bloodType}
                    onChange={(e) => setFilters({...filters, bloodType: e.target.value})}
                  >
                    <option value="">전체</option>
                    <option value="A">A형</option>
                    <option value="B">B형</option>
                    <option value="O">O형</option>
                    <option value="AB">AB형</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">신장</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="최소"
                      className="w-1/2 p-2 border rounded-md"
                      value={filters.minHeight}
                      onChange={(e) => setFilters({...filters, minHeight: e.target.value})}
                    />
                    <input
                      type="number"
                      placeholder="최대"
                      className="w-1/2 p-2 border rounded-md"
                      value={filters.maxHeight}
                      onChange={(e) => setFilters({...filters, maxHeight: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">학력</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filters.education}
                    onChange={(e) => setFilters({...filters, education: e.target.value})}
                  >
                    <option value="">전체</option>
                    <option value="고졸">고졸</option>
                    <option value="대졸">대졸</option>
                    <option value="대학원졸">대학원졸</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* 기증자 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDonors.map((donor) => (
              <div key={donor.id} className="border rounded-lg p-6 shadow-md transition-shadow bg-white opacity-80">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">Donor #{donor.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    donor.semenTestInfo.spermMotility === 'Normal' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donor.semenTestInfo.spermMotility}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">나이</p>
                      <p className="font-medium">{donor.personalInfo.birth}세</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">신장</p>
                      <p className="font-medium">{donor.personalInfo.physicalInfo.height}cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">체형</p>
                      <p className="font-medium">{donor.personalInfo.physicalInfo.bodyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">혈액형</p>
                      <p className="font-medium">{donor.bloodInfo.bloodType}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">학력</p>
                    <p className="font-medium">{donor.personalInfo.education}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">정자 품질</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <p className="text-sm">정자 수: {(donor.semenTestInfo.spermCount / 1000000).toFixed(1)}M/ml</p>
                      <p className="text-sm">정액량: {donor.semenTestInfo.semenVolume}ml</p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => console.log(`Selected donor ${donor.id}`)}
                >
                  상세정보 보기
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipientPage;