// Script written by Arav Roy
console.log("Script initailised ...")

async function fetchCurrency(curr){
    try {
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${curr}`)
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        const data = await response.json(); 
        return data; 
        } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

async function convertCurrency(){
    const amount = Number(document.querySelector("#input").value);
    const fromCurrency = document.querySelector("#input-currency").value;
    const toCurrency = document.querySelector("#output-currency").value;

    if (!amount) {
        document.querySelector("#output").placeholder = "";
        return;
    }

    const data = await fetchCurrency(fromCurrency);

    const rate = data.rates[toCurrency];
    const result = amount / rate;

    document.querySelector("#output").placeholder = result.toFixed(2);
}

document.querySelector("#input-currency").addEventListener('change', async (e) => {
    convertCurrency();
});

document.querySelector("#output-currency").addEventListener('change', async (e) => {
    convertCurrency();
});

document.querySelector("#input-currency").addEventListener('focus', async (e) => {
    console.log("Input currency changed:", e.target.value);

    try{
        const data = await fetchCurrency(e.target.value);
        console.log(data);

        const dup_options = Object.keys(data.rates);
        const selectedOutput = document.querySelector("#output-currency").value;
        const options = dup_options.filter(
            item => item !== selectedOutput
        );

        console.log(options);

        options.forEach(item => {
            const option = document.createElement('option');
            option.value = item.valueOf(document.querySelector("#output-currency").value);
            option.textContent = item;

            document.querySelector("#input-currency").appendChild(option);
            convertCurrency();
    });

    } catch{
        console.error("Error fetching currency:", error);
    }
});

document.querySelector("#output-currency").addEventListener('focus', async (e) => {
    console.log("Input currency changed:", e.target.value);

    try{
        const data = await fetchCurrency(e.target.value);
        console.log(data);

        const dup_options = Object.keys(data.rates);
        const selectedOutput = document.querySelector("#input-currency").value;
        const options = dup_options.filter(
            item => item !== selectedOutput
        );

        options.forEach(item => {
            const option = document.createElement('option');
            option.value = item.valueOf();
            option.textContent = item;
            document.querySelector("#output-currency").appendChild(option);
            convertCurrency();
    });
    } catch{
        console.error("Error fetching currency:", error);
    }
});

document.querySelector("#input").addEventListener('input', () => {
    convertCurrency();
});