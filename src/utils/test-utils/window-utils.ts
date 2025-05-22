export const resizeWindow = (width: number, height = window.innerHeight) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};
