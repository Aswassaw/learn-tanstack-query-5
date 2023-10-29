import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = async (id: number) => {
  console.log(id);

  const response = await axios.get(`http://localhost:4000/superheroes/${id}`);
  return response.data;
};

export const useSuperHeroData = (id: number) => {
  return useQuery({
    queryKey: ["super-hero", id],
    queryFn: () => fetchSuperHero(id),
    staleTime: 10000,
  });
};
