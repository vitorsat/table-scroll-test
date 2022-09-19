import { TailSpin } from "react-loader-spinner";

export function Loader() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <TailSpin color="green" />
    </div>
  );
}
