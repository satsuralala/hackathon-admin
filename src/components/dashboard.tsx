"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  ClipboardList,
  Clock,
  FileText,
  Filter,
  Home,
  Layers,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  User,
  Users,
  X,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import AdminLogin from "./login";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Хянах самбар",
      id: "dashboard",
    },
    {
      icon: <ClipboardList className="h-5 w-5" />,
      label: "Мэдээллүүд",
      id: "reports",
    },
    { icon: <Users className="h-5 w-5" />, label: "Хэрэглэгчид", id: "users" },
    {
      icon: <Layers className="h-5 w-5" />,
      label: "Ангилалууд",
      id: "categories",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Харилцаа",
      id: "messages",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Тайлангууд",
      id: "analytics",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Тохиргоо",
      id: "settings",
    },
  ];

  const recentReports = [
    {
      id: "REP-7829",
      title: "Нүхтэй зам - Энх тайвны өргөн чөлөө",
      status: "Шийдвэрлэгдсэн",
      statusColor: "bg-green-500",
      date: "2023-05-12",
      user: "Болд Б.",
      avatar: "/placeholder.svg?height=32&width=32&text=ББ",
      district: "Сүхбаатар",
    },
    {
      id: "REP-7830",
      title: "Гэрэлтүүлэг - Баянзүрх гудамж",
      status: "Хянагдаж байгаа",
      statusColor: "bg-amber-500",
      date: "2023-05-13",
      user: "Сараа Д.",
      avatar: "/placeholder.svg?height=32&width=32&text=СД",
      district: "Баянзүрх",
    },
    {
      id: "REP-7831",
      title: "Хог хаягдал - Хан-Уул дүүрэг",
      status: "Хуваарилагдсан",
      statusColor: "bg-blue-500",
      date: "2023-05-14",
      user: "Бат-Эрдэнэ Г.",
      avatar: "/placeholder.svg?height=32&width=32&text=БЭ",
      district: "Хан-Уул",
    },
    {
      id: "REP-7832",
      title: "Явган хүний зам - Чингэлтэй дүүрэг",
      status: "Шинэ",
      statusColor: "bg-rose-500",
      date: "2023-05-15",
      user: "Оюунаа Т.",
      avatar: "/placeholder.svg?height=32&width=32&text=ОТ",
      district: "Чингэлтэй",
    },
    {
      id: "REP-7833",
      title: "Нүхтэй зам - Баянгол дүүрэг",
      status: "Шинэ",
      statusColor: "bg-rose-500",
      date: "2023-05-15",
      user: "Ганбат Д.",
      avatar: "/placeholder.svg?height=32&width=32&text=ГД",
      district: "Баянгол",
    },
  ];

  const recentUsers = [
    {
      id: "USR-4521",
      name: "Болд Батбаяр",
      email: "bold@example.mn",
      role: "Хэрэглэгч",
      status: "Идэвхтэй",
      statusColor: "bg-green-500",
      reports: 12,
      joined: "2023-01-15",
      avatar: "/placeholder.svg?height=40&width=40&text=ББ",
    },
    {
      id: "USR-4522",
      name: "Сараа Дорж",
      email: "saraa@example.mn",
      role: "Хэрэглэгч",
      status: "Идэвхтэй",
      statusColor: "bg-green-500",
      reports: 8,
      joined: "2023-02-20",
      avatar: "/placeholder.svg?height=40&width=40&text=СД",
    },
    {
      id: "USR-4523",
      name: "Бат-Эрдэнэ Ганбат",
      email: "baterdene@example.mn",
      role: "Модератор",
      status: "Идэвхтэй",
      statusColor: "bg-green-500",
      reports: 24,
      joined: "2022-11-05",
      avatar: "/placeholder.svg?height=40&width=40&text=БЭ",
    },
    {
      id: "USR-4524",
      name: "Оюунаа Төмөр",
      email: "oyunaa@example.mn",
      role: "Хэрэглэгч",
      status: "Түр хаагдсан",
      statusColor: "bg-amber-500",
      reports: 3,
      joined: "2023-04-10",
      avatar: "/placeholder.svg?height=40&width=40&text=ОТ",
    },
    {
      id: "USR-4525",
      name: "Ганбат Дорж",
      email: "ganbat@example.mn",
      role: "Хэрэглэгч",
      status: "Идэвхтэй",
      statusColor: "bg-green-500",
      reports: 7,
      joined: "2023-03-22",
      avatar: "/placeholder.svg?height=40&width=40&text=ГД",
    },
  ];

  const districtData = [
    { name: "Сүхбаатар", count: 156, percentage: 85 },
    { name: "Баянзүрх", count: 132, percentage: 72 },
    { name: "Чингэлтэй", count: 98, percentage: 53 },
    { name: "Хан-Уул", count: 87, percentage: 47 },
    { name: "Баянгол", count: 76, percentage: 41 },
  ];

  const categoryData = [
    { name: "Нүхтэй зам", count: 245, percentage: 32 },
    { name: "Гэрэлтүүлэг", count: 187, percentage: 24 },
    { name: "Хог хаягдал", count: 156, percentage: 20 },
    { name: "Явган хүний зам", count: 98, percentage: 13 },
    { name: "Бусад", count: 87, percentage: 11 },
  ];

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 lg:w-20"
        } ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div
            className={`flex items-center gap-2 ${
              !isSidebarOpen && "lg:hidden"
            }`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>
            <span className="text-xl font-bold">UBFix</span>
          </div>
          <div className={`${!isSidebarOpen && "lg:hidden"}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div
            className={`hidden ${
              !isSidebarOpen ? "lg:flex" : ""
            } items-center justify-center`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  activeTab === item.id
                    ? "bg-rose-100 text-rose-900 font-medium"
                    : "text-muted-foreground hover:bg-muted"
                } ${!isSidebarOpen && "lg:justify-center"}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span className={!isSidebarOpen ? "lg:hidden" : ""}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40&text=АБ"
                alt="Админ"
              />
              <AvatarFallback>АБ</AvatarFallback>
            </Avatar>
            <div className={!isSidebarOpen ? "lg:hidden" : ""}>
              <p className="text-sm font-medium">Админ Батбаяр</p>
              <p className="text-xs text-muted-foreground">admin@ubfix.mn</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={!isSidebarOpen ? "lg:hidden" : ""}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Миний бүртгэл</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Профайл</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Тохиргоо</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Гарах</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-semibold">
              {menuItems.find((item) => item.id === activeTab)?.label ||
                "Хянах самбар"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Хайх..."
                  className="w-64 bg-background pl-8 md:w-80"
                />
              </div>
            </form>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-rose-500"></span>
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32&text=АБ"
                      alt="Админ"
                    />
                    <AvatarFallback>АБ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Миний бүртгэл</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Профайл</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Тохиргоо</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Гарах</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="grid gap-6">
              {/* Stats Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Нийт мэдээлэл
                    </CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">773</div>
                    <p className="text-xs text-muted-foreground">
                      +21% өмнөх сараас
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Шийдвэрлэгдсэн
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">549</div>
                    <p className="text-xs text-muted-foreground">
                      71% шийдвэрлэлтийн хувь
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Идэвхтэй хэрэглэгч
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5,234</div>
                    <p className="text-xs text-muted-foreground">
                      +12% өмнөх сараас
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Дундаж хугацаа
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.2 өдөр</div>
                    <p className="text-xs text-muted-foreground">
                      -8% өмнөх сараас
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Tables */}
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {/* Recent Reports */}
                <Card className="xl:col-span-2">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-1">
                      <CardTitle>Сүүлийн мэдээллүүд</CardTitle>
                      <CardDescription>
                        Сүүлийн 7 хоногт бүртгэгдсэн мэдээллүүд
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto gap-1"
                    >
                      <Filter className="h-3.5 w-3.5" />
                      <span>Шүүх</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Гарчиг</TableHead>
                          <TableHead>Төлөв</TableHead>
                          <TableHead>Огноо</TableHead>
                          <TableHead>Хэрэглэгч</TableHead>
                          <TableHead>Дүүрэг</TableHead>
                          <TableHead className="text-right">Үйлдэл</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">
                              {report.id}
                            </TableCell>
                            <TableCell>{report.title}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${report.statusColor}`}
                                ></div>
                                <span>{report.status}</span>
                              </div>
                            </TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={report.avatar || "/placeholder.svg"}
                                    alt={report.user}
                                  />
                                  <AvatarFallback>
                                    {report.user.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{report.user}</span>
                              </div>
                            </TableCell>
                            <TableCell>{report.district}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Цэс</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    Дэлгэрэнгүй
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Засах</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Устгах</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex items-center justify-center mt-4">
                      <Button variant="outline" size="sm">
                        Бүгдийг харах
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* District Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Дүүргээр</CardTitle>
                    <CardDescription>
                      Мэдээллүүдийн дүүргээр харуулсан статистик
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {districtData.map((district) => (
                        <div key={district.name} className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>{district.name}</span>
                            </div>
                            <span className="text-sm">{district.count}</span>
                          </div>
                          <Progress
                            value={district.percentage}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Category Stats and Recent Users */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Category Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ангилалаар</CardTitle>
                    <CardDescription>
                      Мэдээллүүдийн ангилалаар харуулсан статистик
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categoryData.map((category) => (
                        <div key={category.name} className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>{category.name}</span>
                            </div>
                            <span className="text-sm">{category.count}</span>
                          </div>
                          <Progress
                            value={category.percentage}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Users */}
                <Card>
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-1">
                      <CardTitle>Сүүлийн хэрэглэгчид</CardTitle>
                      <CardDescription>
                        Сүүлд бүртгүүлсэн хэрэглэгчид
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.slice(0, 4).map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                              />
                              <AvatarFallback>
                                {user.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-auto">
                            {user.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <Button variant="outline" size="sm">
                        Бүгдийг харах
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-1">
                    <CardTitle>Бүх мэдээллүүд</CardTitle>
                    <CardDescription>
                      Системд бүртгэгдсэн бүх мэдээллүүд
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Шүүх</span>
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1 bg-rose-500 hover:bg-rose-600"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Шинэ</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">ID</TableHead>
                          <TableHead>Гарчиг</TableHead>
                          <TableHead>Төлөв</TableHead>
                          <TableHead>Огноо</TableHead>
                          <TableHead>Хэрэглэгч</TableHead>
                          <TableHead>Дүүрэг</TableHead>
                          <TableHead className="text-right">Үйлдэл</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...recentReports, ...recentReports].map(
                          (report, index) => (
                            <TableRow key={`${report.id}-${index}`}>
                              <TableCell className="font-medium">
                                {report.id}
                              </TableCell>
                              <TableCell>{report.title}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-2 w-2 rounded-full ${report.statusColor}`}
                                  ></div>
                                  <span>{report.status}</span>
                                </div>
                              </TableCell>
                              <TableCell>{report.date}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={report.avatar || "/placeholder.svg"}
                                      alt={report.user}
                                    />
                                    <AvatarFallback>
                                      {report.user.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{report.user}</span>
                                </div>
                              </TableCell>
                              <TableCell>{report.district}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Цэс</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      Дэлгэрэнгүй
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Засах</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Устгах</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Нийт <strong>773</strong> мэдээллээс <strong>1-10</strong>{" "}
                      харуулж байна
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Өмнөх
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        Дараах
                        <ChevronDown className="h-3.5 w-3.5 rotate-270" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-1">
                    <CardTitle>Бүх хэрэглэгчид</CardTitle>
                    <CardDescription>
                      Системд бүртгэлтэй бүх хэрэглэгчид
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Шүүх</span>
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1 bg-rose-500 hover:bg-rose-600"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Шинэ</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">ID</TableHead>
                          <TableHead>Нэр</TableHead>
                          <TableHead>И-мэйл</TableHead>
                          <TableHead>Ү��рэг</TableHead>
                          <TableHead>Төлөв</TableHead>
                          <TableHead>Мэдээлэл</TableHead>
                          <TableHead>Бүртгүүлсэн</TableHead>
                          <TableHead className="text-right">Үйлдэл</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[...recentUsers, ...recentUsers].map((user, index) => (
                          <TableRow key={`${user.id}-${index}`}>
                            <TableCell className="font-medium">
                              {user.id}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.name}
                                  />
                                  <AvatarFallback>
                                    {user.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${user.statusColor}`}
                                ></div>
                                <span>{user.status}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.reports}</TableCell>
                            <TableCell>{user.joined}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Цэс</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    Дэлгэрэнгүй
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Засах</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Түр хаах</DropdownMenuItem>
                                  <DropdownMenuItem>Устгах</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Нийт <strong>5,234</strong> хэрэглэгчээс{" "}
                      <strong>1-10</strong> харуулж байна
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Өмнөх
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        Дараах
                        <ChevronDown className="h-3.5 w-3.5 rotate-270" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-1">
                    <CardTitle>Ангилалууд</CardTitle>
                    <CardDescription>
                      Мэдээллийн ангилалуудын жагсаалт
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="ml-auto gap-1 bg-rose-500 hover:bg-rose-600"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Шинэ ангилал</span>
                  </Button>
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
                        {[
                          {
                            name: "Нүхтэй зам",
                            description:
                              "Замын нүх, эвдрэл, гэмтэлтэй холбоотой асуудлууд",
                            count: 245,
                            created: "2022-10-15",
                          },
                          {
                            name: "Гэрэлтүүлэг",
                            description:
                              "Гудамжны гэрэлтүүлэгтэй холбоотой асуудлууд",
                            count: 187,
                            created: "2022-10-15",
                          },
                          {
                            name: "Хог хаягдал",
                            description:
                              "Хог хаягдал, цэвэрлэгээтэй холбоотой асуудлууд",
                            count: 156,
                            created: "2022-10-15",
                          },
                          {
                            name: "Явган хүний зам",
                            description:
                              "Явган хүний зам, гарцтай холбоотой асуудлууд",
                            count: 98,
                            created: "2022-10-15",
                          },
                          {
                            name: "Бусад",
                            description: "Бусад төрлийн дэд бүтцийн асуудлууд",
                            count: 87,
                            created: "2022-10-15",
                          },
                        ].map((category, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {category.name}
                            </TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>{category.count}</TableCell>
                            <TableCell>{category.created}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Цэс</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Засах</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Устгах</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Харилцаа холбоо</CardTitle>
                  <CardDescription>
                    Хэрэглэгчидтэй харилцах хэсэг
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="inbox">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="inbox">Ирсэн (12)</TabsTrigger>
                      <TabsTrigger value="sent">Илгээсэн</TabsTrigger>
                      <TabsTrigger value="drafts">Ноорог (3)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="inbox" className="mt-4">
                      <div className="space-y-4">
                        {[
                          {
                            id: "MSG-001",
                            from: "Болд Батбаяр",
                            subject: "Мэдээллийн явц",
                            message:
                              "Миний мэдээлсэн асуудлын шийдвэрлэлтийн явц ямар байна?",
                            date: "2023-05-15 14:30",
                            read: false,
                            avatar:
                              "/placeholder.svg?height=40&width=40&text=ББ",
                          },
                          {
                            id: "MSG-002",
                            from: "Сараа Дорж",
                            subject: "Талархал",
                            message:
                              "Миний мэдээлсэн асуудлыг шийдвэрлэсэнд баярлалаа!",
                            date: "2023-05-14 09:15",
                            read: true,
                            avatar:
                              "/placeholder.svg?height=40&width=40&text=СД",
                          },
                          {
                            id: "MSG-003",
                            from: "Бат-Эрдэнэ Ганбат",
                            subject: "Асуулт",
                            message:
                              "Шинэ мэдээлэл оруулахад алдаа гарсаар байна. Тусламж хэрэгтэй байна.",
                            date: "2023-05-13 16:45",
                            read: true,
                            avatar:
                              "/placeholder.svg?height=40&width=40&text=БЭ",
                          },
                        ].map((message) => (
                          <div
                            key={message.id}
                            className={`flex items-center gap-4 rounded-lg border p-4 ${
                              !message.read ? "bg-muted/50" : ""
                            }`}
                          >
                            <Avatar>
                              <AvatarImage
                                src={message.avatar || "/placeholder.svg"}
                                alt={message.from}
                              />
                              <AvatarFallback>
                                {message.from.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {message.from}
                                </span>
                                {!message.read && (
                                  <Badge className="bg-rose-500 text-white">
                                    Шинэ
                                  </Badge>
                                )}
                              </div>
                              <div className="font-medium">
                                {message.subject}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {message.message}
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {message.date}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Цэс</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Харах</DropdownMenuItem>
                                <DropdownMenuItem>Хариу бичих</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Устгах</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="sent" className="mt-4">
                      <div className="flex items-center justify-center p-8 text-center">
                        <div className="grid gap-1">
                          <h3 className="font-medium">Илгээсэн зурвасууд</h3>
                          <p className="text-sm text-muted-foreground">
                            Таны илгээсэн зурвасууд энд харагдана.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="drafts" className="mt-4">
                      <div className="flex items-center justify-center p-8 text-center">
                        <div className="grid gap-1">
                          <h3 className="font-medium">Ноорог зурвасууд</h3>
                          <p className="text-sm text-muted-foreground">
                            Таны хадгалсан ноорог зурвасууд энд харагдана.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-1">
                    <CardTitle>Тайлангууд</CardTitle>
                    <CardDescription>
                      Системийн статистик тайлангууд
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="monthly">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="monthly">Сарын</TabsTrigger>
                      <TabsTrigger value="quarterly">Улирлын</TabsTrigger>
                      <TabsTrigger value="yearly">Жилийн</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monthly" className="mt-4">
                      <div className="grid gap-6 lg:grid-cols-3">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Нийт мэдээлэл
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">124</div>
                            <p className="text-xs text-muted-foreground">
                              +12% өмнөх сараас
                            </p>
                            <div className="mt-4 h-[120px] bg-muted rounded-md flex items-center justify-center">
                              <BarChart3 className="h-10 w-10 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Шийдвэрлэлтийн хувь
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">78%</div>
                            <p className="text-xs text-muted-foreground">
                              +5% өмнөх сараас
                            </p>
                            <div className="mt-4 h-[120px] bg-muted rounded-md flex items-center justify-center">
                              <BarChart3 className="h-10 w-10 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Шинэ хэрэглэгч
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">342</div>
                            <p className="text-xs text-muted-foreground">
                              +18% өмнөх сараас
                            </p>
                            <div className="mt-4 h-[120px] bg-muted rounded-md flex items-center justify-center">
                              <BarChart3 className="h-10 w-10 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Сарын тайлан</CardTitle>
                            <CardDescription>
                              2023 оны 5-р сарын статистик
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px] bg-muted rounded-md flex items-center justify-center">
                              <BarChart3 className="h-16 w-16 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="quarterly" className="mt-4">
                      <div className="flex items-center justify-center p-8 text-center">
                        <div className="grid gap-1">
                          <h3 className="font-medium">Улирлын тайлан</h3>
                          <p className="text-sm text-muted-foreground">
                            Улирлын тайлан удахгүй нэмэгдэх болно.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="yearly" className="mt-4">
                      <div className="flex items-center justify-center p-8 text-center">
                        <div className="grid gap-1">
                          <h3 className="font-medium">Жилийн тайлан</h3>
                          <p className="text-sm text-muted-foreground">
                            Жилийн тайлан удахгүй нэмэгдэх болно.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Системийн тохиргоо</CardTitle>
                  <CardDescription>
                    Системийн үндсэн тохиргоонууд
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="general">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="general">Ерөнхий</TabsTrigger>
                      <TabsTrigger value="notifications">Мэдэгдэл</TabsTrigger>
                      <TabsTrigger value="security">Аюулгүй байдал</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="mt-4 space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="site-name">Сайтын нэр</Label>
                        <Input
                          id="site-name"
                          defaultValue="UBFix - Хотын асуудал мэдээлэх систем"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="site-description">Тайлбар</Label>
                        <Input
                          id="site-description"
                          defaultValue="Улаанбаатар хотын дэд бүтцийн асуудлыг мэдээлэх платформ"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact-email">
                          Холбоо барих и-мэйл
                        </Label>
                        <Input
                          id="contact-email"
                          defaultValue="info@ubfix.mn"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact-phone">Холбоо барих утас</Label>
                        <Input
                          id="contact-phone"
                          defaultValue="+976 11 123456"
                        />
                      </div>
                      <Button className="bg-rose-500 hover:bg-rose-600">
                        Хадгалах
                      </Button>
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-4">
                      <div className="flex items-center justify-center p-8 text-center">
                        <div className="grid gap-1">
                          <h3 className="font-medium">Мэдэгдлийн тохиргоо</h3>
                          <p className="text-sm text-muted-foreground">
                            Мэдэгдлийн тохиргоо удахгүй нэмэгдэх болно.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="security" className="mt-4">
                      <div className="flex items-center justify-center p-8 text-center">
                        <div className="grid gap-1">
                          <h3 className="font-medium">
                            Аюулгүй байдлын тохиргоо
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Аюулгүй байдлын тохиргоо удахгүй нэмэгдэх болно.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
