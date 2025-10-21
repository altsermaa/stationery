import { Header } from "./_components/Header";
import { CategoryBox } from "./_components/CategoryBox";
import { Carousel } from "./_components/Carousel";
import NewArrivals from "./_components/NewArrivals";
import HolidaySection from "./_components/HolidaySection";

const Home = async () => {
  const response = await fetch("http://localhost:8000/getAllProducts", {
    cache: "no-store"

  });
  const data = await response.json();
  console.log(data);

  return (<div className="flex flex-col gap-8 bg-gray-50">
      <div className="mb-8">
        <Carousel />
      </div>
      <NewArrivals />
      <HolidaySection />
      <CategoryBox products={data.products} />
  </div>
    
  );
}

export default Home;