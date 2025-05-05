import { ReactNode } from "react";

declare module "@material-tailwind/react" {
  export interface TypographyProps {
    variant?: string;
    color?: string;
    className?: string;
    children: ReactNode;
  }

  export interface CardProps {
    className?: string;
    children: ReactNode;
  }

  export interface CardBodyProps {
    children: ReactNode;
  }

  export interface RadioProps {
    name?: string;
    value?: string;
    label?: ReactNode;
    onClick?: () => void;
  }

  export interface InputProps {
    type?: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }

  export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    className?: string;
    children: ReactNode;
    onClick?: () => void;
    variant?: string;
  }

  export interface CheckboxProps {
    label?: ReactNode;
    containerProps?: {
      className?: string;
    };
  }

  export interface TabsProps {
    value: string;
    className?: string;
    children: ReactNode;
  }

  export interface TabsHeaderProps {
    className?: string;
    indicatorProps?: {
      className?: string;
    };
    children: ReactNode;
  }

  export interface TabProps {
    value: string;
    onClick?: () => void;
    className?: string;
    children: ReactNode;
  }

  export interface TabsBodyProps {
    children: ReactNode;
  }

  export interface TabPanelProps {
    value: string;
    children: ReactNode;
  }

  export const Typography: React.FC<TypographyProps>;
  export const Card: React.FC<CardProps>;
  export const CardBody: React.FC<CardBodyProps>;
  export const Radio: React.FC<RadioProps>;
  export const Input: React.FC<InputProps>;
  export const Button: React.FC<ButtonProps>;
  export const Checkbox: React.FC<CheckboxProps>;
  export const Tabs: React.FC<TabsProps>;
  export const TabsHeader: React.FC<TabsHeaderProps>;
  export const Tab: React.FC<TabProps>;
  export const TabsBody: React.FC<TabsBodyProps>;
  export const TabPanel: React.FC<TabPanelProps>;
}
