import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface NuggetOption {
  title: string;
  whyItWorks: string;
  point: string;
  whyTheyCare: string;
  proof: string;
}

export interface SceneBeat {
  sceneNum: number;
  name: string;
  timingStart: number;
  timingEnd: number;
  duration: number;
  dialogue: string;
  action: string;
  camera: { shot: string; angle: string; movement: string };
  actor: { expression: string; energy: number; pace: string };
  visual: string;
  audio: string;
  editMarkers: { time: string; event: string }[];
}

export interface FormData {
  // Video Identity
  date: string;
  creator: string;
  actor: string;
  company: string;
  platform: string;
  estimatedLength: string;
  aspectRatio: string;
  actorCount: string;
  language: string;
  // Research
  research: string;
  // AI-extracted nuggets (real API response lives here)
  nuggetOptions: NuggetOption[] | null;
  selectedNuggetIndex: number | null;
  // Topic — Forced Format
  niche: string;
  subNiche: string;
  thePoint: string;
  whyTheyCare: string;
  theProof: string;
  // Value Delivery
  actionableTakeaway: string;
  whyNugget: string;
  timeToValue: string;
  contentStyle: string;
  selfChecks: Record<string, string>;
  validationChecks: Record<string, boolean>;
  // Reference Video
  refUrl: string;
  copyElement: string;
  copyDescription: string;
  // AI-generated screenplay (Phase 3 output, consumed by Phase 4/5)
  screenplay: SceneBeat[] | null;
  // Which saved project this session corresponds to (null until first save)
  projectId: string | null;
}

interface FormDataContextValue {
  data: FormData;
  updateData: (patch: Partial<FormData>) => void;
  resetData: () => void;
  loadData: (fullData: FormData) => void;
}

const STORAGE_KEY = 'viralform_data';

const defaultData: FormData = {
  date: '',
  creator: '',
  actor: '',
  company: '',
  platform: '',
  estimatedLength: '',
  aspectRatio: '9:16',
  actorCount: '1',
  language: 'EN',
  research: '',
  nuggetOptions: null,
  selectedNuggetIndex: null,
  niche: '',
  subNiche: '',
  thePoint: '',
  whyTheyCare: '',
  theProof: '',
  actionableTakeaway: '',
  whyNugget: '',
  timeToValue: '',
  contentStyle: '',
  selfChecks: {},
  validationChecks: {},
  refUrl: '',
  copyElement: '',
  copyDescription: '',
  screenplay: null,
  projectId: null,
};

const FormDataContext = createContext<FormDataContextValue | undefined>(undefined);

export function FormDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (patch: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const loadData = (fullData: FormData) => {
    setData(fullData);
  };

  return (
    <FormDataContext.Provider value={{ data, updateData, resetData, loadData }}>
      {children}
    </FormDataContext.Provider>
  );
}

export function useFormData() {
  const ctx = useContext(FormDataContext);
  if (!ctx) throw new Error('useFormData must be used within FormDataProvider');
  return ctx;
}
