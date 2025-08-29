"use client";

import React from "react";

import Banner from "@components/elements/banner/Banner";
import CaseStudy from "@components/elements/case-study/CaseStudy";
import ExperienceTable from "@components/elements/experience-table/ExperienceTable";
import CompanyTestimonies from "@components/elements/company-testmonies/CompanyTestimonies";
import Bio from "@components/containers/bio/Bio";
import Skills from "@components/containers/skills/Skills";
import Footer from "@components/containers/footer/Footer";
// import SocialNetwork from "@components/containers/social-network/SocialNetwork";

export default function Page() {
  return (
    <main className="moving-gradient relative contents flex h-min min-h-screen w-[1200px] w-auto flex-col flex-nowrap justify-start gap-0 overflow-hidden bg-black px-8 py-0 md:px-12">
      <div className="fixed top-[calc(50.00000000000002%-480px/2)] left-[calc(50.00000000000002%-84.66666666666667%/2)] h-[480px] w-[85%] flex-none overflow-visible blur-[80px]" />
      <div className="fixed top-0 left-[calc(50.00000000000002%-100%/2)] h-screen w-full flex-none">
        <div className="noise h-full w-full rounded-none bg-[128px] bg-repeat opacity-[0.075]" />
      </div>
      <main className="z-1 flex flex-col gap-12 md:gap-40">
        <Banner />
        <CaseStudy />
        <Bio />
        <Skills />
        <ExperienceTable />

        <CompanyTestimonies />
        {/* <SocialNetwork /> */}
        <Footer />
      </main>
    </main>
  );
}
