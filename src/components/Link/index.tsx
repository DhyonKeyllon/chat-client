import { AnchorHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

import { Link } from "./styles";

type LinkProps = {
  height?: string;
  width?: string;
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> &
  PropsWithChildren;

const LinkComponent = (props: LinkProps) => {
  const { height, width, children } = props;

  return (
    <Link $height={height} $width={width} {...props}>
      {children}
    </Link>
  );
};

export default LinkComponent;
