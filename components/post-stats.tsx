import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Post } from "@/app/page"
import { CheckCircle, XCircle, FileText, Clock } from "lucide-react"

interface PostStatsProps {
  posts: Post[]
}

export function PostStats({ posts }: PostStatsProps) {
  const totalPosts = posts.length
  const authorizedPosts = posts.filter((post) => post.isAuthorized).length
  const unauthorizedPosts = posts.filter((post) => !post.isAuthorized).length
  const recentPosts = posts.filter((post) => {
    const postDate = new Date(post.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return postDate >= weekAgo
  }).length

  const stats = [
    {
      title: "Total de Posts",
      value: totalPosts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Autorizadas",
      value: authorizedPosts,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pendientes",
      value: unauthorizedPosts,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Esta Semana",
      value: recentPosts,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
