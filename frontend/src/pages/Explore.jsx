import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";

const Explore = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Shuffle the posts only once when the component mounts
    setShuffledPosts(shuffleArray(posts));
  }, [posts]);

  const groupByTags = (posts) => {
    const tagMap = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!tagMap[tag]) {
          tagMap[tag] = [];
        }
        tagMap[tag].push(post);
      });
    });
    return tagMap;
  };

  const [groupedTags, setGroupedTags] = useState(groupByTags(posts));

  useEffect(() => {
    setGroupedTags(groupByTags(posts));
  }, [posts]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen to-white p-8 w-11/12 mx-auto">
      {/* Main Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-diphylleia text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        Explore The Best Content
      </motion.h1>

      {/* Featured Posts Grid */}
      <section className="container mx-auto mb-16">
        <h2 className="text-3xl font-caveat text-center text-gray-800 mb-8">
          Featured Posts
        </h2>
        <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
        ease: "easeOut",
      },
    },
  }}
>
  {shuffledPosts.slice(0, 6).map((post, index) => (
    <motion.div
    key={index}
    className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:shadow-2xl"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    }}
    onClick={() => navigate(`/tags/${post.tags[0]}`)}
  >
    <motion.img
      src={post.images[0]?.url || "/placeholder.png"}
      alt={post.title}
      className="w-full h-60 object-cover rounded-lg group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h4 className="text-xl font-semibold">{post.title}</h4>
    </div>
    <div className="absolute top-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-sm font-light">#{post.tags[0]}</span>
    </div>
  </motion.div>
  
  ))}
</motion.div>


      </section>

      {/* Trending Tags Section */}
      <section className="container mx-auto mb-16">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Trending Tags
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {shuffleArray(Object.keys(groupedTags))
            .slice(0, 8)
            .map((tag, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group"
                onClick={() => navigate(`/tags/${tag}`)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <img
                  src={groupedTags[tag][0]?.images[0]?.url || "/placeholder.png"}
                  alt={tag}
                  className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-bold">{tag}</h4>
                  <p className="text-sm opacity-75">
                    {groupedTags[tag].length} posts
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Browse By Tags Section */}
      <section className="container mx-auto mb-16">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Browse by Tags
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {shuffleArray(Object.keys(groupedTags))
            .slice(0, 10)
            .map((tag, index) => (
              <motion.div
                key={index}
                className="relative group w-32 h-32 rounded-full overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/tags/${tag}`)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img
                  src={groupedTags[tag][0]?.images[0]?.url || "/placeholder.png"}
                  alt={tag}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tag}
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Floating Action Button (FAB) */}
      <motion.div
        className="fixed bottom-8 right-8 bg-blue-600 p-4 rounded-full shadow-xl text-white cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.2 }}
      >
        <i className="fas fa-arrow-up"></i>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Explore;
