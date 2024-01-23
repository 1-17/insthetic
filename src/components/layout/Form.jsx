import { useForm } from "../../hooks"

const Form = ({ ...rest }) => {
  const { handleSubmit } = useForm()

  return (
    <form {...rest} noValidate onSubmit={e => handleSubmit(e, rest.onSubmit)} className="grid gap-4" />
  )
}

export default Form
