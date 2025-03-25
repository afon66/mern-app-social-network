import type React from "react"
import { type IconType } from "react-icons"
import s from "./index.module.scss"

type Props = {
  count: number
  Icon: IconType
}

export const MetaInfo: React.FC<Props> = ({ count, Icon }) => {
  return (
    <div className={s.metaInfo}>
      {count > 0 && <p className={s.metaCount}>{count}</p>}
      <div className={s.metaIcon}>
        <Icon />
      </div>
    </div>
  )
}
