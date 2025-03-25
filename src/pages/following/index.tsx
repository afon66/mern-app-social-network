import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { User } from "../../components/user"
import s from "./index.module.scss"

export const Following = () => {
  const current = useAppSelector(selectCurrent)

  if (!current) return null

  if (current.following.length > 0) {
    return (
      <div>
        {current.following.map(user => (
          <div className={s.card}>
            <Link key={user._id} to={`/users/${user._id}`}>
              <User
                name={user.name}
                avatarUrl={user.avatarUrl}
                email={user.email}
              />
            </Link>
          </div>
        ))}
      </div>
    )
  } else {
    return <p>You have no following</p>
  }
}
