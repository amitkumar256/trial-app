import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("../components/Test"), {
  ssr: false,
});

export default function UseKonva(props) {
  return <NoSSRComponent />;
}
