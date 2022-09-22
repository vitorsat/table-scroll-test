import { Link } from "react-router-dom";
import { useListProducts } from "../../hooks/useListProducts";
import { Loader } from "../Loader";
import { BiError } from "react-icons/bi";
import { Itens } from './style'

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
        <>
          <h1 className="text-3xl text-center mt-3">List</h1>
          <div className="text-center m-3 flex flex-row flex-wrap justify-between">
            {getListProducts.data?.map((item: any) => {
              return (
                <Itens key={item.id}>
                  <Link className="h-full w-full" to={`/products/${item.id}`}>
                    <p>{item.id}</p>
                    <p>{item.name}</p>
                  </Link>
                </Itens>
              )
            })}
          </div>
        </>
      }
    </>
  );
}
