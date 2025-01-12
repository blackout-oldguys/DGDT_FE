import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from 'lucide-react';
import { getTransLog, makeTrade } from "../api/api";
import Modal from "../component/Modal";

function parseDonors(csvString) {
  // 필드 순서에 맞는 기증자 데이터 키와 구조 정의
  const fields = [
    "id",
    "bloodType",
    "hav",
    "hbv",
    "hcv",
    "venerealDisease",
    "semenVolume",
    "spermCount",
    "spermMotility",
    "spermShape",
    "mentalRetardation",
    "mentalIllness",
    "epilepsy",
    "otherConditions",
    "drugUse",
    "geneticDisorders",
    "familyRelation1",
    "condition1",
    "familyRelation2",
    "condition2",
    "height",
    "weight",
    "bodyType",
    "ethnicity",
    "personality",
    "education",
    "religion",
    "availability",
  ];

  // 한 기증자의 필드 개수
  const data = Array(csvString)[0];
  console.log(Object.keys(data).length);
  const donors = [];

  for (let i = 0; i < Object.keys(data).length; i++) {
    const donorData = data[String(i)]

    const donor = {
      id: donorData["0"],
      bloodInfo: {
        bloodType: donorData["1"]["0"],
        hav: donorData["1"]["1"] === "true",
        hbv: donorData["1"]["2"] === "true",
        hcv: donorData["1"]["3"] === "true",
        venerealDisease: donorData["1"]["4"] === "true",
      },
      semenTestInfo: {
        semenVolume: Number(donorData["2"]["0"]),
        spermCount: Number(donorData["2"]["1"]),
        spermMotility: donorData["2"]["2"],
        spermShape: donorData["2"]["3"],
      },
      interviewInfo: {
        medicalHistory: {
          mentalRetardation: donorData["3"]["0"]["0"] === "true",
          mentalIllness: donorData["3"]["0"]["1"] === "true",
          epilepsy: donorData["3"]["0"]["2"] === "true",
          otherConditions: donorData["3"]["0"]["3"] ? Array(donorData["3"]["0"]["3"]) : [],
        },
        pastHistory: {
          drugUse: donorData["3"]["1"]["0"] === "true",
          otherConditions: donorData["3"]["1"]["1"] ? Array(donorData["3"]["1"]["1"]) : [],
        },
        geneticDisorders: donorData["3"]["2"] ? Array(donorData["3"]["2"]) : [],
        familyHistory: donorData["3"]["3"]["0"] ? Array(donorData["3"]["3"]["0"]).map((dt) => ({relations : dt["0"], condition : dt["1"]})) : [],
      },
      physicalInfo: {
        height: Number(donorData["4"]["0"]),
        weight: Number(donorData["4"]["1"]),
        bodyType: donorData["4"]["2"],
        ethnicity: donorData["4"]["3"],
      },
      personalInfo: {
        personality: donorData["4"]["4"],
        education: donorData["4"]["5"],
        religion: donorData["4"]["6"],
      },
    };
    console.log(donor);
    donors.push(donor);
  }

  return donors;
}

function RecipientPage() {
  const [filters, setFilters] = useState({
    bloodType: '',
    minHeight: '',
    maxHeight: '',
    education: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [donateList, setDonateList] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  
  useEffect(() => {
    const filterDonors = () => {
      let filtered = [...donateList];
      console.log(filtered);
      // 혈액형 필터링
      if (filters.bloodType !== '') {
        filtered = filtered.filter(donor => 
          donor.bloodInfo.bloodType === filters.bloodType
        );
      }
      console.log(filtered);

      // 정자 수 필터링
      if (filters.minHeight !== '') {
        filtered = filtered.filter(donor => 
          donor.physicalInfo.height >= parseInt(filters.minHeight)
        );
      }
      console.log(filtered);

      // 정자 수 필터링
      if (filters.maxHeight !== '') {
        filtered = filtered.filter(donor => 
          donor.physicalInfo.height <= parseInt(filters.maxHeight)
        );
      }
      console.log(filtered);

      // 정액량 필터링
      if (filters.education !== '') {
        filtered = filtered.filter(donor => 
          donor.personalInfo.education == filters.education
        );
      }
      console.log(filtered);

      setFilteredDonors(filtered);
    };
  
    filterDonors();
  }, [filters, donateList]);

  useEffect(() => {
    const getTrans = async () => {
      const logs = await getTransLog();
      const newLog = parseDonors(logs);
      setDonateList(newLog);
    }
    
    getTrans();
  }, []); // 빈 dependency array 추가


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const navigate = useNavigate();

  const handleTrade = async () => {
    // 거래 로직 구현
    console.log(selectedDonor.id);
    await makeTrade(selectedDonor.id);
    alert("거래가 완료되었습니다.");
    navigate("/");
    // console.log('거래 시작:', selectedDonor.id);
  };

  return (
    <div className="h-full w-full bg-slate-200 pb-3 ">
      <div className="shadow-sm border-b border-gray-200">
        <div className="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
          <Link to="/">
            <div className="text-3xl font-Mont-Bold text-blue-600">Sperm Nest</div>
          </Link>
          <div className="mr-10 text-xl font-bold text-slate-700 ">정자 기증받기</div>
        </div>
      </div>
          <div className="p-6 bg-white h-screen ">
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
                <option value="HighSchool">고등학교 졸업</option>
                <option value="Bachelor">학사</option>
                <option value="Master">석사</option>
                <option value="PhD">박사</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 기증자 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonors && filteredDonors.length > 0 && filteredDonors.map((donor) => (
          <div key={donor.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <span className={`px-3 py-1 rounded-full text-sm ${
                donor.semenTestInfo.spermMotility === 'Excellent'
                 || donor.semenTestInfo.spermMotility === 'Good'  
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
              }`}>
                {donor.semenTestInfo.spermMotility}
            </span>

            <div className="flex justify-between items-start mb-4 truncate">
              <h3 className="text-xl font-semibold ">Donor #{donor.id.slice(0, 10) + "..."}</h3>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">신장</p>
                  <p className="font-medium">{donor.physicalInfo.height}cm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">체형</p>
                  <p className="font-medium">{donor.physicalInfo.bodyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">혈액형</p>
                  <p className="font-medium">{donor.bloodInfo.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">학력</p>
                  <p className="font-medium">{donor.personalInfo.education}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">정자 품질</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <p className="text-sm">정자 수: {donor.semenTestInfo.spermCount}M/ml</p>
                  <p className="text-sm">정액량: {donor.semenTestInfo.semenVolume}ml</p>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => {
                setSelectedDonor(donor);
                setIsModalOpen(true);              
              }}
            >
              상세정보 보기
            </button>
          </div>
        ))}
        {
          <Modal
            donor={selectedDonor}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTrade={handleTrade}
          />
        }
      </div>
    </div>
  </div>);
}

export default RecipientPage;