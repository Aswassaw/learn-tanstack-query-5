import { Fragment } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import Home from "./components/Home";
import SuperHeroes from "./components/SuperHeroes";
import RQSuperHeroes from "./components/RQSuperHeroes";
import RQSuperHero from "./components/RQSuperHero";
import PararelQueries from "./components/PararelQueries";
import DependentQueries from "./components/DependentQueries";
import PaginatedQueriesPage from "./components/PaginatedQueriesPage";
import InfiniteQueriesPage from "./components/InfiniteQueriesPage";

const queryCLient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess: () => {
      // alert("SUCCESS");
    },
    onError: (error) => {
      console.log(error);

      if (error instanceof AxiosError) {
        alert(error.response?.data.error);
      }
    },
  }),
});

function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryCLient}>
        <BrowserRouter>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/super-heroes">Traditional Super Heroes</Link>
                </li>
                <li>
                  <Link to="/rq-super-heroes">RQ Super Heroes</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
              </Route>
              <Route path="/super-heroes">
                <Route index element={<SuperHeroes />} />
              </Route>
              <Route path="/rq-super-heroes">
                <Route index element={<RQSuperHeroes />} />
              </Route>
              <Route path="/rq-super-hero/:heroId">
                <Route index element={<RQSuperHero />} />
              </Route>
              <Route path="/rq-pararrel">
                <Route index element={<PararelQueries />} />
              </Route>
              <Route path="/dependent-queries">
                <Route index element={<DependentQueries />} />
              </Route>
              <Route path="/paginated">
                <Route index element={<PaginatedQueriesPage />} />
              </Route>
              <Route path="/infinite">
                <Route index element={<InfiniteQueriesPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
