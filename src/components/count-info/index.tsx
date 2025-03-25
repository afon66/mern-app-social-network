import s from './index.module.scss'

type Props = {
  count: number
  title: string
}

export const CountInfo: React.FC<Props> = ({count, title}) => {
  return <div className={s.countInfo}>
    <p>{count}</p> 
    <div>{title}</div>
  </div>
}
