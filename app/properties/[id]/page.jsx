"use client";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

const PorpertyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const name = searchParams.get("name");
  const pathname = usePathname();

  return (
    <div>
      <button onClick={() => router.push("/")} className="bg-blue-500 p-2">
        Go Home {pathname}
      </button>
    </div>
  );
};

export default PorpertyPage;
