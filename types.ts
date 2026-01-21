
export interface YearlyPerformance {
  category: string;
  metric: string;
  y2022: number;
  y2023: number;
  y2024: number;
  unit: string;
}

export interface RegionalLibrarianRate {
  region: string;
  rate: number;
}

export interface TrainingPerformance {
  name: string;
  rate: number;
}

export interface ProgramStats2024 {
  budget: number;
  regionalLibrarians: RegionalLibrarianRate[];
  training: TrainingPerformance[];
}
