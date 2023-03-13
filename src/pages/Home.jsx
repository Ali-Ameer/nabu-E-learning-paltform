import About from "../components/About";
import { Category } from "../components/Category";
import { DataInfo } from "../components/DataInfo";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { NewsLetter } from "../components/NewsLetter";
import { PopularCourse } from "../components/PopularCourse";

export default function Home() {
  return (
    <>
      <Hero />
      <DataInfo />
      <PopularCourse />
      <About />
      <Category />
      <NewsLetter />
      <Footer />
    </>
  );
}
