import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import 'react-data-grid/lib/styles.css';
import DataGrid, { textEditor } from 'react-data-grid';
import { useParams } from "react-router-dom";

import { Loader } from "./Loader"
import { useListProducts } from "../hooks/useListProducts";

let renderCount = 0

const validationSchema = yup.object({
  id: yup.string().required("O campo id é obrigatório"),
  title: yup.string().required("O campo title é obrigatório"),
  body: yup.string().required("O campo body é obrigatório"),
})

interface Row {
  id: number;
  name: string;
}

export default function ProductsComponent() {
  renderCount++
  const { getListProducts } = useListProducts()

  const { id } = useParams();

  const products = getListProducts.data?.filter((item: any) => item.id == id)

  console.log(products)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      title: "",
      body: "",
    },
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = () => {
    const values = getValues()
    // return postPost.mutate({
    //   id: values.id,
    //   title: values.title,
    //   body: values.body,
    // })
  }

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'lmCode', name: 'lmCode', editor: textEditor, resizable: true, width: 200 },
    { key: 'lmDescription', name: 'lmDescription', editor: textEditor, resizable: true, width: 200 },
    { key: 'saleAmbition', name: 'saleAmbition', editor: textEditor, resizable: true, width: 200 },
    { key: 'salePrice', name: 'salePrice', editor: textEditor, resizable: true, width: 200 },
    { key: 'arcticles', name: 'arcticles', editor: textEditor, resizable: true, width: 200 },
    { key: 'linelist', name: 'linelist', editor: textEditor, resizable: true, width: 200 }
  ];

  const rowKeyGetter = (row: Row) => {
    return row.id
  }

  if (getListProducts.isLoading) {
    return <Loader />
  }

  return (
    <>
      <h1 className="text-fuchsia-50 flex align-center justify-center mt-3">
        Render Count: {renderCount}
      </h1>
      {products?.map((item: any) => {
        return (
          <>
            <h1 className="mt-4 text-center mb-5">{item.name}</h1>
            <div key={item.id} className="flex flex-row justify-center align-middle h-max">
              <DataGrid className="w-max" enableVirtualization columns={columns} onRowsChange={() => onSubmit()} rows={
                item.products.map((product: any) => {
                  return {
                    id: product.id,
                    lmCode: product.lmCode,
                    lmDescription: product.lmDesc,
                    saleAmbition: product.saleAmbition,
                    salePrice: product.salePrice,
                  }
                })
              } rowKeyGetter={rowKeyGetter} />
            </div>
          </>
        )
      })}
      {/* <DataGrid onRowClick={() => console.log(rows)} className="w-max" enableVirtualization columns={columns} onRowsChange={() => onSubmit()} rows={rows} rowKeyGetter={rowKeyGetter} /> */}
      {/* <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col align-middle justify-center h-min bg-gray-700"
        >
          <input
            {...register("id")}
            placeholder="Id"
            className="text-center mt-3 text-slate-900"
          />
          <input
            {...register("title")}
            placeholder="Title"
            className="text-center mt-3 text-slate-900"
          />
          <input
            {...register("body")}
            placeholder="Body"
            className="text-center my-3 text-slate-900"
          />
          <button className="bg-blue-200 w-full h-10 " type="submit">
            Submit
          </button>
        </form> */}
      {/* </div> */}
    </>
  )
}
