import { IoArrowBackCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

export const GoBack = () => {
  return (
    <div>
      <Link to="/">
        <span>
          <IoArrowBackCircleOutline />
        </span>
        Назад
      </Link>
    </div>
  )
}
