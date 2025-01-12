import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Clock, User } from 'lucide-react';
import { getTradeLog } from "../api/api";

function RecentTradePage() {
  const [log, setLog] = useState([]);

  const paseData = (csvString) => {
    const data = Array(csvString)[0];
    const logs = [];
  
    for (let i = 0; i < Object.keys(data).length; i++) {
      const donorData = data[String(i)];
      const tmpLog = {recipient : donorData["0"], donor : donorData["1"], timestamp : donorData["2"], id : donorData["0"], status : "완료"}
      logs.push(tmpLog);
    }

    console.log(logs);

    return logs;
  }

  const formatTimestamp = (timestamp) => {
    // BigInt를 Number로 변환하고 1000을 곱해 밀리초 단위로 변환
    const date = new Date(Number(timestamp) * 1000);
    
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };
  
  useEffect(() => {
    const getData = async () => {
      const logData = await getTradeLog();
      const parsedLog = paseData(logData);

      setLog(parsedLog);
    }

    getData();
  }, []);

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
    <div className="min-h-screen bg-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-centered text-black ">최신 기증 기록</h1>
          <div className="text-gray-600">
            총 거래수: {log.length}
          </div>
        </div>

        <div className="space-y-4">
          {log.map((tx) => (
            <div key={tx.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 mr-5 ">
                        <User className="w-4 h-4 truncate" />
                        <span className="font-mono ">From: {tx.donor.slice(0, 10) + "..."}</span>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <User className="w-4 h-4 truncate" />
                        <span className="font-mono">To: {tx.recipient.slice(0, 10) + "..."}</span>
                      </div>                      
                    </div>
                    
                    <div className="flex items-center space-x-6 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(tx.timestamp)}</span>
                      </div>
                      
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-lg">{tx.type}</div>
                      <div className="text-sm text-gray-600">{tx.quality}</div>
                    </div>
                    <span className={`mt-3 px-3 py-1 rounded-full text-sm ${
                        tx.status === "완료" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default RecentTradePage;
