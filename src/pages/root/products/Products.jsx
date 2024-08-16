import useProducts from "../../../hooks/useProducts";
import ProductsCard from "./components/ProductsCard";

const Products = () => {
  const [{ products, productsCount }] = useProducts();
  return (
    <div className="w-full lg:p-6 lg:px-0 px-2 lg:mx-0 lg:rounded-lg lg:my-6 my-1 py-6">
      <h2 className="text-2xl lg:mt-10 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        All Products ({productsCount})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, idx) => (
          <ProductsCard {...{ product }} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Products;
