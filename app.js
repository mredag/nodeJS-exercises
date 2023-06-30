function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
  
  async function getResults() {
    try {
      const result1 = await luckyDraw('Emre');
      console.log(result1);
    } catch (error) {
      console.error(error.message);
    }
  
    try {
      const result2 = await luckyDraw('Huseyin Omer');
      console.log(result2);
    } catch (error) {
      console.error(error.message);
    }
  
    try {
      const result3 = await luckyDraw('Doriana');
      console.log(result3);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  getResults();
  