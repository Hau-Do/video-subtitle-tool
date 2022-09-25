const getAll: () => Promise<any> = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          times: [3, 5],
          text: 'asdadad',
        },
      ]);
    }, 1000);
  });
};

const SubtitleAPI = {
  getAll,
};

export default SubtitleAPI;
