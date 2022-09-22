import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { Link, useParams } from "react-router-dom";

import { Loader } from "../Loader"
import { useListProducts } from "../../hooks/useListProducts";
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

  // const products = getListProducts.data?.filter((item: any) => item.id == id)

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

  // console.log(getListProducts?.data)

  const MapList = ({ product }: any) => {
    return (
      <tr key={product.id} className="text-center border-b border-[#dddddd] hover:bg-black cursor-pointer">
        <td>{product.lmCode}</td>
        <td>{product.lmDesc}</td>
        <td>
          <input
            key={product.saleAmbition}
            {...register(`products.${product.id}.saleAmbition`)}
            placeholder={"saleAmbition"}
            defaultValue={product.saleAmbition}
            onChange={(e) => setValue("saleAmbition", e.target.value)}
            className="text-center text-white bg-gray-700 hover:bg-black cursor-pointer"
          />
        </td>
        <td>
          <input
            {...register(`products.${product.id}.salePrice`)}
            placeholder={"salePrice"}
            defaultValue={product.salePrice}
            onChange={(e) => setValue("salePrice", e.target.value)}
            className="text-center text-white bg-gray-700 hover:bg-black cursor-pointer"
          />
        </td>
      </tr>
    )
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
      {getListProducts?.data?.map((item: any) => {
        return (
          <>
            <h1 className="mt-4 text-center mb-5">{item.name}</h1>
            <div className="flex flex-row justify-center align-middle h-max">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-700 w-auto rounded-lg shadow-md "
              >
                <table className="border-collapse	my-6 text-xs font-sans min-w-[400px] shadow-sm">
                  <thead className="">
                    <tr>
                      <th>Lm</th>
                      <th>Descrição</th>
                      <th>Ambição de vendas</th>
                      <th>Preço de venda</th>
                    </tr>
                  </thead>
                  {item.products.map((product: any) => {
                    return (
                      <>
                        <MapList product={product} />
                        {product.articles?.map((article: any) => {
                          console.log(article)
                          return <MapList product={article} />
                        })}
                        {product.linelists?.map((linelist: any) => {
                          console.log(linelist)
                          return <MapList product={linelist} />
                        })}
                      </>
                    )
                  })}
                </table>
              </form>
              {/* <div className="fixed bottom-0 w-full bg-[black] h-14 flex flex-row justify-end align-middle">
                <Link to="/"><button type="button" className="h-full w-20 hover:bg-black hover:text-white bg-white text-black mr-5 rounded-lg">Voltar</button></Link>

                <button type="submit" className="h-full w-20 hover:bg-black hover:text-white bg-white text-black mr-5 rounded-lg">Salvar</button>
              </div> */}
            </div>
          </>
        )
      })}
    </>
  )
}
