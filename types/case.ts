import { Stack } from "./stack";

export type Case = {
  id: string;
  title: string;
  description: string;
  stack: Stack[];
  content: string;
};
