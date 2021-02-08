window.addEventListener("load", function (e) {
  const searchURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=AWD1IGDUXIUO1HCW&symbol=";

  async function getData(stockSymbol) {
    let url = searchURL + stockSymbol;
    const req = await fetch(url);
    const result = await req.json();
    return result;
  }

  document.forms.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const stockData = getData(e.currentTarget.elements.searchField.value);
    stockData.then((res) => {
      if (res["Global Quote"]["01. symbol"] === undefined) {
        const errorMsg = `<h2 class="alert alert-danger">No data available for search symbol.</h2>`;
        document.querySelector(".results").innerHTML = errorMsg;
      } else {
        const stockView = `
           <div class="card">
              <div class="card-body">
                  <p>Stock Symbol: ${res["Global Quote"]["01. symbol"]}</p>
                  <p>Stock Price: ${res["Global Quote"]["05. price"]}</p>
                  <p>Date: ${res["Global Quote"]["07. latest trading day"]}</p>
                  <p>High: ${res["Global Quote"]["03. high"]}</p>
                  <p>Low: ${res["Global Quote"]["04. low"]}</p>
                  <p>Volume: ${res["Global Quote"]["06. volume"]}</p>
              </div>
            </div>
              `;
        document.querySelector(".results").innerHTML = stockView;
      }
    });
  });
});
