import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/page/0");
  }, [router]);

  return null;
};

export default Index;
