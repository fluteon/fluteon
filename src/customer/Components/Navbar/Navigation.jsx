// import { Fragment, useEffect, useState } from "react";
// import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
// import {
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   ShoppingBagIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import {
//   Menu,
//   MenuItem,
//   IconButton,
//   Button,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Avatar from "@mui/material/Avatar";
// import { deepPurple } from "@mui/material/colors";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { navigation } from "../../../config/navigationMenu";
// import AuthModal from "../Auth/AuthModal";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, logout } from "../../../Redux/Auth/Action";
// import { getCart } from "../../../Redux/Customers/Cart/Action";
// import SearchBar from "../SearchBar";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navigation() {
//   const [open, setOpen] = useState(false);
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openUserMenu = Boolean(anchorEl);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { auth, cart } = useSelector((store) => store);
//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getUser(jwt));
//       dispatch(getCart(jwt));
//     }
//   }, [jwt]);

//   useEffect(() => {
//     if (auth.user) handleClose();
//     if (
//       auth.user?.role !== "ADMIN" &&
//       (location.pathname === "/login" || location.pathname === "/register")
//     ) {
//       navigate(-1);
//     }
//   }, [auth.user]);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const otpId = params.get("otp_id");
//     if (otpId) setOpenAuthModal(true);
//   }, [location]);

//   const handleOpen = () => setOpenAuthModal(true);
//   const handleClose = () => setOpenAuthModal(false);
//   const handleUserClick = (event) => setAnchorEl(event.currentTarget);
//   const handleCloseUserMenu = () => setAnchorEl(null);
//   const handleLogout = () => {
//     handleCloseUserMenu();
//     dispatch(logout());
//   };
//   const handleMyOrderClick = () => {
//     navigate("/account/order");
//     handleCloseUserMenu();
//   };
//   const handleCategoryClick = (category, section, item, close) => {
//     navigate(`/${category.id}/${section.id}/${item.id}`);
//     close();
//   };

//   return (
//     <>
// {/* User Info - Mobile */}
// {/* User Info - Mobile */}
// {!open && (
//   <div className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
//     <div className="flex justify-between items-center px-4 pt-2">
//       {auth.user ? (
//         <div className="flex items-center justify-between w-full">
//           <div className="flex items-center space-x-3">
//             <Avatar
//               sx={{
//                 bgcolor: deepPurple[500],
//                 cursor: "pointer",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 fontSize: "1rem",
//               }}
//             >
//               {auth.user.firstName[0]?.toUpperCase()}
//             </Avatar>
//             <div>
//               <p className="text-sm font-semibold text-gray-800">
//                 Hello, {auth.user.firstName}
//               </p>
//               <p className="text-xs text-gray-500">Welcome back</p>
//             </div>
//           </div>
//           <IconButton size="small" onClick={handleUserClick}>
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleCloseUserMenu}
//             PaperProps={{
//               sx: {
//                 mt: 1,
//                 boxShadow: 3,
//                 borderRadius: 2,
//               },
//             }}
//           >
//             <MenuItem
//               onClick={() => {
//                 handleMyOrderClick();
//                 handleCloseUserMenu();
//                 setOpen(false);
//               }}
//             >
//               My Orders
//             </MenuItem>
//             <MenuItem
//               onClick={() => {
//                 handleLogout();
//                 handleCloseUserMenu();
//                 setOpen(false);
//               }}
//             >
//               Logout
//             </MenuItem>
//           </Menu>
//         </div>
//       ) : (
//         <div className="flex items-center justify-between w-full">
//           <div className="flex items-center space-x-3">
//             <Avatar
//               sx={{
//                 bgcolor: deepPurple[500],
//                 color: "white",
//                 width: 40,
//                 height: 40,
//               }}
//               onClick={handleOpen}
//               className="cursor-pointer"
//             >
//               ?
//             </Avatar>
//             <div>
//               <p className="text-sm font-semibold text-gray-800">Guest</p>
//               <p className="text-xs text-gray-500">Tap to Sign in</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )}

//  <SearchBar className="" />

//         <div className="bg-white pb-10 z-500">

//       {/* Mobile menu */}
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-40 flex">
//             <Transition.Child
//               as={Fragment}
//               enter="transition ease-in-out duration-300 transform"
//               enterFrom="-translate-x-full"
//               enterTo="translate-x-0"
//               leave="transition ease-in-out duration-300 transform"
//               leaveFrom="translate-x-0"
//               leaveTo="-translate-x-full"
//             >
//               <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
//                 <div className="flex justify-between items-center px-4 pt-5 pb-2 border-b border-gray-200">
//                   <button
//                     type="button"
//                     className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//                     onClick={() => setOpen(false)}
//                   >
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>

//                 <Tab.Group as="div">
//                   <Tab.List className="-mb-px flex space-x-8 px-4">
//                     {navigation.categories.map((category) => (
//                       <Tab
//                         key={category.name}
//                         className={({ selected }) =>
//                           classNames(
//                             selected
//                               ? "border-indigo-600 text-indigo-600"
//                               : "text-gray-900",
//                             "flex-1 px-1 py-4 text-base font-medium border-none"
//                           )
//                         }
//                       >
//                         {category.name}
//                       </Tab>
//                     ))}
//                   </Tab.List>

//                   <Tab.Panels as={Fragment}>
//                     {navigation.categories.map((category) => (
//                       <Tab.Panel
//                         key={category.name}
//                         className="space-y-6 px-4 py-6"
//                       >
//                         {category.sections.map((section) => (
//                           <div key={section.name}>
//                             <p className="text-sm font-semibold text-gray-700">
//                               {section.name}
//                             </p>
//                             <ul className="mt-2 space-y-2">
//                               {section.items.map((item) => (
//                                 <li key={item.name}>
//                                   <button
//                                     onClick={() =>
//                                       handleCategoryClick(
//                                         category,
//                                         section,
//                                         item,
//                                         () => setOpen(false)
//                                       )
//                                     }
//                                     className="block w-full text-left text-gray-600 hover:text-gray-900 text-sm"
//                                   >
//                                     {item.name}
//                                   </button>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </Tab.Panel>
//                     ))}
//                   </Tab.Panels>
//                 </Tab.Group>

//                 <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                   {navigation.pages.map((page) => (
//                     <div key={page.name} className="flow-root">
//                       <a
//                         href={page.href}
//                         className="-m-2 block p-2 font-medium text-gray-900"
//                       >
//                         {page.name}
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition.Root>

//       <header className="relative bg-white">
//         <nav className="mx-auto border-b border-gray-200">
//           <div className="flex h-16 items-center px-11">
//             <button
//               className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
//               onClick={() => setOpen(true)}
//             >
//               <Bars3Icon className="h-6 w-6" />
//             </button>

//             <Link to="/" className="ml-4 flex lg:ml-0">
//               <img
//                 src="./favicon.ico"
//                 alt="Logo"
//                 className="h-8 w-8 mr-2"
//               />
//             </Link>

//             <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
//               <div className="flex h-full space-x-8">
//                 {navigation.categories.map((category) => (
//                   <Popover key={category.name} className="flex">
//                     {({ open, close }) => (
//                       <>
//                         <div className="relative flex">
//                           <Popover.Button
//                             className={classNames(
//                               open
//                                 ? "border-indigo-600 text-indigo-600"
//                                 : "text-gray-700 hover:text-gray-800",
//                               "border-b-2 pt-px text-sm font-medium"
//                             )}
//                           >
//                             {category.name}
//                           </Popover.Button>
//                         </div>
//                         <Transition
//                           as={Fragment}
//                           enter="transition ease-out duration-200"
//                           enterFrom="opacity-0"
//                           enterTo="opacity-100"
//                           leave="transition ease-in duration-150"
//                           leaveFrom="opacity-100"
//                           leaveTo="opacity-0"
//                         >
//                           <Popover.Panel className="absolute inset-x-0 top-full text-sm">
//                             <div className="absolute inset-0 top-1/2 bg-white shadow" />
//                             <div className="relative bg-white px-8 py-16">
//                               <div className="grid grid-cols-2 gap-10">
//                                 <div className="grid grid-cols-3 gap-8 text-sm">
//                                   {category.sections.map((section) => (
//                                     <div key={section.name}>
//                                       <p className="font-medium text-gray-900">
//                                         {section.name}
//                                       </p>
//                                       <ul className="mt-4 space-y-4">
//                                         {section.items.map((item) => (
//                                           <li key={item.name}>
//                                             <p
//                                               onClick={() =>
//                                                 handleCategoryClick(
//                                                   category,
//                                                   section,
//                                                   item,
//                                                   close
//                                                 )
//                                               }
//                                               className="cursor-pointer hover:text-gray-800"
//                                             >
//                                               {item.name}
//                                             </p>
//                                           </li>
//                                         ))}
//                                       </ul>
//                                     </div>
//                                   ))}
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-8">
//                                   {category.featured.map((item) => (
//                                     <div key={item.name} className="group text-base">
//                                       <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
//                                         <img
//                                           src={item.imageSrc}
//                                           alt={item.imageAlt}
//                                           className="object-cover object-center"
//                                         />
//                                       </div>
//                                       <a href={item.href} className="mt-6 block font-medium text-gray-900">
//                                         {item.name}
//                                       </a>
//                                       <p className="mt-1">Shop now</p>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                           </Popover.Panel>
//                         </Transition>
//                       </>
//                     )}
//                   </Popover>
//                 ))}
//                 {navigation.pages.map((page) => (
//                   <a
//                     key={page.name}
//                     href={page.href}
//                     className="text-sm font-medium text-gray-700 hover:text-gray-800"
//                   >
//                     {page.name}
//                   </a>
//                 ))}
//               </div>
//             </Popover.Group>

//             <div className="ml-auto flex items-center">
//               <div className="hidden lg:flex items-center space-x-6">
//                 {auth.user ? (
//                   <>
//                     <p className="text-sm font-semibold text-gray-700">
//                       Hello, {auth.user.firstName}
//                     </p>
// <Avatar
//   sx={{
//     bgcolor: deepPurple[500],
//     cursor: "pointer",
//     color: "#fff", // ensure white text
//     fontWeight: "bold",
//     fontSize: "1rem"
//   }}
//   onClick={handleUserClick}
// >
//   {auth.user.firstName[0]?.toUpperCase()}
// </Avatar>


//                     <Menu
//                       anchorEl={anchorEl}
//                       open={openUserMenu}
//                       onClose={handleCloseUserMenu}
//                     >
//                       <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
//                       <MenuItem onClick={handleMyOrderClick}>My Orders</MenuItem>
//                       <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                     </Menu>
//                   </>
//                 ) : (
//                   <Button onClick={handleOpen}>Signin</Button>
//                 )}
//               </div>

//               <div className="flex lg:ml-6">
//                 <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
//               </div>

//               <div className="ml-4 flow-root lg:ml-6">
//                 <Button
//                   onClick={() => navigate("/cart")}
//                   className="group -m-2 flex items-center p-2"
//                 >
//                   <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
//                   <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
//                     {cart.cart?.totalItem || 0}
//                   </span>
//                   <span className="sr-only">items in cart</span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <AuthModal handleClose={handleClose} open={openAuthModal} />
//     </div>
//     </>

//   );
// }




import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings'; // Ensure SettingsIcon is imported
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigation } from "../../../config/navigationMenu";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../Redux/Auth/Action";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import SearchBar from "../SearchBar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  // State to control rotation for the icon
  const [isRotating, setIsRotating] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    if (auth.user) handleClose();
    if (
      auth.user?.role !== "ADMIN" &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(-1);
    }
  }, [auth.user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const otpId = params.get("otp_id");
    if (otpId) setOpenAuthModal(true);
  }, [location]);

  const handleOpen = () => setOpenAuthModal(true);
  const handleClose = () => setOpenAuthModal(false);
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
    // Trigger rotation when the menu opens
    setIsRotating(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
    // Stop rotation when the menu closes
    setIsRotating(false);
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
  };
  const handleMyOrderClick = () => {
    navigate("/account/order");
    handleCloseUserMenu();
  };
  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  return (
    <>
      {/* User Info - Mobile */}
      {!open && (
        <div className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 pt-2">
            {auth.user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      cursor: "pointer",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {auth.user.firstName[0]?.toUpperCase()}
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Hello, {auth.user.firstName}
                    </p>
                    <p className="text-xs text-gray-500">Welcome back</p>
                  </div>
                </div>
                <IconButton
                  size="small"
                  onClick={handleUserClick}
                  sx={{
                    transition: 'transform 0.3s ease-in-out', // Smooth transition for the transform property
                    transform: isRotating ? 'rotate(30deg)' : 'rotate(0deg)', // Rotate 30 degrees when isRotating is true
                  }}
                >
                  <SettingsIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                      mt: 1.5,
                      borderRadius: '12px',
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                      minWidth: 150,
                      padding: '8px 0',
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMyOrderClick();
                      handleCloseUserMenu();
                      setOpen(false);
                    }}
                    sx={{
                      py: 1.2,
                      px: 2,
                      '&:hover': {
                        backgroundColor: deepPurple[50],
                        color: deepPurple[600],
                      },
                    }}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleCloseUserMenu();
                      setOpen(false);
                    }}
                    sx={{
                      py: 1.2,
                      px: 2,
                      '&:hover': {
                        backgroundColor: deepPurple[50],
                        color: deepPurple[600],
                      },
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      color: "white",
                      width: 40,
                      height: 40,
                    }}
                    onClick={handleOpen}
                    className="cursor-pointer"
                  >
                    ?
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Guest</p>
                    <p className="text-xs text-gray-500">Tap to Sign in</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <SearchBar className="" />

      <div className="bg-white pb-10 z-500">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex justify-between items-center px-4 pt-5 pb-2 border-b border-gray-200">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <Tab.Group as="div">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "text-gray-900",
                              "flex-1 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>

                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel
                          key={category.name}
                          className="space-y-6 px-4 py-6"
                        >
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p className="text-sm font-semibold text-gray-700">
                                {section.name}
                              </p>
                              <ul className="mt-2 space-y-2">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <button
                                      onClick={() =>
                                        handleCategoryClick(
                                          category,
                                          section,
                                          item,
                                          () => setOpen(false)
                                        )
                                      }
                                      className="block w-full text-left text-gray-600 hover:text-gray-900 text-sm"
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <nav className="mx-auto border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <Link to="/" className="ml-4 flex lg:ml-0">
                <img
                  src="./favicon.ico"
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
              </Link>

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "text-gray-700 hover:text-gray-800",
                                "border-b-2 pt-px text-sm font-medium"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm">
                              <div className="absolute inset-0 top-1/2 bg-white shadow" />
                              <div className="relative bg-white px-8 py-16">
                                <div className="grid grid-cols-2 gap-10">
                                  <div className="grid grid-cols-3 gap-8 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p className="font-medium text-gray-900">
                                          {section.name}
                                        </p>
                                        <ul className="mt-4 space-y-4">
                                          {section.items.map((item) => (
                                            <li key={item.name}>
                                              <p
                                                onClick={() =>
                                                  handleCategoryClick(
                                                    category,
                                                    section,
                                                    item,
                                                    close
                                                  )
                                                }
                                                className="cursor-pointer hover:text-gray-800"
                                              >
                                                {item.name}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="grid grid-cols-2 gap-8">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group text-base">
                                        <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                          <img
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                          {item.name}
                                        </a>
                                        <p className="mt-1">Shop now</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex items-center space-x-6">
                  {auth.user ? (
                    <>
                      <p className="text-sm font-semibold text-gray-700">
                        Hello, {auth.user.firstName}
                      </p>
                      <Avatar
                        sx={{
                          bgcolor: deepPurple[500],
                          cursor: "pointer",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "1rem"
                        }}
                        onClick={handleUserClick}
                      >
                        {auth.user.firstName[0]?.toUpperCase()}
                      </Avatar>


                      <Menu
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                            mt: 1.5,
                            borderRadius: '12px',
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                            minWidth: 150,
                            padding: '8px 0',
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem
                          onClick={handleCloseUserMenu}
                          sx={{
                            py: 1.2,
                            px: 2,
                            '&:hover': {
                              backgroundColor: deepPurple[50],
                              color: deepPurple[600],
                            },
                          }}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={handleMyOrderClick}
                          sx={{
                            py: 1.2,
                            px: 2,
                            '&:hover': {
                              backgroundColor: deepPurple[50],
                              color: deepPurple[600],
                            },
                          }}
                        >
                          My Orders
                        </MenuItem>
                        <MenuItem
                          onClick={handleLogout}
                          sx={{
                            py: 1.2,
                            px: 2,
                            '&:hover': {
                              backgroundColor: deepPurple[50],
                              color: deepPurple[600],
                            },
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Button onClick={handleOpen}>Signin</Button>
                  )}
                </div>

                <div className="flex lg:ml-6">
                  {/* For desktop, you could also make the search icon rotate if desired */}
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  <Button
                    onClick={() => navigate("/cart")}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.cart?.totalItem || 0}
                    </span>
                    <span className="sr-only">items in cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <AuthModal handleClose={handleClose} open={openAuthModal} />
      </div>
    </>
  );
}