import { type FC } from "react"
import s from './index.module.scss'

type Props = {
  title: string
  info?: string
}

export const ProfileInfo: FC<Props> = ({ title, info }) => {
  if (!info) return null

  return (
    <p className={s.profileInfo}>
      <span>{title} </span>
      {info}
    </p>
  )
}
