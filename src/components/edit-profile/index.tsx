import { Button, Input, Modal } from "antd"
import { Controller, useForm } from "react-hook-form"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { type User } from "../../app/types"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import s from "./index.module.scss"
import { ThemeContext } from "../theme-provider"

type Props = {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

const EditProfile: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const [updateUser] = useUpdateUserMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()
  const { theme } = useContext(ThemeContext)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      avatar: user?.avatarUrl || "",
      dateOfBirth: user?.dateOfBirth || "",
      bio: user?.bio || "",
      location: user?.location || "",
    },
  })

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        const formData = new FormData()
        data.name && formData.append("name", data.name)
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email)
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append("bio", data.bio)
        data.location && formData.append("location", data.location)
        selectedFile && formData.append("avatar", selectedFile)

        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <>
      <Modal
        className={`${s.modal} ${theme}`}
        title={<p>Edit profile</p>}
        open={isOpen}
        onCancel={onClose}
        footer={
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Update
          </Button>
        }
      >
        <form>
          <div className={s.formContainer}>
            <div>
              <p>Email:</p>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input {...field} type="email" placeholder="Enter email" />
                )}
              />
            </div>
            <div>
              <p>Name:</p>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input {...field} type="text" placeholder="Enter name" />
                )}
              />
            </div>
            <div>
              <Controller
                name="avatar"
                control={control}
                render={({ field: { onChange, ref } }) => (
                  <Input type="file" onChange={handleFileChange} />
                )}
              />
            </div>
            <div>
              <p>Date:</p>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                  />
                )}
              />
            </div>
            <div>
              <p>Bio:</p>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <textarea {...field} placeholder="Describe yourself" />
                )}
              />
            </div>
            <div>
              <p>Location:</p>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input type="text" {...field} placeholder="Location" />
                )}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default EditProfile
