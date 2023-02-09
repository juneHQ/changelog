import { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/page/0");
  }, [router]);

  return null;
};
export default Index;
