import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import FeaturedDrinks from "@/components/home/FeaturedDrinks";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Mission />
          <FeaturedDrinks />
          <Reviews />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
