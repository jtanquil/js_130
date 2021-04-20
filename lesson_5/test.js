function startCounting() {
  let count = 1;
  let counterId = setInterval(() => {
    console.log(count);
    count += 1;
  }, 1000);

  return counterId;
}

function stopCounting(counterId) {
  clearInterval(counterId);
}

let counterId = startCounting();

setTimeout(stopCounting, 10000, counterId);