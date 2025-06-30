"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, updateDoc, deleteDoc, doc, getFirestore } from "firebase/firestore"
import { app } from "@/lib/firebase-config"
import { PostCard } from "@/components/post-card"
import { PostFilters } from "@/components/post-filters"
import { PostStats } from "@/components/post-stats"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export interface Post {
  id: string
  title: string
  desc: string
  createdAt: string
  isAuthorized: boolean
  images?: string[]
  category?: string
  location?: string
  status?: string
  telefono?: string
  userEmail?: string
  userName?: string
  userImage?: string
  productId?: string
  cambio?: string
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const { toast } = useToast()

  const db = getFirestore(app)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "UserPost"),
      (querySnapshot) => {
        const postsData: Post[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        }))
        setPosts(postsData)
        setLoading(false)
      },
      (error) => {
        console.error("Error loading posts:", error)
        toast({
          title: "Error",
          description: "Error al cargar las publicaciones",
          variant: "destructive",
        })
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [db, toast])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.userName?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      if (selectedStatus === "authorized") {
        filtered = filtered.filter((post) => post.isAuthorized)
      } else {
        filtered = filtered.filter((post) => !post.isAuthorized)
      }
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedCategory, selectedStatus])

  const authorizePost = async (postId: string) => {
    try {
      await updateDoc(doc(db, "UserPost", postId), { isAuthorized: true })
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

  const rejectPost = async (postId: string) => {
    try {
      await updateDoc(doc(db, "UserPost", postId), { isAuthorized: false })
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

  const deletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, "UserPost", postId))
      toast({
        title: "Éxito",
        description: "Publicación eliminada correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la publicación",
        variant: "destructive",
      })
    }
  }

  const authorizedPosts = filteredPosts.filter((post) => post.isAuthorized)
  const unauthorizedPosts = filteredPosts.filter((post) => !post.isAuthorized)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando publicaciones...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PostStats posts={posts} />

      <PostFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        categories={Array.from(new Set(posts.map((p) => p.category).filter((category): category is string => Boolean(category))))}
      />

      <Tabs defaultValue="unauthorized" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unauthorized" className="relative">
            No Autorizadas
            {unauthorizedPosts.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unauthorizedPosts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="authorized" className="relative">
            Autorizadas
            {authorizedPosts.length > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                {authorizedPosts.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unauthorized" className="mt-6">
          {unauthorizedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay publicaciones no autorizadas</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unauthorizedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onAuthorize={authorizePost}
                  onReject={rejectPost}
                  onDelete={deletePost}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="authorized" className="mt-6">
          {authorizedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay publicaciones autorizadas</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorizedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onAuthorize={authorizePost}
                  onReject={rejectPost}
                  onDelete={deletePost}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
