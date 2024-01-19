const Fieldset = ({ legend, children }) => {
  return (
    <fieldset className="grid gap-4">
      <legend className="text-lg sm:text-xl font-semibold mb-4">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}

export default Fieldset
