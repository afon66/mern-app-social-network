import { Controller, useForm } from "react-hook-form"
import { Button } from "antd"
import { FaPencil } from "react-icons/fa6" 
import {
  useCreateCommentMutation,
} from "../../app/services/commentsApi"
import { useParams } from "react-router-dom"
import { useLazyGetPostByIdQuery } from "../../app/services/postsApi"
import s from './index.module.scss' 

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({ postId: id, content: data.comment }).unwrap()
        setValue("comment", "")
        await getPostById(id).unwrap()
      }
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit} className={s.commentForm}>
        <Controller
          name="comment"
          control={control}
          rules={{ required: "This field can't be empty" }}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Leave your comment here"
              id="comment"
            ></textarea>
          )}
        />
        {error && <div>{error}</div>}
        <div>
          <Button type="primary" htmlType="submit">
            <span>
              <FaPencil />
            </span>
            Add comment
          </Button>
        </div>
      </form>
    </div>
  )
}
