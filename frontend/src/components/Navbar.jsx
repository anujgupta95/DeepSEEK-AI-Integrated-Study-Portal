import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import LoginButton from "@/components/LoginButton";
import logo from "/logo.png";

function NavigationLinks() {
  const { profile } = useUser();
  
  let roleBasedLinks;

  if (profile?.role === "admin") {
    roleBasedLinks = (
      <>
        {/* <NavLink to="/users">Users</NavLink> */}
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
      </>
    );
  } else if (profile?.role === "instructor") {
    roleBasedLinks = <NavLink to="/instructor/dashboard">Dashboard</NavLink>;
  } else {
    // Default to student links
    roleBasedLinks = (
      <>
        <NavLink to="/course">Course</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </>
    );
  }

  return (
    <>
      <NavLink to="/about-us">About Us</NavLink>
      {profile && (
        <>
          {roleBasedLinks}
          
        </>
      )}
      <LoginButton />
    </>
  );
}

export default function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-color" >
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to="/" className="mr-6 hidden lg:flex">
            <img src={logo} alt="Deepseek" width={40} height={20} />
            <span className="sr-only">DeepSEEK</span>
          </Link>
          <div className="grid gap-2 py-6">
            <NavigationLinks />
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <Link to="/" className="mr-6 hidden lg:flex">
        <img src={logo} alt="Deepseek" width={40} height={20} />
        <span className="ms-2 text-3xl">DeepSEEK</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden lg:flex gap-6">
        <NavigationLinks />
      </nav>
    </header>
  );
}

// ✅ Reusable Navigation Link Component
function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
    >
      {children}
    </Link>
  );
}

// ✅ Menu Icon Component
function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
