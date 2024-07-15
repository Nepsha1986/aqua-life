const fetchImage = async (name) => {
  // TODO: Review and research better approach
  try {
    // @ts-ignore
    const img = await import(`handbook-freshwater-fish/assets/${name}.jpg`);
    return JSON.parse(JSON.stringify(img));
  } catch (e) {
    return new Error(`Can not find ${name} in assets folder`);
  }
};

export default fetchImage;
