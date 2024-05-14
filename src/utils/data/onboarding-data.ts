export interface OnboardingData {
  id: number;
  text: string;
  textColor: string;
  backgroundColor: string;
}

export const data: OnboardingData[] = [
  {
    id: 1,
    text: 'Crea espacios para tu hogar de forma simple y fácil.',
    textColor: '#06b6d4',
    backgroundColor: '#cffafe',
  },
  {
    id: 2,
    text: 'Visualiza los datos de tus dispositivos y sensores en tiempo real.',
    textColor: '#6366f1',
    backgroundColor: '#c7d2fe',
  },
  {
    id: 3,
    text: 'Comparte dispositivos con tus compañeros de piso.',
    textColor: '#8b5cf6',
    backgroundColor: '#ddd6fe',
  },
];
