
import { ExamConfig, GeneratedExamData, SavedExam, SavedConfig } from '../types.ts';

const STORAGE_KEY = 'savedExams';
const CONFIG_STORAGE_KEY = 'savedConfigs';

export const getSavedExams = (): SavedExam[] => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const exams = JSON.parse(savedData) as SavedExam[];
      return exams.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    }
    return [];
  } catch (error) {
    console.error("Failed to parse saved exams from localStorage", error);
    return [];
  }
};

export const saveExam = (config: ExamConfig, data: GeneratedExamData, title: string): SavedExam => {
  const exams = getSavedExams();
  const newExam: SavedExam = {
    id: Date.now().toString(),
    title,
    savedAt: new Date().toISOString(),
    config,
    data,
  };
  exams.unshift(newExam);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
  return newExam;
};

export const deleteExam = (examId: string): void => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
    const exams = JSON.parse(savedData) as SavedExam[];
    const filtered = exams.filter(exam => String(exam.id).trim() !== String(examId).trim());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete exam", error);
  }
};

export const getSavedConfigs = (): SavedConfig[] => {
  try {
    const savedData = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (savedData) {
      const configs = JSON.parse(savedData) as SavedConfig[];
      return configs.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    }
    return [];
  } catch (error) {
    console.error("Failed to parse saved configs from localStorage", error);
    return [];
  }
};

export const saveConfig = (config: ExamConfig, name: string): SavedConfig => {
  const configs = getSavedConfigs();
  const newConfig: SavedConfig = {
    id: Date.now().toString(),
    name,
    savedAt: new Date().toISOString(),
    config,
  };
  configs.unshift(newConfig);
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configs));
  return newConfig;
};

export const deleteConfig = (configId: string): void => {
  try {
    const savedData = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!savedData) return;
    const configs = JSON.parse(savedData) as SavedConfig[];
    const filtered = configs.filter(config => String(config.id).trim() !== String(configId).trim());
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete config", error);
  }
};

export const clearAllExams = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const clearAllConfigs = (): void => {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
};
