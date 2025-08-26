import Table from "@components/ui/table/Table";
import { ReactNode } from "react";
import Heading from "../heading/Heading";

const ExperienceTable = () => {
  const rows: ReactNode[] = [
    { company: "Loka", duration: "Sep 2023 – Jun 2025", title: "Web & Mobile Developer" },
    { company: "Miratech", duration: "Nov 2022 – Sep 2023", title: "Web & Mobile Developer" },
    { company: "AMcom", duration: "Jul 2022 – Nov 2022", title: "Frontend Developer" },
    { company: "eNe", duration: "Jan 2011 - Jun 2015", title: "Fullstack Developer" },
    { company: "WCORE", duration: "Jan 2011 - Jun 2015", title: "Junior Software Developer" }
  ].map(
    (info) =>
      (
        <tr className="border-b-[0.5px] border-b-[#ffffff33] bg-transparent">
          <th scope="row">
            <p className="text-6 text-xl font-normal !text-[#b3c2cbff] md:text-2xl">{info.title}</p>
          </th>
          <td className="min-w-content relative flex h-min flex-col content-end items-end justify-center gap-[10px] overflow-hidden py-4">
            <p className="text-right text-lg">{info.company}</p>
            <p className="text-right text-base whitespace-nowrap md:text-lg md:whitespace-normal">
              {info.duration}
            </p>
          </td>
        </tr>
      ) as ReactNode
  );
  return (
    <section className="relative z-1 m-auto flex flex-col flex-wrap gap-[32px] md:w-4/5">
      <Heading>Experience</Heading>
      <Table rows={rows} />
    </section>
  );
};

export default ExperienceTable;
