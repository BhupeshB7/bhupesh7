import Credibility from "@/components/latest-design/Credibility";
import FeaturedWork from "@/components/latest-design/FeaturedWork";
import Footer from "@/components/latest-design/Footer";
import Hero from "@/components/latest-design/Hero";
import Insights from "@/components/latest-design/Insights";
import WhatIBuild from "@/components/latest-design/WhatIBuild";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Credibility />
      <WhatIBuild />
      <FeaturedWork />
      <Insights />
      <Footer />
    </>
  );
}
