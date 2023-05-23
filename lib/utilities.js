export const onResize = (entries) => {
  const { width } =  entries[0].contentRect;
  if (width >= 1024) {
    return setLarge(true)
  }
  return setLarge(false)
}

export const fullWidthHeight = {
  width: '100vw !important',
  height: '100vh !important'
}