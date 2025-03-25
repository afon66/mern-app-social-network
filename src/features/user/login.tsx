import { useForm } from "react-hook-form"
import { Input } from "../../components/input"
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../app/services/userApi"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppSelector } from "../../app/hooks"

type Login = {
  email: string
  password: string
}

export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [getCurrent] = useLazyCurrentQuery()

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await getCurrent().unwrap()
      toast.success("You logged in")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        type="email"
        aria-label="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        type="password"
        aria-label="password"
        required="Обязательное поле"
      />
      <p>
        Нет аккаунта?{" "}
        <Link to="/auth" state={{ tab: "signUp" }}>
          Зарегистрируйтесь
        </Link>
      </p>
      <button type="submit">Войти</button> {/* isLoading нужно добавить */}
    </form>
  )
}
