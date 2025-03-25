// компонент который будет запрашивать нашего текущего пользователь при старте приложения

import { useCurrentQuery } from "../../app/services/userApi"
import loading from "../../assets/gifs/loading.gif"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <img src={loading} alt="loading" />
  }

  return children
}