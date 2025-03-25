import { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import { IoMoonOutline } from "react-icons/io5"
import { MdOutlineWbSunny } from "react-icons/md"
import { Button } from "antd"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { MdOutlineLogout } from "react-icons/md"
import s from './index.module.scss'

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <header className={`${s.header} ${s[theme]}`}>
      <Link to='/'><h3>Social Network</h3></Link>
      <div className={s.headerRight}>
        <Button type="primary" onClick={toggleTheme}>
          {theme === "light" ? <IoMoonOutline /> : <MdOutlineWbSunny />}
        </Button>
        {isAuthenticated && (
          <Button type="primary" onClick={handleLogout}>
            <MdOutlineLogout />
            <span>Log out</span>
          </Button>
        )}
      </div>
    </header>
  )
}
