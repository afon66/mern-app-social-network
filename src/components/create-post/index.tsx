import { useCreatePostMutation, useLazyGetAllPostsQuery } from "../../app/services/postsApi"
import { Controller, useForm } from "react-hook-form"
import { Button } from "antd"
import { FaPencil } from "react-icons/fa6"
import s from './index.module.scss'

export const CreatePost = () => { 
  const [createPost] = useCreatePostMutation()
  const [getAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue("post", "")
      await getAllPosts().unwrap()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className={s.postForm}>
      <form onSubmit={onSubmit}>
        <Controller
          name="post"
          control={control}
          rules={{ required: "This field can't be empty" }}
          render={({ field }) => (
            <textarea
              {...field}
              className={s.postField}
              placeholder="Leave your post here"
              id="post"
            ></textarea>
          )}
        />
        {error && <div className={s.postError}>{error}</div>}
        <div>
          <Button type="primary" htmlType="submit">
            <span>
              <FaPencil />
            </span>
            Add post
          </Button>
        </div>
      </form>
    </div>
  )
}
