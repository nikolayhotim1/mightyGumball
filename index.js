'use strict';
let lastReportTime = 0;

window.onload = function () {
    setInterval(handleRefresh, 3000);
};

function handleRefresh() {
    let url = `http://gumball.wickedlysmart.com?callback=updateSales&lastreporttime=${lastReportTime}&random=${(new Date()).getTime()}`;
    let newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('src', url);
    newScriptElement.setAttribute('id', 'jsonp');

    let oldScriptElement = document.getElementById('jsonp');
    let head = document.getElementsByTagName('head')[0];

    if (oldScriptElement === null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}

function updateSales(sales) {
    let salesDiv = document.getElementById('sales');

    for (let i = 0; i < sales.length; i++) {
        let sale = sales[i];
        let div = document.createElement('div');
        div.setAttribute('class', 'saleItem');
        div.innerHTML = `${sale.name} sold ${sale.sales} gumballs`;
        salesDiv.appendChild(div);
    }

    if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
    }
}