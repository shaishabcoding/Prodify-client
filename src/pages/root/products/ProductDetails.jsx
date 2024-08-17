import { useParams } from "react-router-dom";
import useProduct from "../../../hooks/useProduct";
import Rating from "react-rating";
import { MdStar, MdStarBorder } from "react-icons/md";
import Loading from "../../../shared/loading/Loading";
import { toast } from "react-toastify";

const MealDetails = () => {
  const { id } = useParams();
  const [product, , isLoading] = useProduct(id);

  const {
    productName,
    productImage,
    description,
    price,
    category,
    ratings,
    productCreationDate,
    brandName,
  } = product;

  return (
    <div className="p-2 lg:p-0 lg:py-10">
      {isLoading && <Loading className="mb-4 md:my-4 lg:my-10" />}
      <div className="rounded-lg overflow-hidden flex flex-col lg:flex-row border border-gray-100 shadow-sm bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
        <img
          src={productImage}
          className="lg:w-1/2 m-4 dark:bg-gray-400 rounded-lg aspect-video object-cover"
        />
        <div className="flex-1">
          <div className="p-3 flex-1 pb-5 dark:bg-gray-600 dark:text-white grow h-full flex flex-col">
            <h2 className="text-2xl md:text-4xl md:mb-4 font-semibold">
              {productName}
            </h2>
            <div className="flex flex-col gap-2 mt-3 grow">
              <p>{description}</p>
              <p>
                <b>Price : </b> $ {price}
              </p>
              <p>
                <b>Brand : </b>
                {brandName}
              </p>
              <p>
                <b>Category : </b>
                {category}
              </p>
              <p>
                <b>Rating :</b>
                <Rating
                  className="translate-y-1"
                  readonly
                  initialRating={ratings}
                  emptySymbol={<MdStarBorder />}
                  fullSymbol={<MdStar />}
                />
              </p>
              <p>
                <b>Time : </b>{" "}
                {new Date(productCreationDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => {
                  toast.success("Buy successfully");
                }}
                className="btn btn-sm md:btn-md btn-primary"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
