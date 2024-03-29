const Fieldset = ({ legend, children }) => {
  return (
    <fieldset className="*:mt-4 first:*:mt-0">
      {
        legend && (
          <legend className="text-lg sm:text-xl font-semibold">
            {legend}
          </legend>
        )
      }
      {children}
    </fieldset>
  )
}

export default Fieldset
