import { Button } from "@strapi/design-system";
import { useFetchClient } from "@strapi/strapi/admin";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { get } = useFetchClient();
  const [items, setItems] = useState<any[]>([]);

  const handleGetData = async () => {
    try {
      const { data } = await get("/api/papers");
      setItems(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button size="XS" onClick={handleGetData}>
        Get Data
      </Button>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
