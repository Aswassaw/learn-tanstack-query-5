import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Hero = {
  id: string;
  name: string;
  alterEgo: string;
};

const fetchSuperHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  return response.data;
};

const addSuperHero = (hero: { id: number; name: string; alterEgo: string }) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // staleTime: 10000,
    // refetchOnWindowFocus: false,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
    // enabled: false,
    // select: (data) => {
    //   const superHeroNames = data.map((hero: Hero) => ({
    //     name: hero.alterEgo,
    //   }));
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero,
    onSuccess: (data) => {
      // alert("SUCCESS");

      console.log(data);
      queryCLient.setQueryData(["super-heroes"], (oldQueryData: Hero[]) => {
        console.log(oldQueryData);

        return [...oldQueryData, data.data];
      });

      // queryCLient.invalidateQueries({
      //   queryKey: ["super-heroes"],
      // });
    },
  });
};
