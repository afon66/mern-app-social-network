import type { FC, ReactElement } from "react"
import s from "./index.module.scss"

type Props = {
  children: ReactElement[] | ReactElement
}

export const Container: FC<Props> = ({ children }) => {
  return <div className={s.container}>{children}</div>
}
