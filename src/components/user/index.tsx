import { BASE_URL } from "../../constants/constants"
import { formatToClientDate } from "../../utils/format-to-client-date"
import s from "./index.module.scss"

type Props = {
  name: string | undefined
  avatarUrl: string | undefined
  createdAt?: Date
  email?: string
}

export const User: React.FC<Props> = ({
  name = "",
  avatarUrl = "",
  createdAt,
  email,
}) => {
  return (
    <div className={s.user}>
      <img
        className={s.userAvatar}
        src={`${BASE_URL}${avatarUrl}`}
        alt=""
      />
      <div className={s.userInfo}>
        <p className={s.userName}>{name}</p>
        {createdAt && (
          <p className={s.userDate}>
            {createdAt && formatToClientDate(createdAt)}
          </p>
        )}
        {email && <p>{email}</p>}
      </div>
    </div>
  )
}
