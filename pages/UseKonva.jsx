import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("../components/NewTest"), {
  ssr: false,
});

export default function UseKonva(props) {
  return <NoSSRComponent />;
}
