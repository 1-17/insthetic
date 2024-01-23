const Fieldset = ({ legend, children }) => {
  return (
    <fieldset className="*:mt-4 first:*:mt-0">
      <legend className="text-lg sm:text-xl font-semibold mb-4">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}

export default Fieldset
