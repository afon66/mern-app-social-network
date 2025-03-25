import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { GoBack } from "../../components/go-back"
import { CreateComment } from "../../components/create-comment"

export const CurrentPost = () => {
  const { id } = useParams()

  const { data } = useGetPostByIdQuery(id ?? "")

  if (!data) {
    return <h2>Post doesn't find</h2>
  }

  const { _id, author, content, createdAt, likedByUser, likes, comments } = data

  return (
    <div>
      <GoBack />
      <Card
        key={_id}
        authorId={author._id ?? ""}
        name={author.name ?? ""}
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        createdAt={createdAt}
        likedByUser={likedByUser}
        cardFor="current-post"   
        likesCount={likes.length}
        commentsCount={comments.length}
        id={_id}
      />
      <CreateComment />
      {comments &&
        comments.map(comment => (
          <Card
            key={comment._id}
            authorId={comment.user._id ?? ""}
            name={comment.user.name ?? ""}
            avatarUrl={comment.user.avatarUrl ?? ""}
            content={comment.content}
            cardFor="comment"
            commentId={comment._id}
          />
        ))}
    </div>
  )
}
