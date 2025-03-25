export type User = {
  _id: string
  email: string
  password: string
  name?: string
  avatarUrl?: string
  dateOfBirth?: Date
  createdAt: Date
  updatedAt: Date
  bio?: string
  location?: string
  posts: Post[]
  likes: Like[]
  comments: Comment[]
  following: User[]
  followers: User[]
  isFollowing?: boolean
}

export type Follows = {
  _id: string
  follower: User
  following: User
}

export type Post = {
  _id: string
  content: string
  author: User
  likes: Like[]
  comments: Comment[]
  likedByUser: boolean
  createdAt: Date
  updatedAt: Date
}

export type Like = {
  _id: string
  userId: User
  postId: Post
}

export type Comment = {
  _id: string
  content: string
  user: User 
  post: Post
  userId: string
  postId: string
}

