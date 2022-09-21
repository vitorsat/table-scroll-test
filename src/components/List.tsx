import { Link } from "react-router-dom";
import { useListProducts } from "../hooks/useListProducts";
import { Loader } from "./Loader";

let renderCount = 0

export function ListComponent() {
  renderCount++
  const { getListProducts } = useListProducts()

  if (getListProducts.isLoading) {
    return <Loader />
  }

  return (
    <>
      <h1 className="text-fuchsia-50 flex align-center justify-center mt-3">
        Render Count: {renderCount}
      </h1>
      <div className="text-center mt-10">
        <ul>List</ul>
        {getListProducts.data?.map((item: any) => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <li className="pb-3">{item.name}</li>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  );
}
