import { Link } from "react-router-dom";
import { useState } from 'react';
import { Clock, FileCheck, User } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

function RecentTradePage() {
  const [transactions] = useState([
    {
      id: "0x7a2b...3f9d",
      timestamp: "2025-01-12 14:23:45",
      donor: "0x3ab...c4d2",
      recipient: "0x8fe...9a1b",
      status: "완료",
      type: "A+",
      quality: "상위 10%"
    },
    {
      id: "0x6c1a...2e8b",
      timestamp: "2025-01-12 13:15:30",
      donor: "0x2dc...b3a4",
      recipient: "0x5gh...7k9m",
      status: "진행중",
      type: "B+",
      quality: "상위 15%"
    },
    {
      id: "0x5b9d...1f7c",
      timestamp: "2025-01-12 11:45:22",
      donor: "0x4ef...d5c6",
      recipient: "0x9lm...2n4p",
      status: "완료",
      type: "O+",
      quality: "상위 5%"
    }
  ]);

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
          <h1 className="text-4xl font-bold text-blue-600">최신 기증 기록</h1>
          <div className="text-gray-600">
            총 거래수: {transactions.length}
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-blue-600 font-mono">{tx.id}</div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        tx.status === "완료" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{tx.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="font-mono">From: {tx.donor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="font-mono">To: {tx.recipient}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-lg">{tx.type}</div>
                      <div className="text-sm text-gray-600">{tx.quality}</div>
                    </div>
                    <FileCheck className="w-6 h-6 text-blue-600" />
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
