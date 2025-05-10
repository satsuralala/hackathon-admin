"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Camera,
  Clock,
  Search,
  Menu,
  X,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMobile } from "@/app/hooks/use-mobile";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const navLinks = [
    { href: "#how-it-works", label: "Хэрхэн ажилладаг" },
    { href: "#features", label: "Онцлогууд" },
    { href: "#success-stories", label: "Амжилтын түүхүүд" },
    { href: "#faq", label: "Түгээмэл асуултууд" },
    { href: "#report-issue", label: "Асуудал мэдээлэх" },
  ];

  const [location, setLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Таны хөтөч байршил тодорхойлох функцийг дэмждэггүй байна.");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationCoords({ lat: latitude, lng: longitude });
        setLocation(
          `Өргөрөг: ${latitude.toFixed(6)}, Уртраг: ${longitude.toFixed(6)}`
        );
        setLocationStatus("success");
      },
      (error) => {
        console.error("Байршил тодорхойлоход алдаа гарлаа:", error);
        setLocationStatus("error");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    // Create preview URLs for the new files
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    // Update state with new files and previews
    setSelectedImages((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    // Create new arrays without the removed image
    const newSelectedImages = [...selectedImages];
    const newImagePreviews = [...imagePreviews];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImagePreviews[index]);

    // Remove the image from the arrays
    newSelectedImages.splice(index, 1);
    newImagePreviews.splice(index, 1);

    // Update state
    setSelectedImages(newSelectedImages);
    setImagePreviews(newImagePreviews);
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-background"
        }`}
      >
        <div className="container flex h-16 items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-rose-100">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </div>
            <span className="text-xl font-bold">UBFix</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium relative group"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(link.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/login"
              className="text-sm font-medium relative group hidden md:block"
            >
              Нэвтрэх
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Button
              asChild
              className="bg-rose-500 hover:bg-rose-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href="#report-issue" className="flex items-center gap-2">
                <span>Асуудал мэдээлэх</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Цэсийг нээх</span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md transition-colors"
              >
                Нэвтрэх
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-background overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
                className="flex flex-col justify-center space-y-6"
              >
                <motion.div variants={item} className="space-y-4">
                  <div className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm text-rose-500">
                    <span className="font-medium">Хотоо сайжруулцгаая</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Асуудлыг мэдээлж,{" "}
                    <span className="text-rose-500">хотоо сайжруулцгаая</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                    UBFix нь Улаанбаатар хотын нүхэн замууд, гэмтсэн гудамжны
                    гэрэлтүүлэг, хог хаягдлын асуудал болон бусад дэд бүтцийн
                    асуудлуудыг хялбархан мэдээлэх боломжийг олгодог.
                  </p>
                </motion.div>
                <motion.div
                  variants={item}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-rose-500 hover:bg-rose-600 transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <Link
                      href="#report-issue"
                      className="flex items-center gap-2"
                    >
                      <span>Асуудал мэдээлэх</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="/track" className="flex items-center gap-2">
                      <span>Мэдээллийн явцыг хянах</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  variants={item}
                  className="flex items-center gap-4 text-sm text-muted-foreground"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                      >
                        <Image
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          alt={`Хэрэглэгч ${i}`}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span>
                    <strong>5,000+</strong> оршин суугчид Улаанбаатар хотыг
                    сайжруулахад оролцож байна
                  </span>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="mx-auto w-full max-w-[500px] lg:max-w-none relative"
              >
                <div className="aspect-video overflow-hidden rounded-xl shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent z-10 rounded-xl"></div>
                  <Image
                    src="/placeholder.svg?height=720&width=1280&text=Хотын+засвар"
                    alt="Хотын дэд бүтцийн засвар"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white rounded-lg shadow-lg p-3 md:p-4 max-w-[200px]">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>48 цагт шийдвэрлэсэн</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Энх тайвны өргөн чөлөөн дэх нүх засагдсан
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          id="how-it-works"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full py-16 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div variants={slideUp} className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="font-medium">Энгийн үйл явц</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Хэрхэн ажилладаг вэ
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Гурван энгийн алхмаар өөрийн хороололд асуудлыг мэдээлнэ
                </p>
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3"
            >
              {[
                {
                  icon: <Camera className="h-8 w-8 text-rose-500" />,
                  title: "Зураг авах",
                  description:
                    "Таны олсон асуудлын зургийг авна уу. Тод зургууд нь засварын багт асуудлыг ойлгоход тусална.",
                },
                {
                  icon: <MapPin className="h-8 w-8 text-rose-500" />,
                  title: "Байршлыг тэмдэглэх",
                  description:
                    "Газрын зураг дээр яг байршлыг тэмдэглэх эсвэл нарийвчлалын тулд аппликейшнд одоогийн байршлыг ашиглахыг зөвшөөрнө үү.",
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-rose-500" />,
                  title: "Илгээх ба хянах",
                  description:
                    "Мэдээллээ илгээж, таны асуудлыг хянаж, хуваарилж, засварлах явцын талаар шинэчлэлтийг хүлээн авна уу.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex flex-col items-center space-y-4 rounded-xl border p-6 text-center bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="features"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full py-16 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div variants={slideUp} className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="font-medium">Хүчирхэг платформ</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Гол онцлогууд
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Хотын дэд бүтцийн асуудлыг мэдээлж, хянахад шаардлагатай бүх
                  зүйл
                </p>
              </motion.div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-xl shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent z-10 rounded-xl"></div>
                <Image
                  src="/placeholder.svg?height=1080&width=1920&text=UBFix+Апп"
                  alt="UBFix гар утасны аппликейшний интерфейс"
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  UBFix Гар утасны апп
                </div>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-6"
              >
                <ul className="grid gap-6">
                  {[
                    {
                      icon: <MapPin className="h-5 w-5 text-rose-500" />,
                      title: "Нарийвчилсан байршил тэмдэглэх",
                      description:
                        "Бидний интерактив газрын зураг дээр яг байршлыг тэмдэглэх эсвэл автоматаар байршуулахын тулд GPS ашиглана уу.",
                    },
                    {
                      icon: <Camera className="h-5 w-5 text-rose-500" />,
                      title: "Зураг баримтжуулалт",
                      description:
                        "Асуудлыг өөр өөр өнцгөөс баримтжуулахын тулд олон зураг байршуулна уу.",
                    },
                    {
                      icon: <Clock className="h-5 w-5 text-rose-500" />,
                      title: "Бодит цагийн төлөвийн шинэчлэлтүүд",
                      description:
                        "Таны мэдээлэл хяналт, хуваарилалт, гүйцэтгэлийн үе шатуудаар дамжихад мэдэгдэл хүлээн авна уу.",
                    },
                    {
                      icon: <Search className="h-5 w-5 text-rose-500" />,
                      title: "Асуудлыг хайх",
                      description:
                        "Давхардлаас зайлсхийж, олон нийтийн санаа зовниж буй асуудлыг хянахын тулд таны бүсэд байгаа одоогийн мэдээллүүдийг харна уу.",
                    },
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      variants={item}
                      className="flex items-start gap-4 rounded-lg border bg-background p-4 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="success-stories"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full py-16 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div variants={slideUp} className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="font-medium">Бодит үр дүн</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Амжилтын түүхүүд
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  UBFix нь Улаанбаатар хотын хороололуудыг хэрхэн сайжруулахад
                  тусалсныг харна уу
                </p>
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  image:
                    "/placeholder.svg?height=480&width=640&text=Нүх+засагдсан",
                  title: "Сүхбаатар дүүргийн нүхэн замын засвар",
                  description:
                    "Энх тайвны өргөн чөлөөн дэх аюултай нүхийг мэдээлж, 5 хоногийн дотор засварлаж, болзошгүй осол аваараас урьдчилан сэргийлсэн.",
                  days: 5,
                },
                {
                  image:
                    "/placeholder.svg?height=480&width=640&text=Гэрэлтүүлэг+засагдсан",
                  title: "Баянзүрх гудамжны гэрэлтүүлэг",
                  description:
                    "Оршин суугчдын бүсэд олон эвдэрсэн гудамжны гэрэлтүүлгийг мэдээлж, засварласны дараа хороолол илүү аюулгүй болсон.",
                  days: 7,
                },
                {
                  image:
                    "/placeholder.svg?height=480&width=640&text=Хог+цэвэрлэгдсэн",
                  title: "Хан-Уул хог хаягдлын цэвэрлэгээ",
                  description:
                    "Хууль бус хог хаягдлын цэгийг мэдээлж, цэвэрлэснээр тухайн бүсийн орчин, нийтийн эрүүл мэндийг сайжруулсан.",
                  days: 3,
                },
              ].map((story, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex flex-col space-y-4 rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-video overflow-hidden rounded-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent z-10 rounded-lg"></div>
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      width={640}
                      height={480}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-white text-rose-500 text-xs font-bold px-2 py-1 rounded-full shadow-md">
                      Өмнө ба дараа
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{story.title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-rose-500" />
                    <span>
                      <strong>{story.days} хоногт</strong> шийдвэрлэсэн
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline" size="lg" className="group">
                <Link
                  href="/success-stories"
                  className="flex items-center gap-2"
                >
                  <span>Бусад амжилтын түүхүүдийг харах</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="faq"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full py-16 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div variants={slideUp} className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="font-medium">Түгээмэл асуултууд</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Түгээмэл асуултууд
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  UBFix ашиглах талаарх түгээмэл асуултууд
                </p>
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2"
            >
              {[
                {
                  question: "UBFix-ийг хэн ашиглаж болох вэ?",
                  answer:
                    "Улаанбаатар хотын аль ч оршин суугч UBFix-ийг дэд бүтцийн асуудлыг мэдээлэхэд ашиглаж болно. Мэдээлэл илгээхийн тулд бүртгэл үүсгэх шаардлагагүй, гэхдээ бүртгэлтэй хэрэглэгчид өөрсдийн мэдээллийг илүү хялбархан хянах боломжтой.",
                },
                {
                  question: "Ямар төрлийн асуудлыг мэдээлж болох вэ?",
                  answer:
                    "Та нүхэн зам, эвдэрсэн гудамжны гэрэлтүүлэг, хууль бус хог хаягдал, гэмтсэн явган хүний зам, граффити, эвдэрсэн нийтийн байгууламж болон бусад дэд бүтцийн асуудлуудыг мэдээлж болно.",
                },
                {
                  question:
                    "Асуудлыг шийдвэрлэхэд хэр удаан хугацаа шаардагдах вэ?",
                  answer:
                    "Шийдвэрлэх хугацаа нь асуудлын төрөл, ноцтой байдлаас хамаарна. Аюултай замын нөхцөл байдал гэх мэт яаралтай асуудлуудыг тэргүүн ээлжинд шийдвэрлэнэ. Ихэнх асуудлыг 1-2 долоо хоногий�� дотор шийдвэрлэдэг.",
                },
                {
                  question: "Мэдээлсэн асуудлыг хэн засварладаг вэ?",
                  answer:
                    "Мэдээллүүдийг тухайн төрлийн дэд бүтцийг хариуцсан хотын газар эсвэл дүүргийн засвар үйлчилгээний багт хүргүүлдэг. UBFix нь холбогдох бүх байгууллагуудтай хамтран ажилладаг.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="rounded-xl border bg-background p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center">
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/faq" className="flex items-center gap-2">
                  <span>Бүх түгээмэл асуултуудыг харах</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="report-issue"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full py-16 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.div variants={slideUp} className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm text-rose-500">
                  <span className="font-medium">Асуудал мэдээлэх</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Асуудлаа мэдээлнэ үү
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Хотын дэд бүтцийн асуудлыг мэдээлж, Улаанбаатар хотыг
                  сайжруулахад тусална уу
                </p>
              </motion.div>
            </div>

            <div className="mx-auto max-w-3xl">
              <Card className="border-rose-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Асуудал мэдээлэх маягт
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="issue-type">Асуудлын төрөл</Label>
                      <Select>
                        <SelectTrigger id="issue-type">
                          <SelectValue placeholder="Төрлийг сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pothole">Нүхэн зам</SelectItem>
                          <SelectItem value="streetlight">
                            Гудамжны гэрэлтүүлэг
                          </SelectItem>
                          <SelectItem value="waste">Хог хаягдал</SelectItem>
                          <SelectItem value="sidewalk">
                            Явган хүний зам
                          </SelectItem>
                          <SelectItem value="other">Бусад</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">Дүүрэг</Label>
                      <Select>
                        <SelectTrigger id="district">
                          <SelectValue placeholder="Дүүргийг сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sukhbaatar">Сүхбаатар</SelectItem>
                          <SelectItem value="bayanzurkh">Баянзүрх</SelectItem>
                          <SelectItem value="chingeltei">Чингэлтэй</SelectItem>
                          <SelectItem value="khan-uul">Хан-Уул</SelectItem>
                          <SelectItem value="bayangol">Баянгол</SelectItem>
                          <SelectItem value="songinokhairkhan">
                            Сонгинохайрхан
                          </SelectItem>
                          <SelectItem value="nalaikh">Налайх</SelectItem>
                          <SelectItem value="bagakhangai">
                            Багахангай
                          </SelectItem>
                          <SelectItem value="baganuur">Багануур</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Байршил</Label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div className="md:col-span-3">
                        <Input
                          id="location"
                          placeholder="Жишээ: Энх тайвны өргөн чөлөө, 5-р байр"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={getCurrentLocation}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Одоогийн байршил</span>
                      </Button>
                    </div>
                    {locationStatus === "loading" && (
                      <p className="text-xs text-muted-foreground">
                        Байршлыг тодорхойлж байна...
                      </p>
                    )}
                    {locationStatus === "error" && (
                      <p className="text-xs text-rose-500">
                        Байршлыг тодорхойлоход алдаа гарлаа. Дахин оролдоно уу.
                      </p>
                    )}
                    {locationStatus === "success" && (
                      <div className="mt-2 p-2 bg-muted rounded-md">
                        <p className="text-xs">
                          <span className="font-medium">
                            Байршил амжилттай тодорхойлогдлоо:
                          </span>{" "}
                          {locationCoords.lat.toFixed(6)},{" "}
                          {locationCoords.lng.toFixed(6)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Асуудлын тайлбар</Label>
                    <Textarea
                      id="description"
                      placeholder="Асуудлын талаар дэлгэрэнгүй тайлбарлана уу"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Зураг оруулах</Label>
                    <div className="flex flex-col gap-4">
                      <label
                        htmlFor="photo-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Дарж зураг оруулах
                            </span>{" "}
                            эсвэл чирж оруулах
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG (Хамгийн ихдээ 10MB)
                          </p>
                        </div>
                        <input
                          id="photo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                        />
                      </label>

                      {imagePreviews.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Сонгосон зургууд ({imagePreviews.length})
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square rounded-md overflow-hidden border">
                                  <Image
                                    src={preview || "/placeholder.svg"}
                                    alt={`Сонгосон зураг ${index + 1}`}
                                    width={120}
                                    height={120}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-label="Зургийг устгах"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">
                      Холбоо барих мэдээлэл (заавал биш)
                    </Label>
                    <Input
                      id="contact"
                      placeholder="И-мэйл эсвэл утасны дугаар"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Цэвэрлэх</Button>
                  <Button className="bg-rose-500 hover:bg-rose-600">
                    Мэдээлэл илгээх
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Яаралтай асуудлын хувьд шууд утасаар холбогдоно уу:{" "}
                  <strong>+976 11 123456</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="w-full py-16 md:py-24 lg:py-32 bg-rose-50"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                variants={container}
                className="flex flex-col justify-center space-y-6"
              >
                <motion.div variants={item} className="space-y-4">
                  <div className="inline-flex items-center rounded-full border border-rose-200 bg-white px-3 py-1 text-sm text-rose-500">
                    <span className="font-medium">Хөдөлгөөнд нэгдээрэй</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Хотоо сайжруулахад бэлэн үү?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Улаанбаатар хотыг нэг мэдээлэл бүрээр сайжруулж буй мянга
                    мянган оршин суугчидтай нэгдээрэй. Таны оролцоо чухал!
                  </p>
                </motion.div>
                <motion.div
                  variants={item}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-rose-500 hover:bg-rose-600 transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <Link
                      href="#report-issue"
                      className="flex items-center gap-2"
                    >
                      <span>Одоо асуудал мэдээлэх</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="/about" className="flex items-center gap-2">
                      <span>UBFix-ийн талаар илүү ихийг мэдэх</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="mx-auto w-full max-w-[500px] lg:max-w-none relative"
              >
                <div className="aspect-video overflow-hidden rounded-xl shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent z-10 rounded-xl"></div>
                  <Image
                    src="/placeholder.svg?height=720&width=1280&text=Олон+нийтийн+гишүүд"
                    alt="UBFix ашиглаж буй олон нийтийн гишүүд"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white rounded-lg shadow-lg p-3 md:p-4 max-w-[200px]">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5,000+ асуудал шийдвэрлэсэн</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Өнөөдөр манай олон нийтэд нэгдээрэй
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-8 py-8 md:py-12 lg:py-16 px-4 md:px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="flex flex-col gap-4 lg:max-w-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100">
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                </div>
                <span className="text-xl font-bold">UBFix</span>
              </div>
              <p className="text-sm text-muted-foreground">
                UBFix нь оршин суугчдыг хотын эрх баригчидтай холбож, дэд
                бүтцийн асуудлыг үр дүнтэй мэдээлж, шийдвэрлэх олон нийтийн
                платформ юм.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Платформ</h3>
                <ul className="flex flex-col gap-2">
                  {[
                    "Тухай",
                    "Онцлогууд",
                    "Амжилтын түүхүүд",
                    "Түгээмэл асуултууд",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Нөөц</h3>
                <ul className="flex flex-col gap-2">
                  {["Хэрэглэгчийн гарын авлага", "Блог", "API"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Хууль эрх зүй</h3>
                <ul className="flex flex-col gap-2">
                  {["Нөхцөл", "Нууцлал", "Күүки"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Холбоо барих</h3>
                <ul className="flex flex-col gap-2">
                  {["Холбоо барих", "Дэмжлэг", "Санал хүсэлт"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} UBFix. Бүх эрх хуулиар хамгаалагдсан.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Хэл:</span>
              <select
                title="select"
                className="text-xs border rounded-md px-2 py-1 bg-transparent"
              >
                <option value="mn">Монгол</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-rose-500 text-white shadow-lg flex items-center justify-center z-50 hover:bg-rose-600 transition-colors"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
