import { Header } from "./_components/Header";
import { ShowCards } from "./_components/ShowCards";
import { Carousel } from "./_components/Carousel";

const Home = async () => {
  const response = await fetch("https://onlineshop-sqmq.onrender.com/getAllProducts", {
    cache: "no-store"

  });
  const data = await response.json();
  console.log(data);

  return (<div className="flex flex-col gap-8">
          <div className="mb-8">
        <Carousel />
      </div>
    <div className="w-[360px] lg:w-[930px] mx-auto">
      <ShowCards products={data.products} />
    </div>
  </div>
    
  );
}

export default Home;