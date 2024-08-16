import { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import useBrands from "../../../hooks/useBrands";
import useCategories from "../../../hooks/useCategories";
import ProductsCard from "./components/ProductsCard";
import Loading from "../../../shared/loading/Loading";

const Products = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [{ products, productsCount }, refetch, isFetching, isPreviousData] =
    useProducts(page, query, sort, brand, category);
  const [brands] = useBrands();
  const [categories] = useCategories();

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
      <div className="flex flex-row flex-wrap gap-2 md:gap-4 w-fit md:mx-auto mb-4">
        <form onSubmit={searchProducts} className="flex justify-center md:mb-6">
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
        <select
          onChange={(e) => {
            setSort(e.target.value);
          }}
          defaultValue=""
          className="select w-fit dark:bg-gray-500 dark:text-white grow select-bordered select-sm md:select-md"
        >
          <option disabled value="">
            Sort
          </option>
          <option value="priceLowToHigh">High Price</option>
          <option value="priceHighToLow">Low Price</option>
          <option value="dateNewest">New Products</option>
          <option value="">All Products</option>
        </select>
        <select
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          defaultValue=""
          className="select w-fit dark:bg-gray-500 dark:text-white grow select-bordered select-sm md:select-md"
        >
          <option disabled value="">
            Brand
          </option>
          <option value="">All Brands</option>
          {brands.map((brand, idx) => (
            <option value={brand} key={idx}>
              {brand}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          defaultValue=""
          className="select w-fit dark:bg-gray-500 dark:text-white grow select-bordered select-sm md:select-md"
        >
          <option disabled value="">
            Category
          </option>
          <option value="">All Categories</option>
          {categories.map((category, idx) => (
            <option value={category} key={idx}>
              {category}
            </option>
          ))}
        </select>
      </div>
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
