import { type FC } from "react"
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../app/services/likesApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../app/services/postsApi"
import { useDeleteCommentMutation } from "../../app/services/commentsApi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { selectCurrent } from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { RiDeleteBin6Line } from "react-icons/ri"
import { ImSpinner } from "react-icons/im"
import { FcLike } from "react-icons/fc"
import { User } from "../user"
import { MetaInfo } from "../meta-info"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegComment } from "react-icons/fa6"
import s from './index.module.scss'

type Props = {
  avatarUrl: string | undefined
  name: string | undefined
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const Card: FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor,
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [getAllPosts] = useLazyGetAllPostsQuery()
  const [getPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrent)
  const { id: idParams } = useParams()

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await getAllPosts().unwrap()
        break
      case "current-post":
        await getAllPosts().unwrap()
        break
      case "comment":
        await getPostById(idParams ?? "").unwrap()
        break
      default:
        throw new Error('Wrong argument "cardFor"')
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          await refetchPosts()
          break
        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        default:
          throw new Error('Wrong argument "cardFor"')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLikes = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()

      if (cardFor === "current-post") {
        await getPostById(id).unwrap()
      }

      if (cardFor === "post") {
        await getAllPosts().unwrap()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <Link to={`users/${authorId}`}>
          <User name={name} avatarUrl={avatarUrl} createdAt={createdAt} />
        </Link>
        {authorId === currentUser?._id && (
          <button className={s.deleteIcon} onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <ImSpinner />
            ) : (
              <RiDeleteBin6Line />
            )}
          </button>
        )}
      </div>
      <div className={s.cardBody}>{content}</div>
      {cardFor !== "comment" && (
        <div className={s.cardFooter}>
          <div onClick={handleLikes}>
            <MetaInfo
              count={likesCount}
              Icon={likedByUser ? FcLike : MdOutlineFavoriteBorder}
            />
          </div>
          <div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
