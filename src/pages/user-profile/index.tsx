import { useParams } from "react-router-dom"
import { GoBack } from "../../components/go-back"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { BASE_URL } from "../../constants/constants"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import { useEffect, useState } from "react"
import { Button } from "antd"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { CountInfo } from "../../components/count-info"
import EditProfile from "../../components/edit-profile"
import s from './index.module.scss'

export const UserProfile = () => {
  const { id: idParams } = useParams<{ id: string }>()
  const currentUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(idParams ?? "")
  const [follow] = useFollowUserMutation()
  const [unfollow] = useUnfollowUserMutation()
  const [getUserById] = useLazyGetUserByIdQuery()
  const [getCurrent] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()

  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    dispatch(resetUser())
  }, [])

  if (!data) return null

  const {
    _id: id,
    avatarUrl,
    isFollowing,
    name,
    location,
    email,
    bio,
    dateOfBirth,
  } = data

  const handleFollow = async () => {
    try {
      isFollowing
        ? await unfollow(id).unwrap()
        : await follow({ following: id }).unwrap()

      await getUserById(id).unwrap()
      await getCurrent().unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await getUserById(id).unwrap()
        await getCurrent().unwrap()
        setIsEditOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <GoBack />
      <div className={s.userContainer}>
        <div className={s.avatarCard}>
          <img
            src={BASE_URL + avatarUrl}
            alt={name}
          />
          <p>{name}</p>
          {currentUser?._id !== id ? (
            <Button
              onClick={handleFollow}
              icon={
                isFollowing ? (
                  <MdOutlinePersonAddDisabled />
                ) : (
                  <MdOutlinePersonAddAlt1 />
                )
              }
              type={isFollowing ? "default" : "primary"}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          ) : (
            <Button icon={<CiEdit />} onClick={() => setIsEditOpen(true)}>
              Edit
            </Button>
          )}
        </div>
        <div className={s.infoCard}>
          <div>
            <ProfileInfo title="Email" info={email} />
            <ProfileInfo title="Location" info={location} />
            <ProfileInfo
              title="DateOfBirth"
              info={formatToClientDate(dateOfBirth)}
            />
            <ProfileInfo title="Bio" info={bio} />
          </div>
          <div className={s.followCard}>
            <CountInfo title="Followers" count={data.followers.length} />
            <CountInfo title="Following" count={data.following.length} />
          </div>
        </div>
      </div>
      <EditProfile
        isOpen={isEditOpen}
        onClose={handleClose}
        user={data}
      />
    </>
  )
}
