const typer = () => {
  const $typer = document.querySelector('.typer');
  
  const generateWords = (screenSize) => {
    const words = [];
    if (screenSize > 380) {
      if (screenSize > 400) {
        if (screenSize > 880) {
          words.push('Full-stack developer');
          words.push('Back-end developer');
        } else {
          words.push('Full-stack<br>developer');
          words.push('Back-end<br>developer');
        }
        words.push('Webdeveloper');
      } else {
        words.push('Full-stack<br>developer');
        words.push('Back-end<br>developer');
        words.push('<br>Webdeveloper');
      }
      words.push('Webdesigner');
    } else {
      words.push('Full-stack<br>developer');
      words.push('Back-end<br>developer');
      words.push('<br>Webdeveloper');
      words.push('<br>Webdesigner');
    }
    return words;
  };
  
  const screenSize = screen.width;
  const words = generateWords(screenSize);

  let letter = 1;
  let wordIndex = 0;
  let word = words[wordIndex];
  let string = '';

  const type = async () => {
    if (word[letter-1] === '<') {
      letter += 3;
    }
    if (letter <= word.length) {
      string = word.slice(0,letter);
      setTimeout(tick, 200);
    } else {
      letter = 0;
      wordIndex ++;
      
      if (! (wordIndex < words.length)) {
        wordIndex = 0;
      }
      word = words[wordIndex];
    }
    letter ++;

    $typer.innerHTML = string;
    setTimeout(type, 400);
  };

  const tick = async () => {
    string += ' |';
    $typer.innerHTML = string;
  };

  type();
};

export default typer;