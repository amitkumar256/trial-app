const nextConfig = {
  reactStrictMode: true,
};

if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  const additionalPath = `${process.env.PWD}/node_modules/canvas/build/Release`;
  process.env.LD_LIBRARY_PATH = [
    additionalPath,
    process.env.LD_LIBRARY_PATH || '',
  ].join(':');
}

module.exports = nextConfig;
