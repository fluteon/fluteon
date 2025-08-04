import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchHomepageCategoryProducts } from "../Redux/Customers/Product/Action";
import { CircularProgress, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import FluteonLoader from "./FluteonLoader";

const categoriesToFetch = [
  {
    name: "formal_pants",
    label: "Formal Pants",
    path: "/women/bottom_wear/formal_pants",
  },
  {
    name: "blazer",
    label: "Blazers",
    path: "/women/blazers/blazer",
  },
  {
    name: "satin_shirts",
    label: "Satin Shirts",
    path: "/women/shirts/satin_shirts",
  },
];


const Homepage = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showIntroLoader, setShowIntroLoader] = useState(true); // loader state

  useEffect(() => {
    // 1. Show logo loader for 2 seconds
    const introTimer = setTimeout(() => {
      setShowIntroLoader(false); // hide loader after 2s
      fetchData(); // fetch data after loader ends
    }, 2000);

    return () => clearTimeout(introTimer);
  }, []);

 const [dataReady, setDataReady] = useState(false);

useEffect(() => {
  const introTimer = setTimeout(() => setShowIntroLoader(false), 2000);
  fetchData();
  return () => clearTimeout(introTimer);
}, []);

const fetchData = async () => {
  try {
    const promises = categoriesToFetch.map((category) =>
      dispatch(fetchHomepageCategoryProducts({
        category: category.name,
        pageNumber: 1,
        pageSize: 10,
      }))
    );

    const results = await Promise.all(promises);
    const allCategoryData = {};
    categoriesToFetch.forEach((category, i) => {
      allCategoryData[category.name] = results[i]?.content || [];
    });

    setCategoryData(allCategoryData);
    setLoading(false);
    setDataReady(true); // ✅ data fetched
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }
};

// ✅ Final render
if (showIntroLoader || !dataReady) {
  return <FluteonLoader />;
}
  return (
    <div>
<Helmet>
  <title>Fluteon | Premium Women's Fashion</title>
  <link rel="canonical" href="https://www.fluteon.com/" />
  <meta name="description" content="Fluteon brings you premium-quality formal wear for women – discover curated pants, satin shirts, and blazers designed for modern Indian women. Shop now!" />
  <meta name="keywords" content="Fluteon, women's fashion India, formal wear women, satin shirts, blazers, office wear, trendy pants, modern Indian fashion" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph */}
  <meta property="og:title" content="Fluteon | Premium Women's Fashion" />
  <meta property="og:description" content="Explore handpicked fashion pieces for modern women – only at Fluteon. Free shipping across India." />
  <meta property="og:image" content="https://www.fluteon.com/assets/images/fluteon-logo.png" />
  <meta property="og:url" content="https://www.fluteon.com/" />
  <meta property="og:type" content="website" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": "https://www.fluteon.com/#organization",
      "name": "Fluteon",
      "url": "https://www.fluteon.com/",
      "logo": "https://www.fluteon.com/assets/images/fluteon-logo.png",
      "sameAs": [
        "https://www.instagram.com/fluteostore",
        "https://www.facebook.com/fluteostore"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "Customer Service"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.fluteon.com/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })}
  </script>
</Helmet>



      <HomeCarousel images={homeCarouselData} />
      <div className="space-y-10">
        {categoriesToFetch.map((cat) => (
    <HomeProductSection
  key={cat.name}
  section={cat.label}
  data={categoryData[cat.name]}
  categoryPath={cat.path}
/>

        ))}
      </div>
    </div>
  );
};

export default Homepage;
