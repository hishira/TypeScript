import { Loader } from "./component.styled";

type LoadingProps = {
  loading: boolean;
  ComponentToLoad: JSX.Element;
  size?: "small" | "medium" | "large";
};

export const Loading = ({
  loading,
  ComponentToLoad,
  size = "medium",
}: LoadingProps) => {
  return loading ? <Loader size={size} /> : ComponentToLoad;
};
