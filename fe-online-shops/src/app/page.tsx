import { Header } from "./_components/Header";
import { ShowCards } from "./_components/ShowCards";

const Home = async () => {
  const response = await fetch("https://onlineshop-sqmq.onrender.com/getAllProducts", {
    cache: "no-store"

  });
  const data = await response.json();
  console.log(data);

  return (
    <div className="w-[360px] lg:w-[930px] mx-auto">
      <ShowCards products={data.products} />
    </div>
  );
}

export default Home;