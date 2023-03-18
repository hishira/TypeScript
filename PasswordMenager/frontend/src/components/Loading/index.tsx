type LoadingProps = {
  loading: boolean;
  ComponentToLoad: JSX.Element;
};

export const Loading = ({ loading, ComponentToLoad }: LoadingProps) => {
  return loading ? <div /> : ComponentToLoad;
};
