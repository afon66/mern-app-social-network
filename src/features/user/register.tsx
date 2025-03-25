import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../../app/services/userApi"
import { Input } from "../../components/input"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type Register = {
  email: string
  password: string
  name: string
}

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const submit = async (data: Register) => {
    try {
      await register(data).unwrap()
      toast.success('You signed up successfully')
      navigate("/auth", { state: { tab: "login" } })
    } catch (error) {
      const e = error as { data: { error: string } }
      console.log(e.data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        control={control}
        name="email"
        type="email"
        aria-label="email"
        placeholder="Enter email"
        required="Обязательно к заполнению"
      />
      <Input
        control={control}
        name="password"
        type="password"
        aria-label="password"
        placeholder="Enter password"
        required="Обязательно к заполнению"
      />
      <Input
        control={control}
        name="name"
        type="text"
        aria-label="name"
        placeholder="Enter name"
        required="Обязательно к заполнению"
      />
      <p>
        Уже есть аккаунт?{" "}
        <Link to="/auth" state={{ tab: "login" }}>
          Войдите
        </Link>
      </p>
      <button type="submit">Register</button> {/* isLoading нужно добавить */}
    </form>
  )
}
