const ColorManager = {
    colors: ['red'],
  
    addColor(color = 'blue') {
      // Your code here
      this.colors.push(color);
    },
  
    listColors() {
      return this.colors;
    }
  };
  
  // Test:
  ColorManager.addColor();
  ColorManager.addColor('green');
  console.log(ColorManager.listColors()); // Should print: ['red', 'blue', 'green']