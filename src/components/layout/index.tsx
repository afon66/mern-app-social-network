import { Layout } from "antd"
import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../nav-bar"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { ThemeContext } from "../theme-provider"
import {
  selectCurrent,
  selectIsAuthenticated,
} from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { Profile } from "../profile"
import s from "./index.module.scss"

export const AntdLayout = () => {
  const { theme } = useContext(ThemeContext)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const current = useAppSelector(selectCurrent)
  const navigate = useNavigate()
  const location = useLocation()

  const isUserProfilePage = location.pathname.startsWith("/users")

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [isAuthenticated, navigate])

  return (
    <Layout className={`${s.layout} ${theme}`}>
      <Header />
      <Container>
        <div className={`${s.navbar}`}>
          <Navbar />
        </div>
        <div className={`${s.outlet}`}>
          <Outlet />
        </div>
        <div className={`${s.profile}`}>
          {current && !isUserProfilePage && <Profile />}
        </div>
      </Container>
    </Layout>
  )
}
