import { Box, ButtonBase, darken, lighten, Palette, styled, Theme } from "@mui/material";
import * as React from "react";
import { NoWrapTypography } from "../../Common/StyledComponents.tsx";

const getStyle = (theme: Theme, active: boolean) => {
  if (theme.palette.mode == "light") {
    return {
      color: active ? `${theme.palette.primary.main} !important` : 'inherit',
      backgroundColor: active ? "#fff !important" : "inherit",
    }; 
  } else {
    return {
      color: active ? `${theme.palette.primary.main} !important` : "inherit",
      backgroundColor: active ? "#fff !important" : "inherit",
    };
  }
}

const StyledButtonBase = styled(ButtonBase)<{
  active?: boolean;
}>(({ theme, active }) => ({
  borderRadius: "6px",
  display: "flex",
  justifyContent: "left",
  alignItems: "initial",
  width: "100%",
  ...getStyle(theme, !!active)
}));

export interface SideNavItemBaseProps {
  active?: boolean;
  [key: string]: any;
}
export const SideNavItemBase = React.forwardRef(
  ({ active, ...rest }: SideNavItemBaseProps, ref: React.Ref<HTMLElement>) => {
    return <StyledButtonBase active={active} {...rest} ref={ref} />;
  },
);

const StyledSideNavItem = styled(SideNavItemBase)<{ level?: number }>(({ theme, level }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
  },
  padding: "4px",
  paddingLeft: `${28 + (level ?? 0) * 16}px`,
  height: "38px",
  display: "flex",
  alignItems: "center"
}));

export interface SideNavItemProps extends SideNavItemBaseProps {
  icon?: React.ReactNode;
  label?: string | React.ReactNode;
  level?: number;
  [key: string]: any;
}

const SideNavItem = React.forwardRef(
  ({ icon, label, level, sx, ...rest }: SideNavItemProps, ref: React.Ref<HTMLElement>) => {
    return (
      <StyledSideNavItem
        level={level}
        sx={{
          ...sx,
        }}
        {...rest}
        ref={ref}
      >
        <Box
          sx={{
            width: 20,
            mr: "14px",
          }}
        >
          {icon}
        </Box>
        <NoWrapTypography variant={"body2"}>{label}</NoWrapTypography>
      </StyledSideNavItem>
    );
  },
);

export default SideNavItem;
