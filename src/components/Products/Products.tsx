import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import * as yup from "yup"
import { useParams } from "react-router-dom";

import { Loader } from "../Loader"
import { useListProducts } from "../../hooks/useListProducts";
import { BiError } from "react-icons/bi";
import { useEffect, useMemo, useState } from "react";
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
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = () => {
    const values = getValues()
    // console.log(values)
    // return postPost.mutate({
    // })
  }

  const useDebounce = ({ value, delay = 5000 }: any) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const SaleAmbitionInput = ({ control, product }: any) => {
    const saleAmbition = useWatch({
      control,
      name: `${product.id}.saleAmbition`,
      defaultValue: product.saleAmbition
    })

    const salePrice = useWatch({
      control,
      name: `${product.id}.salePrice`,
      defaultValue: product.salePrice
    })

    // const saleAmbitionDebounced = useDebounce({ value: saleAmbition, delay: 500 })
    // const salePriceDebounced = useDebounce({ value: salePrice, delay: 500 })
    const result = Number(saleAmbition) * Number(salePrice)
    const debouncedValue = useDebounce({ value: result, delay: 500 })
    console.log(debouncedValue)

    return (
      <p>{debouncedValue}</p>
    )
  }

  const MapList = ({ product }: any) => useMemo(() => {
    return (
      <tr key={product.id} className="text-center h-9 even:bg-gray-200 font-medium table w-full table-fixed">
        <td className="pl-3">{product.lmCode}</td>
        <td>{product.lmDesc}</td>
        <td className="h-full text-center text-black bg-transparent hover:bg-gray-300 cursor-pointer">
          <input
            {...register(`${product.id}.saleAmbition`)}
            placeholder={"saleAmbition"}
            defaultValue={product.saleAmbition}
            className="h-full w-full text-center text-black bg-transparent hover:bg-gray-300 cursor-pointer"
          />
        </td>
        <td className="h-full text-center text-black bg-transparent hover:bg-gray-300 cursor-pointer">
          <input
            {...register(`${product.id}.salePrice`)}
            placeholder={"salePrice"}
            defaultValue={product.salePrice}
            className="h-full w-full text-center text-black bg-transparent hover:bg-gray-300 cursor-pointer"
          />
        </td>
        <td className="pr-3">
          <SaleAmbitionInput control={control} product={product} />
        </td>
      </tr>
    )
  }, [])

  return (
    <>
      {getListProducts.isLoading ? <Loader /> : ''}
      <h1 className="text-black flex align-center justify-center mt-3">
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
            <h1 className="mt-4 text-center mb-6 font-bold">{item.name}</h1>
            <div className="flex flex-row justify-center align-middle h-max mb-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-4/5 pt-1 rounded-xl shadow-lg align-center mb-4"
              >
                <table className="bg-gray-100 rounded-xl text-base text-black ">
                  <thead className="rounded-xl justify-center h-10 text-lg font-bold text-white">
                    <tr className="table w-full table-fixed h-10">
                      <th className="bg-[#78be20] rounded-tl-lg">Lm</th>
                      <th className="bg-[#78be20] ">Descrição</th>
                      <th className="bg-[#78be20] ">Ambição de vendas</th>
                      <th className="bg-[#78be20] ">Preço de venda</th>
                      <th className="bg-[#78be20] rounded-tr-lg">Resultado</th>
                    </tr>
                  </thead>
                  <tbody className="h-[80vh] block overflow-y-scroll scrollbar">
                    {item.products.map((product: any) => {
                      return (
                        <>
                          <MapList product={product} />
                          {product.linelinst.map((linelist: any) => {
                            return (
                              <MapList product={linelist} />
                            )
                          })}
                          {product.articles.map((article: any) => {
                            return (
                              <MapList product={article} />
                            )
                          })}
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </form>
            </div>
          </>
        )
      })}
    </>
  )
}
