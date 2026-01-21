
import { YearlyPerformance, ProgramStats2024 } from './types';

export const YEARLY_DATA: YearlyPerformance[] = [
  { category: '실제 독서·문해력', metric: '도서관 방문인구', y2022: 7850000, y2023: 8020000, y2024: 8310000, unit: '명' },
  { category: '실제 독서·문해력', metric: '도서관 대출 자료 수', y2022: 4278287, y2023: 4414475, y2024: 4511991, unit: '건' },
  { category: '실제 독서·문해력', metric: '방과후 독서 30분↑', y2022: 41.5, y2023: 41.8, y2024: 43.7, unit: '%' },
  { category: '학업 성취', metric: '학습 습관·태도 점수', y2022: 3.39, y2023: 3.39, y2024: 3.42, unit: '점' },
  { category: '학업 성취', metric: '방과후 공부 3시간↑', y2022: 21.1, y2023: 21.7, y2024: 23.2, unit: '%' },
  { category: '기초체력·건강', metric: '1인당 월평균 이동거리', y2022: 94.2, y2023: 96.8, y2024: 99.5, unit: 'km' },
  { category: '기초체력·건강', metric: '평소 건강 관리 점수', y2022: 3.70, y2023: 3.72, y2024: 3.74, unit: '점' },
  { category: '기초체력·건강', metric: '방과후 운동 30~60분', y2022: 23.9, y2023: 24.8, y2024: 25.1, unit: '%' },
  { category: '정서 안정성', metric: '스마트폰 의존도', y2022: 2.37, y2023: 2.29, y2024: 2.30, unit: '점' },
  { category: '정서 안정성', metric: '우울감 지표', y2022: 2.56, y2023: 2.51, y2024: 2.54, unit: '점' },
  { category: '문화활동 경험', metric: '과학관·박람회 관람', y2022: 18.4, y2023: 19.6, y2024: 21.3, unit: '%' },
  { category: '문화활동 경험', metric: '공연·전시 관람', y2022: 24.7, y2023: 25.9, y2024: 27.5, unit: '%' },
  { category: '문화활동 경험', metric: '도서관·서점 방문', y2022: 46.2, y2023: 47.8, y2024: 50.1, unit: '%' },
  { category: '문화활동 경험', metric: '운동경기장 방문', y2022: 17.9, y2023: 18.6, y2024: 19.4, unit: '%' },
  { category: '문화활동 경험', metric: '극장 관람', y2022: 32.1, y2023: 34.5, y2024: 36.8, unit: '%' },
];

export const PROGRAM_STATS_2024: ProgramStats2024 = {
  budget: 8700000000,
  regionalLibrarians: [
    { region: '경기', rate: 50.48 }, { region: '인천', rate: 33.46 }, { region: '대구', rate: 32.32 },
    { region: '세종', rate: 31.68 }, { region: '울산', rate: 30.58 }, { region: '광주', rate: 27.74 },
    { region: '대전', rate: 26.16 }, { region: '제주', rate: 26.06 }, { region: '서울', rate: 20.85 },
    { region: '충남', rate: 20.56 }, { region: '경북', rate: 19.82 }, { region: '부산', rate: 18.27 },
    { region: '전남', rate: 17.97 }, { region: '전북', rate: 17.84 }, { region: '충북', rate: 14.68 },
    { region: '강원', rate: 13.76 }, { region: '경남', rate: 13.74 }
  ],
  training: [
    { name: '교원 저자 되기', rate: 100.0 },
    { name: '말랑말랑 공감', rate: 88.2 },
    { name: '읽걷쓰 실천가', rate: 89.1 }
  ]
};
