function testOS(name) {
  return new RegExp('^' + name).test(process.platform);
}

const NW_VERSION = '0.9.2';
const NW_OPTIONS = {
  version: NW_VERSION,
  build_dir: './',
  mac: testOS('darwin'),
  win: testOS('win'),
  linux32: testOS('linux'),
  linux64: testOS('linux64'),
  keep_nw: false,
  zip: false
};

module.exports = {
  options: NW_OPTIONS,
  src: [
    '<%= paths.root %>/build/*',
    '<%= paths.root %>/build/**/*'
  ]
};
