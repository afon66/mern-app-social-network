import { useContext, useState } from "react"
import { items } from "../../constants/MenuItem"
import { Menu } from "antd"
import { ThemeContext } from "../theme-provider"
import s from './index.module.scss'

export const Navbar = () => {
  const {theme} = useContext(ThemeContext)
 
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed) 
  }
  return (
    <div className={s.menuContainer}>
      <Menu
        defaultOpenKeys={["sub1"]}
        theme={theme}
        items={items}
        className={s.menu}
      />
    </div>
  )
}
