import { Fragment } from "react";
import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

export default function RQSuperHero() {
  const { heroId = "1" } = useParams();
  const { isLoading, data, isError, error, isFetching } =
    useSuperHeroData(parseInt(heroId));

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(data);

  return (
    <Fragment>
      <div>
        {data.name} - {data.alterEgo}
      </div>
    </Fragment>
  );
}
