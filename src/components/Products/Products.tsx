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
      <tr key={product.id} className="text-center border-b border-[#dddddd]">
        <td>{product.lmCode}</td>
        <td>{product.lmDesc}</td>
        <input
          {...register(`${product.id}.saleAmbition`)}
          placeholder={"saleAmbition"}
          defaultValue={product.saleAmbition}
          className="text-center text-white bg-gray-700 hover:bg-black cursor-pointer"
        />
        <td>
          <input
            {...register(`${product.id}.salePrice`)}
            placeholder={"salePrice"}
            defaultValue={product.salePrice}
            className="text-center text-white bg-gray-700 hover:bg-black cursor-pointer"
          />
        </td>
        <td>
          <SaleAmbitionInput control={control} product={product} />
        </td>
      </tr>
    )
  }, [])

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
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
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
