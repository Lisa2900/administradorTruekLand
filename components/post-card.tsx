"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/app/page"
import { Check, X, Trash2, Eye, Calendar, MapPin, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import moment from "moment"

interface PostCardProps {
  post: Post
  onAuthorize: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
}

export function PostCard({ post, onAuthorize, onReject, onDelete }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        {post.images && post.images.length > 0 ? (
          <div className="relative aspect-video">
            <Image src={post.images[0] || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute top-2 right-2">
              <Badge variant={post.isAuthorized ? "default" : "destructive"}>
                {post.isAuthorized ? "Autorizada" : "Pendiente"}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.desc}</p>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{moment(post.createdAt).format("D MMM YYYY")}</span>
          </div>

          {post.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{post.location}</span>
            </div>
          )}

          {post.userName && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className="truncate">{post.userName}</span>
            </div>
          )}

          {post.category && (
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Link href={`/post/${post.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
        </Link>

        {!post.isAuthorized && (
          <Button onClick={() => onAuthorize(post.id)} size="sm" className="flex-1">
            <Check className="h-4 w-4 mr-1" />
            Autorizar
          </Button>
        )}

        <Button onClick={() => onReject(post.id)} variant="outline" size="sm" className="flex-1">
          <X className="h-4 w-4 mr-1" />
          Rechazar
        </Button>

        <Button onClick={() => onDelete(post.id)} variant="destructive" size="sm" className="w-full">
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}
