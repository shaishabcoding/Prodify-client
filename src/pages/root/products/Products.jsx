import { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import ProductsCard from "./components/ProductsCard";
import Loading from "../../../shared/loading/Loading";

const Products = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [{ products, productsCount }, refetch, isFetching, isPreviousData] =
    useProducts(page, query);

  const searchProducts = async (e) => {
    e.preventDefault();
    setQuery(e.target.query.value);
    refetch();
  };

  return (
    <div className="w-full lg:p-6 lg:px-0 px-2 lg:mx-0 lg:rounded-lg lg:my-6 my-1 py-6">
      <h2 className="text-2xl lg:mt-10 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        All Products ({productsCount})
      </h2>
      <form
        onSubmit={searchProducts}
        className="flex justify-center mb-4 md:mb-6"
      >
        <div className="join">
          <div>
            <div>
              <input
                className="input input-sm md:input-md input-bordered join-item border-primary"
                type="text"
                name="query"
                placeholder="Search for users..."
              />
            </div>
          </div>
          <div className="indicator">
            <button
              type="submit"
              className="btn btn-sm md:btn-md join-item btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {isFetching && <Loading className="mb-4 md:my-4 lg:my-10" />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product, idx) => (
          <ProductsCard {...{ product }} key={idx} />
        ))}
      </div>
      <div className="mx-auto w-fit my-6">
        <div className="join">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
            className="join-item btn btn-sm md:btn-md"
          >
            «
          </button>
          {Array.from({ length: Math.ceil(productsCount / 10) }).map(
            (_, idx) => (
              <button
                className={`join-item btn btn-sm md:btn-md ${
                  page === idx && "bg-info border-info"
                }`}
                key={idx}
                onClick={() => setPage(idx)}
              >
                {idx + 1}
              </button>
            )
          )}
          <button
            onClick={() => {
              if (!isPreviousData && page < Math.ceil(productsCount / 10) - 1) {
                setPage((old) => old + 1);
              }
            }}
            disabled={
              isPreviousData || page >= Math.ceil(productsCount / 10) - 1
            }
            className="join-item btn btn-sm md:btn-md"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
