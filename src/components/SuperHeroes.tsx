import { Fragment, useEffect, useState } from "react";
import axios from "axios";

type Hero = {
  id: string;
  name: string;
  alterEgo: string;
};

export default function SuperHeroes() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Hero[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/superheroes").then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <h1>Super Heroes Page</h1>
      {data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </Fragment>
  );
}
