import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { CreatePost } from "../../components/create-post"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <div>
      <CreatePost />
      {data 
        ? data.map(
            ({
              author,
              content,
              createdAt,
              likedByUser,
              _id,
              likes,
              comments,
            }) => (
              <Card
                key={_id}
                authorId={author._id}
                name={author.name}
                avatarUrl={author.avatarUrl}
                content={content} 
                createdAt={createdAt}
                likedByUser={likedByUser}
                cardFor="post"
                likesCount={likes.length}
                commentsCount={comments.length}
                id={_id}
              />
            ),
          )
        : null}
    </div>
  )
}
