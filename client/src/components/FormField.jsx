export default function FormField({
  label,
  as = "input",
  className = "",
  children,
  ...props
}) {
  const Component = as;

  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}</span>
      <Component className="field" {...props}>
        {children}
      </Component>
    </label>
  );
}
