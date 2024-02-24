import { useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store"; // Assuming store is already initialized

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeref = useRef(store); // useRef receives the store directly, not a function call
  return <Provider store={storeref.current}>{children}</Provider>;
}