import HeroSearch from "@/components/HeroSearch";
import FeaturedDeals from "@/components/FeaturedDeals";
import QuickCategories from "@/components/QuickCategories";
import BottomNav from "@/components/BottomNav";
import DesktopNav from "@/components/DesktopNav";
import PiggyLogo from "@/components/PiggyLogo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      
      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex flex-col items-center">
          <PiggyLogo size={28} />
          <span className="font-bold text-xl text-foreground mt-2 leading-tight">ComprAhorro</span>
        </div>
      </header>

      <main className="pb-24 md:pb-12">
        <HeroSearch />
        <QuickCategories />
        <FeaturedDeals />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
