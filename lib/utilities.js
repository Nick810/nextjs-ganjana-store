export const getWindowWidth = () => {
  if (typeof window !== "undefined") return window.innerWidth;
}

export const onResize = (entries) => {
  const { width } =  entries[0].contentRect;
  if (width >= 1024) {
    return setLarge(true)
  }
  return setLarge(false)
}