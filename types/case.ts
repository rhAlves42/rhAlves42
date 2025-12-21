import { Stack } from "./stack";

export type Case = {
  id: string;
  title: string;
  description: string;
  stack: Stack[];
  content: string;
  file?: string;
};

export type CaseCard = {
  file: string;
  stack: Stack[];
  description: string;
  slug: string;
  title: string;
};
