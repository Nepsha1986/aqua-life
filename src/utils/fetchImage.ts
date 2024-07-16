const fetchImage = async (name: string) => {
  // TODO: Review and research better approach
  try {
    // @ts-ignore
    let img = await import(`handbook-freshwater-fish/assets/${name}.webp`);

    return JSON.parse(JSON.stringify(img));
  } catch (e) {
    // @ts-ignore
    let img = await import(`handbook-freshwater-fish/assets/angelfish.webp`);
    console.log(`Can not find ${name} in assets folder`);
    return JSON.parse(JSON.stringify(img));
  }
};

export default fetchImage;
