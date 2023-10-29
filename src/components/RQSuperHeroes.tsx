import { Fragment, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

type Hero = {
  id: string;
  name: string;
  alterEgo: string;
};

// const fetchSuperHeroes = async () => {
//   const response = await axios.get("http://localhost:4000/superheroes");
//   return response.data;
// };

export default function RQSuperHeroes() {
  const [name, setName] = useState<string>("");
  const [alterEgo, setAlterEgo] = useState<string>("");

  // const { refetch, isLoading, data, isError, error, isFetching } = useQuery({
  //   queryKey: ["super-heroes"],
  //   queryFn: fetchSuperHeroes,
  //   // staleTime: 10000,
  //   // refetchOnWindowFocus: false,
  //   // refetchInterval: 2000,
  //   // refetchIntervalInBackground: true,
  //   enabled: false,
  //   select: (data) => {
  //     const superHeroNames = data.map((hero: Hero) => ({
  //       name: hero.alterEgo,
  //     }));
  //     return superHeroNames;
  //   },
  // });

  const { refetch, isLoading, data, isError, error, isFetching } =
    useSuperHeroesData();
  const { mutate } = useAddSuperHeroData();

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Fragment>
      <h1>RQ Super Heroes Page</h1>
      <div>
        <input
          style={{ color: "black" }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={{ color: "black" }}
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button
          onClick={() => {
            const hero = { id: new Date().getTime(), name, alterEgo };
            mutate(hero);
          }}
        >
          Add Data
        </button>
      </div>
      <button onClick={() => refetch()} style={{ color: "black" }}>
        Fetch Heroes
      </button>
      {data?.map((hero: Hero) => {
        return (
          <div>
            <Link to={`/rq-super-hero/${hero.id}`} key={hero.id}>
              {hero.name}
            </Link>
          </div>
        );
      })}
    </Fragment>
  );
}
