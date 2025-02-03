import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";

const bookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session) {
      // Check if the property is bookmarked by the user
      // If it is bookmarked, set isBookmarked to true
      // If it is not bookmarked, set isBookmarked to false
      setLoading(false);
    }
  }, [session]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }
    try {
      const rest = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (rest.status === 200) {
        const data = await rest.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default bookmarkButton;
