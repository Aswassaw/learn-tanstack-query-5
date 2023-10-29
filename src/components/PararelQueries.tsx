import axios from "axios";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchSuperheroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export default function PararelQueries() {
  const { data: superheroes } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperheroes,
  });
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  console.log(superheroes);
  console.log(friends);

  return (
    <Fragment>
      <h1>PararelQueries</h1>
    </Fragment>
  );
}
