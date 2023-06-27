import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("../components/Tests"), {
  ssr: false,
});

export default function TestsPage(props) {
  return <NoSSRComponent />;
}
