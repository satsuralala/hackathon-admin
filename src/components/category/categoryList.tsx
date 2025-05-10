"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { MoreHorizontal, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

export interface Category {
  _id?: string;
  title: string;
  description: string;
  infoCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        const sortedCategories = data.sort((a: Category, b: Category) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);

          return dateB.getTime() - dateA.getTime();
        });

        setCategories(sortedCategories);
      })
      .catch((err) => console.error("Failed to load categories", err));
  };

  const handleCreateOrUpdate = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/category/${editId}` : "/api/category";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      const newCategory = await res.json();
      setCategories((prev) => [newCategory, ...prev]); // Add the new category at the top
      setTitle("");
      setDescription("");
      setDialogOpen(false);
      setEditId(null);
      toast({
        title: editId ? "Амжилттай шинэчлэгдлээ" : "Амжилттай нэмэгдлээ",
        description: editId ? "Ангилал шинэчлэгдлээ" : "Шинэ ангилал нэмэгдлээ",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Үйлдэл амжилтгүй боллоо",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setTitle(category.title);
    setDescription(category.description);
    setEditId(category._id || null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Та энэ ангиллыг устгахдаа итгэлтэй байна уу?");
    if (!confirmed) return;

    const res = await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      toast({
        title: "Устгалаа",
        description: "Ангилал амжилттай устлаа",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Алдаа",
        description: "Устгал амжилтгүй боллоо",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>Ангилалууд</CardTitle>
              <CardDescription>
                Мэдээллийн ангилалуудын жагсаалт
              </CardDescription>
            </div>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="ml-auto gap-1 bg-rose-500 hover:bg-rose-600"
                onClick={() => {
                  setEditId(null);
                  setTitle("");
                  setDescription("");
                }}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Шинэ ангилал</span>
              </Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Нэр</TableHead>
                    <TableHead>Тайлбар</TableHead>
                    <TableHead>Мэдээллийн тоо</TableHead>
                    <TableHead>Үүсгэсэн</TableHead>
                    <TableHead className="text-right">Үйлдэл</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground py-6"
                      >
                        Ангилал олдсонгүй.
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category._id}>
                        <TableCell className="font-medium">
                          {category.title}
                        </TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>{category.infoCount}</TableCell>
                        <TableCell>
                          {category.createdAt
                            ? new Date(category.createdAt).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEdit(category)}
                              >
                                Засах
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(category._id!)}
                              >
                                Устгах
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editId ? "Ангилал засах" : "Ангилал нэмэх"}
              </DialogTitle>
              <DialogDescription>
                {editId
                  ? "Ангиллын мэдээллийг шинэчлэх"
                  : "Шинэ ангиллын нэр болон тайлбар"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Нэр</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Тайлбар</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateOrUpdate}>Хадгалах</Button>
            </DialogFooter>
          </DialogContent>
        </Card>
      </div>
    </Dialog>
  );
}
