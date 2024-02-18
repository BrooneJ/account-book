const truncateString = (str: string) => {
  if (str.length > 10) {
    return str.substring(0, 8) + "...";
  } else {
    return str;
  }
};

export { truncateString };
