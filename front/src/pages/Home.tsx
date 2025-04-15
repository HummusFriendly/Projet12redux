import Hero from "../components/Hero";
import Features from "../components/Features";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <Features />
    </main>
  );
}

export default Home;