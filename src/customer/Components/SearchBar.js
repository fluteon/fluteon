// import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { CircularProgress, InputAdornment, TextField, Box } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { searchProducts } from "../../../src/Redux/Customers/Product/Action";
// import { Snackbar, Alert } from "@mui/material";


// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const words = ["Formal pPants", "Cotton Pants", "Linen Pants", "Cargo", "Track Pants", "Jeans", "Formal Shirts", "Satin Shirts", "Hidden Button Shirts", "Tanik Tops", "Tank Tops", "Peplum Tops", "Crop Top", "Office Wear Kurti", "A-Line Kurtis", "Kalamkari"];
//   const [typingText, setTypingText] = useState("");
//   const [wordIndex, setWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [isUserTyping, setIsUserTyping] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
// const [snackbarMessage, setSnackbarMessage] = useState("");
// const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // "success" | "error" | "info"


//   // Inject blink animation
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @keyframes blink {
//         0%, 100% { opacity: 1; }
//         50% { opacity: 0; }
//       }
//       .blinking-cursor {
//         display: inline;
//         animation: blink 1s step-end infinite;
//         font-weight: bold;
//         margin-left: 2px;
//       }
//     `;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   // Typing animation logic
//   useEffect(() => {
//     if (isUserTyping) return;

//     const currentWord = words[wordIndex];
//     const speed = isDeleting ? 50 : 120;

//     const timeout = setTimeout(() => {
//       const updatedText = isDeleting
//         ? currentWord.substring(0, typingText.length - 1)
//         : currentWord.substring(0, typingText.length + 1);

//       setTypingText(updatedText);

//       if (!isDeleting && updatedText === currentWord) {
//         setTimeout(() => setIsDeleting(true), 800);
//       } else if (isDeleting && updatedText === "") {
//         setIsDeleting(false);
//         setWordIndex((prev) => (prev + 1) % words.length);
//       }
//     }, speed);

//     return () => clearTimeout(timeout);
//   }, [typingText, isDeleting, wordIndex, isUserTyping]);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setUserInput(value);
//     setIsUserTyping(value !== "");
//   };

//   // const handleKeyDown = async (e) => {
//   //   if (e.key === "Enter" && userInput.trim() !== "") {
//   //     setLoading(true);
//   //     try {
//   //       const results = await dispatch(searchProducts(userInput.trim()));
//   //       setLoading(false);

//   //       if (results.length > 0) {
//   //         const product = results[0];
//   //         const third = product.category;
//   //         const second = third?.parentCategory;
//   //         const first = second?.parentCategory;

//   //         if (first && second && third) {
//   //           navigate(
//   //             `/${first.name.toLowerCase()}/${second.name.toLowerCase()}/${third.name.toLowerCase()}`
//   //           );
//   //         }
//   //       } else {
//   //         alert("No data available for this query.");
//   //       }
//   //     } catch (error) {
//   //       console.error("Search failed:", error);
//   //       setLoading(false);
//   //     }
//   //   }
//   // };


//   const handleKeyDown = async (e) => {
//   if (e.key === "Enter" && userInput.trim() !== "") {
//     setLoading(true);

//     try {
//       const results = await dispatch(searchProducts(userInput.trim()));
//       setLoading(false);

//       if (results.length > 0) {
//         const product = results[0];
//         const third = product.category;
//         const second = third?.parentCategory;
//         const first = second?.parentCategory;

//         if (first && second && third) {
//           // ✅ Show success snackbar
//           setSnackbarMessage(`Showing results in ${third.name}`);
//           setSnackbarSeverity("success");
//           setSnackbarOpen(true);

//           navigate(
//             `/${first.name.toLowerCase()}/${second.name.toLowerCase()}/${third.name.toLowerCase()}`
//           );
//         }
//       } else {
//         // ❌ Show error snackbar
//         setSnackbarMessage("No data available for this query.");
//         setSnackbarSeverity("error");
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error("Search failed:", error);
//       setLoading(false);
//       setSnackbarMessage("Something went wrong while searching.");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   }
// };

//   return (
//     <>
// <Box position="relative">
//   <TextField
//     variant="outlined"
//     fullWidth
//     size="small"
//     value={userInput}
//     onChange={handleChange}
//     onKeyDown={handleKeyDown}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <SearchIcon className="text-gray-500" />
//         </InputAdornment>
//       ),
//       sx: {
//         backgroundColor: "#f9fafb",
//         borderRadius: 2,
//         "& .MuiOutlinedInput-notchedOutline": {
//           borderColor: "#d1d5db",
//         },
//         "&:hover .MuiOutlinedInput-notchedOutline": {
//           borderColor: "#d1d5db",
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//           borderColor: "#d1d5db",
//         },
//       },
//     }}
//     InputLabelProps={{ shrink: false }}
//   />

//   {/* Only show typing animation when user not typing */}
//   {!isUserTyping && (
//     <Box
//       position="absolute"
//       top="50%"
//       left="40px"
//       sx={{
//         transform: "translateY(-50%)",
//         pointerEvents: "none",
//         color: "#9ca3af",
//         fontSize: "0.875rem", // same as input
//       }}
//     >
//       <span>
//         Search here {typingText}
//         <span className="blinking-cursor">|</span>
//       </span>
//     </Box>
//   )}

//   {/* Snackbar for search result status */}
//   <Snackbar
//     open={snackbarOpen}
//     autoHideDuration={3000}
//     onClose={() => setSnackbarOpen(false)}
//     anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//   >
//     <Alert
//       onClose={() => setSnackbarOpen(false)}
//       severity={snackbarSeverity}
//       sx={{ width: "100%" }}
//     >
//       {snackbarMessage}
//     </Alert>
//   </Snackbar>

//   {/* Loader in center */}
//   {loading && (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60">
//       <CircularProgress />
//     </div>
//   )}
// </Box>


//       {/* Loader */}
//       {loading && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60">
//           <CircularProgress />
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchBar;





// import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { CircularProgress, InputAdornment, TextField, Box } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { searchProducts } from "../../../src/Redux/Customers/Product/Action";
// import { Snackbar, Alert } from "@mui/material";
// import { navigation } from "../../config/navigationMenu"; // Adjust import as per your project

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const words = ["Formal Pants", "Cotton Pants", "Linen Pants", "Cargo", "Track Pants", "Jeans", "Formal Shirts", "Satin Shirts", "Hidden Button Shirts", "Tanik Tops", "Tank Tops", "Peplum Tops", "Crop Tops", "Office Wear Kurti", "Kalamkari", "A-Line Kurtis"];
//   const [typingText, setTypingText] = useState("");
//   const [wordIndex, setWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [isUserTyping, setIsUserTyping] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("info");

//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @keyframes blink {
//         0%, 100% { opacity: 1; }
//         50% { opacity: 0; }
//       }
//       .blinking-cursor {
//         display: inline;
//         animation: blink 1s step-end infinite;
//         font-weight: bold;
//         margin-left: 2px;
//       }
//     `;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   useEffect(() => {
//     if (isUserTyping) return;

//     const currentWord = words[wordIndex];
//     const speed = isDeleting ? 50 : 120;

//     const timeout = setTimeout(() => {
//       const updatedText = isDeleting
//         ? currentWord.substring(0, typingText.length - 1)
//         : currentWord.substring(0, typingText.length + 1);

//       setTypingText(updatedText);

//       if (!isDeleting && updatedText === currentWord) {
//         setTimeout(() => setIsDeleting(true), 800);
//       } else if (isDeleting && updatedText === "") {
//         setIsDeleting(false);
//         setWordIndex((prev) => (prev + 1) % words.length);
//       }
//     }, speed);

//     return () => clearTimeout(timeout);
//   }, [typingText, isDeleting, wordIndex, isUserTyping]);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setUserInput(value);
//     setIsUserTyping(value !== "");
//   };

//   const normalize = (text) => {
//     return text.trim().toLowerCase().replace(/\s+/g, "_");
//   };

// const findPathFromNavigation = (normalizedInput) => {
//   for (const category of navigation.categories) {
//     for (const section of category.sections) {
//       const sectionNormalized = normalize(section.name);

//       // Match second-level section name first
//       if (sectionNormalized === normalizedInput) {
//         if (section.items.length > 0) {
//           // Return first item's correct path
//           const firstItem = section.items[0];
//           return `/${category.id}/${section.id}/${firstItem.id}`;
//         }
//       }

//       // Then look for third-level items inside the section
//       for (const item of section.items) {
//         const itemId = normalize(item.id);
//         const itemName = normalize(item.name);

//         if (
//           normalizedInput === itemId ||
//           normalizedInput === itemName ||
//           itemId.includes(normalizedInput) ||
//           itemName.includes(normalizedInput) ||
//           normalizedInput.includes(itemId) ||
//           normalizedInput.includes(itemName)
//         ) {
//           return `/${category.id}/${section.id}/${item.id}`;
//         }
//       }
//     }
//   }

//   return null;
// };


//   const handleKeyDown = async (e) => {
//     if (e.key === "Enter" && userInput.trim() !== "") {
//       setLoading(true);

//       const normalizedInput = normalize(userInput);
//       const foundPath = findPathFromNavigation(normalizedInput);

//       if (foundPath) {
//         setLoading(false);
//         navigate(foundPath);
//         setSnackbarSeverity("success");
//         setSnackbarMessage("Showing results for " + userInput);
//         setSnackbarOpen(true);
//       } else {
//         setLoading(false);
//         setSnackbarSeverity("warning");
//         setSnackbarMessage("No data available for this query.");
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   return (
//     <>
//       <Box position="relative">
//         <TextField
//           variant="outlined"
//           fullWidth
//           size="small"
//           value={userInput}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon className="text-gray-500" />
//               </InputAdornment>
//             ),
//             sx: {
//               backgroundColor: "#f9fafb",
//               borderRadius: 2,
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#d1d5db",
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#d1d5db",
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#d1d5db",
//               },
//             },
//           }}
//           InputLabelProps={{ shrink: false }}
//         />

//         {!isUserTyping && (
//           <Box
//             position="absolute"
//             top="50%"
//             left="40px"
//             sx={{
//               transform: "translateY(-50%)",
//               pointerEvents: "none",
//               color: "#9ca3af",
//               fontSize: "0.875rem",
//             }}
//           >
//             <span>
//               Search here {typingText}
//               <span className="blinking-cursor">|</span>
//             </span>
//           </Box>
//         )}

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={3000}
//           onClose={() => setSnackbarOpen(false)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert
//             onClose={() => setSnackbarOpen(false)}
//             severity={snackbarSeverity}
//             sx={{ width: "100%" }}
//           >
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>

//         {loading && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60">
//             <CircularProgress />
//           </div>
//         )}
//       </Box>
//     </>
//   );
// };

// export default SearchBar;



import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, InputAdornment, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../../src/Redux/Customers/Product/Action";
import { Snackbar, Alert } from "@mui/material";
import { navigation } from "../../config/navigationMenu"; // Adjust import as per your project

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const words = ["Formal Pants", "Cotton Pants", "Linen Pants", "Cargo", "Track Pants", "Jeans", "Formal Shirts", "Satin Shirts", "Hidden Button Shirts", "Tanik Tops", "Tank Tops", "Peplum Tops", "Crop Tops", "Office Wear Kurti", "Kalamkari", "A-Line Kurtis"];
  const [typingText, setTypingText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .blinking-cursor {
        display: inline;
        animation: blink 1s step-end infinite;
        font-weight: bold;
        margin-left: 2px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (isUserTyping) return;

    const currentWord = words[wordIndex];
    const speed = isDeleting ? 50 : 120;

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? currentWord.substring(0, typingText.length - 1)
        : currentWord.substring(0, typingText.length + 1);

      setTypingText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, wordIndex, isUserTyping]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setIsUserTyping(value !== "");
  };

  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\s+/g, "_");
  };

  const findPathFromNavigation = (normalizedInput) => {
    for (const category of navigation.categories) {
      for (const section of category.sections) {
        const sectionNormalized = normalize(section.name);

        if (sectionNormalized === normalizedInput || sectionNormalized.includes(normalizedInput) || normalizedInput.includes(sectionNormalized)) {
          if (section.items.length > 0) {
            return `/${category.id}/${section.id}`;
          }
        }

        for (const item of section.items) {
          const itemId = normalize(item.id);
          const itemName = normalize(item.name);

          if (
            normalizedInput === itemId ||
            itemId.includes(normalizedInput) ||
            normalizedInput.includes(itemId) ||
            itemName === normalizedInput ||
            itemName.includes(normalizedInput) ||
            normalizedInput.includes(itemName)
          ) {
            return item.href.replace(/{|}/g, "");
          }
        }
      }
    }
    return null;
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      setLoading(true);

      const normalizedInput = normalize(userInput);
      const foundPath = findPathFromNavigation(normalizedInput);

      if (foundPath) {
        setLoading(false);
        navigate(foundPath);
        setSnackbarSeverity("success");
        setSnackbarMessage("Showing results for " + userInput);
        setSnackbarOpen(true);
      } else {
        setLoading(false);
        setSnackbarSeverity("warning");
        setSnackbarMessage("No data available for this query.");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <Box position="relative">
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-500" />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: "#f9fafb",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
            },
          }}
          InputLabelProps={{ shrink: false }}
        />

        {!isUserTyping && (
          <Box
            position="absolute"
            top="50%"
            left="40px"
            sx={{
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#9ca3af",
              fontSize: "0.875rem",
            }}
          >
            <span>
              Search here {typingText}
              <span className="blinking-cursor">|</span>
            </span>
          </Box>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60">
            <CircularProgress />
          </div>
        )}
      </Box>
    </>
  );
};

export default SearchBar;

