
import React, { useState, useMemo } from 'react';
import { YEARLY_DATA, PROGRAM_STATS_2024 } from './constants';
import { StatCard } from './components/StatCard';
import { PerformanceTrendChart, RegionalBarChart } from './components/Charts';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    return ['All', ...new Set(YEARLY_DATA.map(d => d.category))];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedCategory === 'All') return YEARLY_DATA;
    return YEARLY_DATA.filter(d => d.category === selectedCategory);
  }, [selectedCategory]);

  // Calculations
  const totalBudgetBillion = (PROGRAM_STATS_2024.budget / 1000000000).toFixed(1);
  const libraryGrowth = (((8310000 - 7850000) / 7850000) * 100).toFixed(1);
  const avgWalking = YEARLY_DATA.find(d => d.metric === '1인당 월평균 이동거리')?.y2024 || 0;
  const avgReading = YEARLY_DATA.find(d => d.metric === '방과후 독서 30분↑')?.y2024 || 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
              <i className="fa-solid fa-book-open-reader"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 leading-tight">읽걷쓰 성과</span>
              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">v1.0.0</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">메인 메뉴</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-semibold transition-all">
            <i className="fa-solid fa-chart-line"></i>
            성과 현황
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
            <i className="fa-solid fa-users-rectangle"></i>
            지역별 인프라
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
            <i className="fa-solid fa-graduation-cap"></i>
            연수 운영
          </button>
          
          <div className="pt-8">
            <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">카테고리 필터</p>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all ${
                  selectedCategory === cat 
                    ? 'text-indigo-600 font-bold bg-indigo-50' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                {cat}
              </button>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <a 
            href="https://github.com/johaeung" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-slate-900 rounded-2xl p-4 text-white hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-400">Developer Profile</p>
              <i className="fa-brands fa-github text-slate-400 group-hover:text-white transition-colors"></i>
            </div>
            <p className="text-sm font-medium">johaeung</p>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">읽걷쓰_성과대시보드_v1</h1>
            <p className="text-sm text-slate-500">인천광역시교육청 읽기·걷기·쓰기 통합 성과 분석</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="text" 
                placeholder="지표 검색..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
              <i className="fa-solid fa-bell"></i>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPI Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="2024 프로그램 예산" 
              value={totalBudgetBillion} 
              unit="십억원" 
              icon="fa-wallet" 
              color="bg-indigo-500"
            />
            <StatCard 
              title="도서관 인구 성장률" 
              value={libraryGrowth} 
              unit="%" 
              trend={{ direction: 'up', value: '5.8%' }}
              icon="fa-users" 
              color="bg-sky-500"
            />
            <StatCard 
              title="1인당 월평균 이동거리" 
              value={avgWalking.toString()} 
              unit="km" 
              trend={{ direction: 'up', value: '2.7km' }}
              icon="fa-person-walking" 
              color="bg-emerald-500"
            />
            <StatCard 
              title="방과후 독서 참여율" 
              value={avgReading.toString()} 
              unit="%" 
              trend={{ direction: 'up', value: '1.9%' }}
              icon="fa-book" 
              color="bg-amber-500"
            />
          </section>

          {/* Main Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Trend Charts */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-slate-800">연도별 성장 트렌드</h3>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      2022-2024 Comparison
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <PerformanceTrendChart 
                    data={YEARLY_DATA} 
                    title="도서관 방문인구 트렌드" 
                    metricName="도서관 방문인구" 
                  />
                  <PerformanceTrendChart 
                    data={YEARLY_DATA} 
                    title="방과후 독서 30분↑ 참여율" 
                    metricName="방과후 독서 30분↑" 
                  />
                </div>
              </div>

              {/* Data Table View */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-800">상세 지표 리스트</h3>
                  <button className="text-indigo-600 text-sm font-semibold hover:underline">엑셀 다운로드</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                        <th className="px-6 py-4">카테고리</th>
                        <th className="px-6 py-4">세부 지표</th>
                        <th className="px-6 py-4">2022</th>
                        <th className="px-6 py-4">2023</th>
                        <th className="px-6 py-4">2024</th>
                        <th className="px-6 py-4">단위</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-lg font-medium">
                              {row.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-800 font-medium">{row.metric}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{row.y2022.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{row.y2023.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-slate-900 font-bold">{row.y2024.toLocaleString()}</td>
                          <td className="px-6 py-4 text-xs text-slate-400">{row.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Operational Stats */}
            <div className="space-y-8">
              {/* Regional Chart */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-800">인프라 현황</h3>
                </div>
                <RegionalBarChart data={PROGRAM_STATS_2024.regionalLibrarians} />
              </div>

              {/* Training Progress */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">교원 연수 이수율</h3>
                <div className="space-y-6">
                  {PROGRAM_STATS_2024.training.map((t, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600 font-medium">{t.name}</span>
                        <span className="text-indigo-600 font-bold">{t.rate}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: `${t.rate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-indigo-50 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                    <i className="fa-solid fa-medal text-xl"></i>
                  </div>
                  <div>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide">Excellent</p>
                    <p className="text-sm text-slate-700 font-medium">교원 저자 연수 이수율 100% 달성</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
