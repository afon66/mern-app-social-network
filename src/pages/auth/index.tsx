import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { Card } from "antd"
import { Login } from "../../features/user/login"
import { Register } from "../../features/user/register"
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const tabList = [
  {
    key: "login",
    tab: "Login",
  },
  {
    key: "signUp",
    tab: "Sign up",
  },
]

const contentList: Record<string, ReactNode> = {
  login: <Login />,
  signUp: <Register />,
}

export const Auth: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const initialKey = location.state?.tab || "login"

  const [activeTabKey1, setActiveTabKey1] = useState<string>(initialKey)

  useEffect(() => {
    if (location.state?.tab) setActiveTabKey1(location.state?.tab)
  }, [location.state?.tab])

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key)
    navigate("/auth", { state: { tab: key } })
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          style={{
            width: "340px",
            height: "450px",
            border: "1px solid",
            backgroundColor: "#111",
          }}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
        >
          {contentList[activeTabKey1]}
        </Card>
      </div>
    </>
  )
}
