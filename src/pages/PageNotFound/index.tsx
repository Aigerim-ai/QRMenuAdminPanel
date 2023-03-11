import { useOutletContext } from "react-router";

export default function PageNotFound() {
  const lg: string = useOutletContext();
  return <h1>not found</h1>
}
