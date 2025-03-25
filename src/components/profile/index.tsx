import { Link } from "react-router-dom" 
import { useAppSelector } from "../../app/hooks"
import { BASE_URL } from "../../constants/constants"
import { selectCurrent } from "../../features/user/userSlice"
import s from "./index.module.scss"

export const Profile = () => {
  const current = useAppSelector(selectCurrent)

  if (!current) return null

  const { name, email, avatarUrl, _id: id } = current
  return (
    <div className={s.profileCard}>
      <Link to={`/users/${id}`}>
        <img className={s.avatar} src={`${BASE_URL}${avatarUrl}`} alt="" />
        <p className={s.name}>{name}</p>
        <p className={s.email}>{email}</p>
      </Link>
    </div> 
  )
}
