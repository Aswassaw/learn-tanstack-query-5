import { Fragment, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const fetchColors = async (pageNumber: number) => {
  console.log(pageNumber);

  const response = await axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
  );
  return response.data;
};

export default function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(pageNumber);

  return (
    <Fragment>
      <div>
        {data.map((dt: { id: number; label: string }) => (
          <>
            {dt?.id} - {dt?.label}
            <br />
          </>
        ))}
      </div>
      <div>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((page) => page - 1)}
        >
          Prev
        </button>
        <button
          disabled={pageNumber === 5}
          onClick={() => setPageNumber((page) => page + 1)}
        >
          Next
        </button>
        {isFetching && "Loading"}
      </div>
    </Fragment>
  );
}
