import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useParams } from "react-router-dom";

import { Loader } from "./Loader"
import { useListProducts } from "../hooks/useListProducts";
import { BiError } from "react-icons/bi";

let renderCount = 0

const validationSchema = yup.object({
  // id: yup.string().required("O campo id é obrigatório"),
  // title: yup.string().required("O campo title é obrigatório"),
  // body: yup.string().required("O campo body é obrigatório"),
})

export default function ProductsComponent() {
  renderCount++
  const { getListProducts } = useListProducts()

  const { id } = useParams();

  const products = getListProducts.data?.filter((item: any) => item.id == id)

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = () => {
    const values = getValues()
    console.log(values)
    // return postPost.mutate({
    // })
  }

  return (
    <>
      {getListProducts.isLoading ? <Loader /> : ''}
      <h1 className="text-fuchsia-50 flex align-center justify-center mt-3">
        Render Count: {renderCount}
      </h1>
      {getListProducts.error ?
        <div className="text-center flex flex-row align-middle justify-center mt-96">
          <BiError className="text-6xl text-red-500" />
          <p className="ml-4 text-center mt-3 text-4xl">{getListProducts.error?.message}</p>
        </div>
        : ''}
      {products?.map((item: any) => {
        return (
          <>
            <h1 className="mt-4 text-center mb-5">{products.name}</h1>
            <div className="flex flex-row justify-center align-middle h-max">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col align-middle justify-center h-min bg-gray-700"
              >
                <table>
                  <thead>
                    <tr>
                      <th>lmCode</th>
                      <th>lmDesc</th>
                      <th>saleAmbition</th>
                      <th>salePrice</th>
                    </tr>
                  </thead>
                  {item.products.map((product: any) => {
                    return (
                      <tbody key={product.id}>
                        <tr>
                          <td>{product.lmCode}</td>
                          <td>{product.lmDesc}</td>
                          <td>
                            <input
                              key={product.saleAmbition}
                              {...register(`products.${product.id}.saleAmbition`)}
                              placeholder={"saleAmbition"}
                              defaultValue={product.saleAmbition}
                              onChange={(e) => setValue("saleAmbition", e.target.value)}
                              className="text-center mt-3 text-slate-900"
                            />
                          </td>
                          <td>
                            <input
                              {...register(`products.${product.id}.salePrice`)}
                              placeholder={"salePrice"}
                              defaultValue={product.salePrice}
                              onChange={(e) => setValue("salePrice", e.target.value)}
                              className="text-center mt-3 text-slate-900"
                            />
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}
                  <input type="submit" />
                </table>
              </form>
            </div>
          </>
        )
      })}
    </>
  )
}
