import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa6"
import type { MenuProps } from "antd"
import { Link } from "react-router-dom"

type MenuItem = Required<MenuProps>["items"][number]

export const items: MenuItem[] = [
  {
    key: "sub1",
    label: <Link to="/">Posts</Link>,
    icon: <BsPostcard />,
  },
  {
    key: "sub2",
    label: <Link to="/following">Following</Link>,
    icon: <FiUsers />,
  },
  {
    key: "sub3",
    label: <Link to='/followers'>Followers</Link>,
    icon: <FaUsers />,
  },
]
