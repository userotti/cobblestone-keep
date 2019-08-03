module.exports = function(api) {
  api.cache(true);
  return {
    "plugins": [
      [
        "module-resolver", {
          "alias": {

            "@components": "./src/components",
            "@ui": "./src/components/ui",
            "@three": "./src/components/three",
            
            
          },
        },
      ],
    ],
  };
};
