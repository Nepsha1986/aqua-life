const fetchImage = async (name: string) => {
  // TODO: Review and research better approach
  try {
    let img = await import(`../../posts/content/${name}/_img.webp`);

    return JSON.parse(JSON.stringify(img));
  } catch (e) {
    return null;
  }
};

export default fetchImage;
