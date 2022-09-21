import { Link } from "react-router-dom";
import { useListProducts } from "../hooks/useListProducts";
import { Loader } from "./Loader";
import { BiError } from "react-icons/bi";


let renderCount = 0

export function ListComponent() {
  renderCount++
  const { getListProducts } = useListProducts()

  return (
    <>
      {getListProducts.isLoading ? <Loader /> : ''}
      <h1 className="text-fuchsia-50 flex align-center justify-center mt-3">
        Render Count: {renderCount}
      </h1>
      {getListProducts.error ?
        <>
          <h1 className="text-center mt-10">List</h1>
          <div className="text-center flex flex-row align-middle justify-center mt-96">
            <BiError className="text-6xl text-red-500" />
            <p className="ml-4 text-center mt-3 text-4xl">{getListProducts.error?.message}</p>
          </div>
        </>
        :
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
      }
    </>
  );
}
