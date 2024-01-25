import { useForm } from "../../hooks"

const Form = ({ ...rest }) => {
  const { handleSubmit } = useForm()

  return (
    <form
      {...rest}
      noValidate
      onSubmit={e => handleSubmit(e, rest.onSubmit)}
      className="*:mt-4 first:*:mt-0"
    />
  )
}

export default Form
