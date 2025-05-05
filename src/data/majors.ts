
import { Major, majorCategories, demandLevels, studyDurations } from './majorTypes';
import { educationMajors } from './majorsEducation';
import { artsMajors } from './majorsArts';
import { humanitiesMajors } from './majorsHumanities';
import { socialSciencesMajors } from './majorsSocialSciences';
import { businessMajors } from './majorsBusiness';
import { lawMajors } from './majorsLaw';
import { scienceMajors } from './majorsScience';
import { techMajors1 } from './majorsTech';
import { techMajors2 } from './majorsTech2';
import { constructionMajors } from './majorsConstruction';
import { agricultureMajors } from './majorsAgriculture';
import { medicineMajors } from './majorsMedicine';

// Барлық мамандықтарды біріктіреміз
export const majorsData: Major[] = [
  ...educationMajors,
  ...artsMajors,
  ...humanitiesMajors,
  ...socialSciencesMajors,
  ...businessMajors,
  ...lawMajors,
  ...scienceMajors,
  ...techMajors1,
  ...techMajors2,
  ...constructionMajors,
  ...agricultureMajors,
  ...medicineMajors
];

// Берілген мамандықтардан ТОП-10 таңдаймыз
export const featuredMajors = majorsData
  .filter(major => major.badge === "Жоғары сұраныс")
  .sort((a, b) => (b.minScore || 0) - (a.minScore || 0))
  .slice(0, 10);

// Модульдерді экспорттаймыз
export { majorCategories, demandLevels, studyDurations };
