'use client';

import { useState, useMemo } from 'react';
import { AuthGuard } from '@/components/providers/AuthGuard';

type BetTab = 'casino' | 'slot';

function isoDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

function BetHistoryContent() {
  const [activeTab, setActiveTab] = useState<BetTab>('casino');
  const [filterResult, setFilterResult] = useState('');

  const now = useMemo(() => new Date(), []);
  const week = useMemo(() => { const d = new Date(); d.setDate(d.getDate() - 7); return d; }, []);
  const [startDate, setStartDate] = useState(isoDate(week));
  const [endDate, setEndDate] = useState(isoDate(now));

  const handleTabChange = (tab: BetTab) => {
    setActiveTab(tab);
    setFilterResult('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-white">베팅 내역</h1>

      <div className="mb-6 flex gap-2">
        {(['casino', 'slot'] as BetTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'bg-[#b82e66] text-white'
                : 'bg-[#1f0d14] text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'casino' ? '카지노 베팅내역' : '슬롯 베팅내역'}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-[#1f0d14] p-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded border border-[#5a2035] bg-[#0d0608] px-3 py-2 text-sm text-white"
        />
        <span className="text-gray-500">~</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded border border-[#5a2035] bg-[#0d0608] px-3 py-2 text-sm text-white"
        />
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value)}
          className="rounded border border-[#5a2035] bg-[#0d0608] px-3 py-2 text-sm text-white"
        >
          <option value="">전체</option>
          <option value="Win">당첨</option>
          <option value="Lose">미당첨</option>
          <option value="Bet">진행중</option>
        </select>
        <span className="ml-auto text-sm text-gray-400">총 0건</span>
      </div>

      <p className="mb-3 text-center text-xs text-gray-500">
        ※ 사이트 및 회원님의 보안을 위해 7일이 지난 베팅 내역은 자동 삭제 처리됩니다.
      </p>

      <div className="overflow-x-auto rounded-lg border border-[#5a2035]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#1f0d14]">
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#df7ca5]">게임</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#df7ca5]">카테고리</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#df7ca5]">베팅금</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#df7ca5]">당첨금</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#df7ca5]">결과</th>
              <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-[#df7ca5]">일시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="py-10 text-center text-gray-400">
                표시할 내용이 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function BetHistoryPage() {
  return (
    <AuthGuard>
      <BetHistoryContent />
    </AuthGuard>
  );
}
