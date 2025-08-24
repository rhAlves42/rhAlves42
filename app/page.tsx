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
    <main className="flex flex-col gap-12 md:gap-40">
      <Banner />
      <CaseStudy />
      <Bio />
      <Skills />
      <ExperienceTable />

      <CompanyTestimonies />
      {/* <SocialNetwork /> */}
      <Footer />
    </main>
  );
}
