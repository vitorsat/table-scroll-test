import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, useWatch } from "react-hook-form"
import * as yup from "yup"
import { useParams } from "react-router-dom";

import { Loader } from "../Loader"
import { useListProducts } from "../../hooks/useListProducts";
import { BiError } from "react-icons/bi";
import { useEffect, useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowDown } from "phosphor-react";
import { styled } from '@stitches/react';

let renderCount = 0

const validationSchema = yup.object({})

export default function ProductsComponent() {
  renderCount++
  const { getListProducts } = useListProducts()

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

    const result = Number(saleAmbition) * Number(salePrice)
    const debouncedValue = useDebounce({ value: result, delay: 500 })

    return (
      <p>{debouncedValue}</p>
    )
  }

  const InputLm = () => {
    return (
      <div>
        <input
          className="h-10 border border-gray-300 rounded-md px-2 py-1"
          id="saleAmbition"
          type="text"
          placeholder="Insira um ou mais Lms principais aqui"
        />
      </div>
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

  const TriggerStyled = styled(ArrowDown, {
    transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
    '[data-state=open] &': { transform: 'rotate(180deg)' }
  })

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
      {getListProducts?.data?.map((item: any, index: number) => {
        return (
          <Accordion.Root type="single" collapsible>
            <Accordion.Item value={"item"}>
              <div className="flex flex-col justify-center items-center align-middle h-max mb-6 w-full">
                <div className="bg-white w-full py-4 max-w-[1520px] rounded-xl">
                  <div className="flex justify-around items-center">
                    <div>
                      <Accordion.Trigger asChild>
                        <TriggerStyled size={24} className="inline text-[#78be20]" />
                      </Accordion.Trigger>
                      <span className="w-5 h-5 bg-[#78be20] rounded-full p-3 text-white">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <InputLm />
                      <button type="button" className="h-10 px-2 text-white bg-[#78be20] rounded-lg">Adicionar</button>
                    </div>
                  </div>
                </div>
                <Accordion.Content className="animate-slideDownAnimation">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-4/5 pt-1 rounded-xl shadow-lg align-center mb-4 mx-auto"
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
                </Accordion.Content>
              </div>
            </Accordion.Item>
          </Accordion.Root>
        )
      })}
    </>
  )
}
