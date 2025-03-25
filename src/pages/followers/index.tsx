import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { User } from "../../components/user"
import s from "./index.module.scss"

export const Followers = () => {
  const current = useAppSelector(selectCurrent)

  if (!current) return null

  if (current.followers.length > 0) {
    return (
      <div>
        {current.followers.map(follower => (
          <div className={s.card}>
            <Link key={follower._id} to={`/users/${follower._id}`}>
              <User
                name={follower.name}
                avatarUrl={follower.avatarUrl}
                email={follower.email}
              />
            </Link>
          </div>
        ))}
      </div>
    )
  } else {
    return <p>You have no followers</p>
  }
}
