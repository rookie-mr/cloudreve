import { LinearProgress, linearProgressClasses, Skeleton, styled, Typography } from "@mui/material";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import { updateUserCapacity } from "../../../redux/thunks/filemanager.ts";
import { sizeToString } from "../../../util";
import { RadiusFrame } from "../RadiusFrame.tsx";

const StyledBox = styled(RadiusFrame)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 2),
  margin: theme.spacing(2, 2, 0, 2),
  background: 'transparent'
}));

const StorageHeaderContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const BorderLinearProgress = styled(LinearProgress)<{ warning: boolean }>(({ theme, warning }) => ({
  height: 6,
  borderRadius: 6,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(40,40,255,.1)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 6,
    backgroundColor: warning ? theme.palette.warning.main : theme.palette.primary.main,
  },
  marginTop: theme.spacing(1),
}));

const StorageSummary = memo(() => {
  const { t } = useTranslation("application");
  const dispatch = useAppDispatch();
  const capacity = useAppSelector((state) => state.fileManager[0].capacity);
  useEffect(() => {
    if (!capacity) {
      dispatch(updateUserCapacity(0));
      return;
    }
  }, [capacity]);
  return (
    <StyledBox>
      <StorageHeaderContainer>
        <Typography variant={"subtitle2"}>{t("application:navbar.storage")}</Typography>
      </StorageHeaderContainer>
      {capacity && (
        <BorderLinearProgress
          warning={capacity.used > capacity.total}
          variant="determinate"
          value={Math.min(100, (capacity.used / capacity.total) * 100)}
        />
      )}
      {!capacity && <Skeleton sx={{ mt: 1, height: 8 }} variant="rounded" />}
      <Typography variant={"caption"} color={"text.secondary"} fontWeight={600}>
        {capacity ? (
          `${sizeToString(capacity.used)} / ${sizeToString(capacity.total)}`
        ) : (
          <Skeleton sx={{ width: "50%" }} variant="text" />
        )}
      </Typography>
    </StyledBox>
  );
});

export default StorageSummary;
