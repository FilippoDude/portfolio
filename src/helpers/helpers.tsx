import { PlatformType } from "@/app/game/hooks/gameContext";

export function assignRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && "current" in ref) {
    (ref as React.RefObject<T>).current = value;
  }
}

export function getActualPlatformX(platform: PlatformType): number{
  return platform.x + platform.additionalGap
}