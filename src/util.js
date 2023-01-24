export const checkImage = (imageSrc, good, bad, isSafe) => {
  var img = new Image();
  img.onload = good;
  img.onerror = bad;
  img.src = imageSrc;
};
