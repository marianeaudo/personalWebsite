import { Timestamp } from '@firebase/firestore-types';

export interface Skill {
  name: string;
  image: string;
  level: number;
  category: string;
  rank: number;
  content?: string;
}

export interface Training {
  name: string;
  school: string;
  schoolImage: string;
  content: string;
  beginningDate: Timestamp;
  duration?: number;
}

export interface Experience {
  name: string;
  company: string;
  beginningDate: Timestamp;
  duration: number;
  content: string;
  logo: string;
}

export interface Certification {
  date: Timestamp;
  name: string;
  school: string;
  source: string;
  teacher: string;
}
