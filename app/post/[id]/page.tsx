"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { doc, getDoc, getFirestore, updateDoc, deleteDoc } from "firebase/firestore"
import { app } from "@/lib/firebase-config"
import type { Post } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Check, X, Trash2, Calendar, MapPin, Phone, Mail, User, Package } from "lucide-react"
import Image from "next/image"
import moment from "moment"

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const db = getFirestore(app)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "UserPost", params.id as string)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data(),
          } as Post)
        } else {
          toast({
            title: "Error",
            description: "Publicación no encontrada",
            variant: "destructive",
          })
          router.push("/")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar la publicación",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id, db, toast, router])

  const authorizePost = async () => {
    if (!post) return
    try {
      await updateDoc(doc(db, "UserPost", post.id), { isAuthorized: true })
      setPost({ ...post, isAuthorized: true })
      toast({
        title: "Éxito",
        description: "Publicación autorizada correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al autorizar la publicación",
        variant: "destructive",
      })
    }
  }

  const rejectPost = async () => {
    if (!post) return
    try {
      await updateDoc(doc(db, "UserPost", post.id), { isAuthorized: false })
      setPost({ ...post, isAuthorized: false })
      toast({
        title: "Éxito",
        description: "Publicación rechazada correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al rechazar la publicación",
        variant: "destructive",
      })
    }
  }

  const deletePost = async () => {
    if (!post) return
    try {
      await deleteDoc(doc(db, "UserPost", post.id))
      toast({
        title: "Éxito",
        description: "Publicación eliminada correctamente",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la publicación",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Cargando...</span>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Publicación no encontrada</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <div className="flex items-center gap-2">
          <Badge variant={post.isAuthorized ? "default" : "destructive"}>
            {post.isAuthorized ? "Autorizada" : "No Autorizada"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {post.images && post.images.length > 0 && (
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={post.images[0] || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                {post.images.length > 1 && (
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-2">
                      {post.images.slice(1, 5).map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${post.title} ${index + 2}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {post.title}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {moment(post.createdAt).format("D MMM YYYY")}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{post.desc}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!post.isAuthorized && (
                <Button onClick={authorizePost} className="w-full" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Autorizar
                </Button>
              )}
              <Button onClick={rejectPost} variant="outline" className="w-full" size="sm">
                <X className="h-4 w-4 mr-2" />
                Rechazar
              </Button>
              <Button onClick={deletePost} variant="destructive" className="w-full" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {post.userImage && (
                <div className="flex justify-center">
                  <div className="relative w-16 h-16">
                    <Image
                      src={post.userImage || "/placeholder.svg"}
                      alt="Usuario"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm">
                {post.userName && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{post.userName}</span>
                  </div>
                )}

                {post.userEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="break-all">{post.userEmail}</span>
                  </div>
                )}

                {post.telefono && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{post.telefono}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del Producto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {post.category && (
                <div>
                  <span className="font-medium">Categoría:</span>
                  <Badge variant="secondary" className="ml-2">
                    {post.category}
                  </Badge>
                </div>
              )}

              {post.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{post.location}</span>
                </div>
              )}

              {post.status && (
                <div>
                  <span className="font-medium">Estado:</span>
                  <span className="ml-2">{post.status}</span>
                </div>
              )}

              {post.cambio && (
                <div>
                  <span className="font-medium">Cambio:</span>
                  <span className="ml-2">{post.cambio}</span>
                </div>
              )}

              {post.productId && (
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="font-mono text-xs">{post.productId}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
