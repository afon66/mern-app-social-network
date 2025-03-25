import { Input as AntdInput } from "antd"
import type { FC } from "react"
import { useController, type Control } from "react-hook-form"

type Props = {
  name: string
  "aria-label": string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
}

export const Input: FC<Props> = ({
  name,
  "aria-label": ariaLabel,
  placeholder,
  type,
  control,
  required = "",
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })

  return (
    <>
      <AntdInput
        id={name}
        aria-label={ariaLabel}
        type={type}
        placeholder={placeholder}
        value={field.value}
        name={field.name}
        // onInvalid={invalid}
        onChange={field.onChange}
        onBlur={field.onBlur}
        aria-errormessage={`${errors[name]?.message ?? ""}`}
      />
      {invalid && (errors[name]?.message || required)}
    </>
  )
}
