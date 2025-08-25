import Badge from "@components/elements/badge/Badge";
import Heading from "@components/elements/heading/Heading";

const skillList = [
  "React.js & Next.js",
  "React Native",
  "TypeScript & JavaScript",
  "Node.js & NestJS",
  "FastAPI & Django",
  "RESTful APIs & GraphQL",
  "Redux Toolkit & Zustand",
  "Tailwind CSS",
  "Jest & Vitest",
  "CI/CD",
  "AWS, Azure, GCP basics",
  "Performance Optimization",
  "Leadership",
  "UX/UI Implementation",
  "Collaboration & Code Review",
  "Authentication & Security"
];
const Skills = () => {
  return (
    <section className="relative z-1 m-auto flex flex-col flex-wrap gap-[32px] md:w-4/5">
      <Heading>Skills</Heading>
      <div className="flex flex-wrap gap-2 xl:w-3/4">
        {skillList.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </section>
  );
};
export default Skills;
