import { useFormContext } from "react-hook-form"

const Form = ({ ...rest }) => {
  const { handleSubmit } = useFormContext()

  return (
    <form
      {...rest}
      onSubmit={handleSubmit(rest.onSubmit)}
      className="*:mt-12 first:*:mt-0"
    />
  )
}

export default Form
