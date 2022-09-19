import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import 'react-data-grid/lib/styles.css';
import DataGrid, { textEditor } from 'react-data-grid';

import { usePosts } from "../hooks/usePosts"
import { Loader } from "./Loader"

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

export default function RegisterForm() {
  renderCount++

  const { postPost, getPosts } = usePosts()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      id: ""
    },
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = () => {
    const values = getValues()
    return postPost.mutate({
      title: values.title,
      body: values.body,
      id: values.id,
    })
  }

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title', editor: textEditor, resizable: true, width: 200 },
    { key: 'body', name: 'Body', editor: textEditor, resizable: true, width: 200 }
  ];

  const rows = getPosts.data?.map((data: any, index: number) => {
    return (
      { id: index, title: data.title, body: data.body }
    )
  })

  const rowKeyGetter = (row: Row) => {
    return row.id
  }

  if (getPosts.isLoading) {
    return <Loader />
  }

  return (
    <>
      <h1 className="text-fuchsia-50 flex align-center justify-center mt-3">
        Render Count: {renderCount}
      </h1>
      <div className="flex flex-row justify-center align-middle h-max">
        <DataGrid className="w-max" enableVirtualization columns={columns} rows={rows} rowKeyGetter={rowKeyGetter} />
        <form
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
        </form>
      </div>
    </>
  )
}
