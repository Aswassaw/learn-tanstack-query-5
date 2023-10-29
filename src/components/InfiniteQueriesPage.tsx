import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchColors = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  );
  return response.data;
};

export default function InfiniteQueriesPage() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors-infinite"],
    queryFn: fetchColors,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length) {
        return pages.length + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
  });

  console.log(data);
  console.log(hasNextPage);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Fragment>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.map((color: { id: number; label: string }) => (
                <h1>
                  {color.id} - {color.label}
                </h1>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </Fragment>
  );
}
