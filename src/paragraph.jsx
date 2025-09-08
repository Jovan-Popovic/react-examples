import { useEffect } from "react";

export function Paragraph() {
  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);

  return (
    <p>
      Edit <code>src/App.jsx</code> and save to test HMR
    </p>
  );
}
