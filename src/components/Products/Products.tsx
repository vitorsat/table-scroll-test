import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useParams } from "react-router-dom";

import { Loader } from "../Loader"
import { useListProducts } from "../../hooks/useListProducts";
import { BiError } from "react-icons/bi";
import { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";

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
    // console.log(values)
    // return postPost.mutate({
    // })
  }

  // console.log(getListProducts?.data)

  const MapList = ({ product }: any) => useMemo(() => {
    return (
      <tr key={product.id} className="text-center border-b border-[#dddddd]">
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
  }, [product])

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
                  <tbody>
                    {item.products.map((product: any) => {
                      return (
                        <>
                          {console.log(product)}
                          <MapList product={product} />
                          <div className="flex flex-row justify-center mb-5 w-fit">
                            <Virtuoso
                              className="w-fit"
                              style={{ overflow: 'auto', height: '200px', width: '450px' }}
                              data={product.articles}
                              totalCount={product.articles.length}
                              itemContent={index =>
                                <>
                                  <thead className="">
                                    <tr>
                                      <th>Lm</th>
                                      <th>Descrição</th>
                                      <th>Ambição de vendas</th>
                                      <th>Preço de venda</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <MapList product={product.articles[index]} />
                                  </tbody>
                                </>
                              }
                            />
                            <Virtuoso
                              className="w-fit"
                              style={{ overflow: 'auto', height: '200px', width: '450px' }}
                              data={product.linelinst}
                              totalCount={product.linelinst.length}
                              itemContent={index =>
                                <>
                                  <thead className="">
                                    <tr>
                                      <th>Lm</th>
                                      <th>Descrição</th>
                                      <th>Ambição de vendas</th>
                                      <th>Preço de venda</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <MapList product={product.linelinst[index]} />
                                  </tbody>
                                </>
                              }
                            />
                          </div>
                        </>
                      )
                    })}
                  </tbody>
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


{/* <Virtuoso
                          //     useWindowScroll
                          //     className="table-helpcentral virtuoso-list-festival virtuoso-list festival"
                          //     style={{ overflowY: product.length > 0 ? 'scroll' : 'hidden', margin: 0 }}
                          //     data={product}
                          //     components={{ Item: MapList }}
                          //     itemContent={(index, item) => {
                          //       return (
                          //         <MapList product={item} />
                          //       )
                          //     }

                                // {
                                //   item.linelists?.map((linelist: any) => {
                                //     console.log(linelist)
                                //     return <MapList product={linelist} />
                                //   })
                                // }


                            //   }
                            // /> */}
