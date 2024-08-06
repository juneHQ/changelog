import React from 'react';
import Link from 'next/link';
import { TextProps } from '@chakra-ui/react';

export interface DesktopNavItemProps {
  title: string;
  type: 'external-link' | 'internal-link';
  href?: string;
  isActive?: boolean;
  mode?: 'light' | 'dark';
}

export function DesktopNavItem(props: DesktopNavItemProps) {
  const Wrapper =
    props.type !== 'internal-link'
      ? React.Fragment
      : (linkProps: { children: React.ReactNode }) => (
          <Link href={props.href} passHref prefetch={false} {...linkProps} />
        );

  const staticColor = props.mode === 'dark' ? 'text-white' : 'text-purple-900';

  return (
    <Wrapper>
      {props.type === 'external-link' ? (
        <a
          className={`font-hero cursor-pointer text-[16px] ${
            props.isActive ? 'text-purple-500' : staticColor
          } font-bold leading-normal text-primary hover:underline underline-offset-[3px] active:text-purple-600`}
          href={props.href}
          rel="noreferrer noopener"
        >
          {props.title}
        </a>
      ) : (
        <div
          className={`font-hero cursor-pointer text-[16px] ${
            props.isActive ? 'text-purple-500' : staticColor
          } font-bold leading-normal text-primary hover:underline underline-offset-[3px]  active:text-purple-600`}
        >
          {props.title}
        </div>
      )}
    </Wrapper>
  );
}

export const desktopNavItemStyle: TextProps = {
  style: { textDecoration: 'none' },
  fontWeight: 'semibold',
  color: 'purple.900',
  textAlign: 'center',
  cursor: 'pointer',
  _hover: { color: 'purple.500' },
  _active: { color: 'purple.600' },
};
