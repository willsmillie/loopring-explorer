import React from "react";
import { useRouter } from "next/router";
import useSearch from "../hooks/useSearch";

import AppLink from "../components/AppLink";

const Search: React.FC<{}> = () => {
  const router = useRouter();
  const searchQuery = router.query.q;
  const { loaded, results } = useSearch(searchQuery as string);

  React.useEffect(() => {
    if (loaded && results.length > 0) {
      if (results.length === 1) {
        router.replace(results[0].link);
      }
    }
  }, [loaded, results]);

  if (!loaded) {
    return (
      <div className="bg-white shadow-custom rounded p-4 h-40 mt-24 text-gray-400 text-2xl flex items-center justify-center animate-pulse">
        Searching...
      </div>
    );
  }

  if (loaded && results.length === 0) {
    return (
      <div className="bg-white shadow-custom rounded px-4 py-10 h-40 mt-24 flex items-center justify-between flex-col text-center">
        <h2 className="text-3xl text-indigo-900">No results found</h2>
        <div className="text-lg text-indigo-700">
          We couldn't find any block, transaction or account with ID:&nbsp;
          <span className="font-bold">{searchQuery}</span>
        </div>
      </div>
    );
  }

  if (loaded && results.length > 1) {
    return (
      <div className="bg-white shadow-custom rounded px-4 py-10 min-h-table mt-24">
        <h2 className="text-3xl text-indigo-900">Search Results</h2>
        <span className="mb-4">
          We found {results.length} results with ID {searchQuery}
        </span>
        {results.map((result) => {
          let appLinkProps;

          if (result.type === "block") {
            appLinkProps = {
              path: "block",
              block: searchQuery,
            };
          } else if (result.type === "tx") {
            appLinkProps = {
              path: "transaction",
              tx: searchQuery,
            };
          } else if (result.type === "account") {
            appLinkProps = {
              path: "account",
              accountId: searchQuery,
            };
          }
          return (
            <AppLink {...appLinkProps}>
              <div
                key={`${result.type}-${searchQuery}`}
                className="my-4 flex items-center justify-between border px-2 py-4 rounded"
              >
                <span className="text-lg capitalize">
                  {result.type} #{searchQuery}
                </span>
                <button className="px-4 py-1 rounded-sm">View</button>
              </div>
            </AppLink>
          );
        })}
      </div>
    );
  }

  return null;
};

export default Search;
