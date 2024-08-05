const fetchImage = async (name: string) => {
  // TODO: Review and research better approach
  try {
    // @ts-ignore
    let img = await import(
      `handbook-freshwater-fish/content/${name}/_img.webp`
    );

    return JSON.parse(JSON.stringify(img));
  } catch (e) {
    return null;
  }
};

export default fetchImage;
