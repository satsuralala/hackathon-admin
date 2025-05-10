"use client";

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
import { useMobile } from "./hooks/use-mobile";

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
    { href: "#how-it-works", label: "How It Works" },
    { href: "#features", label: "Features" },
    { href: "#success-stories", label: "Success Stories" },
    { href: "#faq", label: "FAQ" },
  ];

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
              Log in
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Button
              asChild
              className="bg-rose-500 hover:bg-rose-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href="/report" className="flex items-center gap-2">
                <span>Report an Issue</span>
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
              <span className="sr-only">Toggle menu</span>
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
                Log in
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
                    <span className="font-medium">Improve Your City</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Report issues,{" "}
                    <span className="text-rose-500">build a better city</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                    UBFix makes it easy to report potholes, broken streetlights,
                    waste issues, and other infrastructure problems in
                    Ulaanbaatar.
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
                    <Link href="/report" className="flex items-center gap-2">
                      <span>Report an Issue</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="/track" className="flex items-center gap-2">
                      <span>Track Existing Reports</span>
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
                          alt={`User ${i}`}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span>
                    Join <strong>5,000+</strong> residents improving Ulaanbaatar
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
                    src="/placeholder.svg?height=720&width=1280&text=City+Repair"
                    alt="City infrastructure being repaired"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white rounded-lg shadow-lg p-3 md:p-4 max-w-[200px]">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Issue resolved in 48h</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pothole on Peace Avenue fixed
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
                  <span className="font-medium">Simple Process</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Report issues in your neighborhood in three simple steps
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
                  title: "Take a Photo",
                  description:
                    "Snap a picture of the issue you've found. Clear photos help repair teams understand the problem.",
                },
                {
                  icon: <MapPin className="h-8 w-8 text-rose-500" />,
                  title: "Mark Location",
                  description:
                    "Pin the exact location on the map or allow the app to use your current location for accuracy.",
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-rose-500" />,
                  title: "Submit & Track",
                  description:
                    "Submit your report and receive updates as your issue is reviewed, assigned, and fixed.",
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
                  <span className="font-medium">Powerful Platform</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Everything you need to report and track city infrastructure
                  issues
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
                  src="/placeholder.svg?height=1080&width=1920&text=UBFix+App"
                  alt="UBFix mobile app interface"
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  UBFix Mobile App
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
                      title: "Precise Location Mapping",
                      description:
                        "Mark exact locations with our interactive map or use GPS for automatic positioning.",
                    },
                    {
                      icon: <Camera className="h-5 w-5 text-rose-500" />,
                      title: "Photo Documentation",
                      description:
                        "Upload multiple photos to document the issue from different angles.",
                    },
                    {
                      icon: <Clock className="h-5 w-5 text-rose-500" />,
                      title: "Real-time Status Updates",
                      description:
                        "Receive notifications as your report progresses through review, assignment, and completion.",
                    },
                    {
                      icon: <Search className="h-5 w-5 text-rose-500" />,
                      title: "Issue Browsing",
                      description:
                        "View existing reports in your area to avoid duplicates and track community concerns.",
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
                  <span className="font-medium">Real Results</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Success Stories
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  See how UBFix has helped improve neighborhoods across
                  Ulaanbaatar
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
                    "/placeholder.svg?height=480&width=640&text=Pothole+Fixed",
                  title: "Sukhbaatar District Pothole Repair",
                  description:
                    "A dangerous pothole on Peace Avenue was reported and fixed within 5 days, preventing potential accidents.",
                  days: 5,
                },
                {
                  image:
                    "/placeholder.svg?height=480&width=640&text=Streetlights+Fixed",
                  title: "Bayanzurkh Street Lighting",
                  description:
                    "Multiple broken streetlights were reported in a residential area, making the neighborhood safer after repairs.",
                  days: 7,
                },
                {
                  image:
                    "/placeholder.svg?height=480&width=640&text=Waste+Removed",
                  title: "Khan-Uul Waste Removal",
                  description:
                    "An illegal dumping site was reported and cleaned up, improving the environment and public health in the area.",
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
                      Before & After
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{story.title}</h3>
                  <p className="text-muted-foreground flex-grow">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-rose-500" />
                    <span>
                      Resolved in <strong>{story.days} days</strong>
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
                  <span>View More Success Stories</span>
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
                  <span className="font-medium">Common Questions</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Common questions about using UBFix
                </p>
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2"
            >
              {[
                {
                  question: "Who can use UBFix?",
                  answer:
                    "Any resident of Ulaanbaatar can use UBFix to report infrastructure issues. You don't need to create an account to submit a report, but registered users can track their reports more easily.",
                },
                {
                  question: "What types of issues can I report?",
                  answer:
                    "You can report potholes, broken streetlights, illegal dumping, damaged sidewalks, graffiti, broken public facilities, and other infrastructure problems.",
                },
                {
                  question: "How long does it take for issues to be fixed?",
                  answer:
                    "Resolution times vary depending on the type and severity of the issue. Emergency issues like dangerous road conditions are prioritized. Most issues are resolved within 1-2 weeks.",
                },
                {
                  question: "Who fixes the reported issues?",
                  answer:
                    "Reports are directed to the appropriate city department or district maintenance team responsible for that type of infrastructure. UBFix coordinates with all relevant authorities.",
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
                  <span>View All FAQs</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>
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
                    <span className="font-medium">Join the Movement</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to improve your city?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join thousands of residents who are making Ulaanbaatar
                    better, one report at a time. Your participation matters!
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
                    <Link href="/report" className="flex items-center gap-2">
                      <span>Report an Issue Now</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="/about" className="flex items-center gap-2">
                      <span>Learn More About UBFix</span>
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
                    src="/placeholder.svg?height=720&width=1280&text=Community+Members"
                    alt="Community members using UBFix"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white rounded-lg shadow-lg p-3 md:p-4 max-w-[200px]">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5,000+ issues resolved</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Join our community today
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
                UBFix is a community-driven platform that connects residents
                with city authorities to efficiently report and resolve
                infrastructure issues.
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
                <h3 className="text-sm font-medium">Platform</h3>
                <ul className="flex flex-col gap-2">
                  {["About", "Features", "Success Stories", "FAQ"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Resources</h3>
                <ul className="flex flex-col gap-2">
                  {["User Guide", "Blog", "API"].map((item) => (
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
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="flex flex-col gap-2">
                  {["Terms", "Privacy", "Cookies"].map((item) => (
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
                <h3 className="text-sm font-medium">Contact</h3>
                <ul className="flex flex-col gap-2">
                  {["Contact Us", "Support", "Feedback"].map((item) => (
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
              © {new Date().getFullYear()} UBFix. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Language:</span>
              <select
                title="select"
                className="text-xs border rounded-md px-2 py-1 bg-transparent"
              >
                <option value="en">English</option>
                <option value="mn">Mongolian</option>
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
