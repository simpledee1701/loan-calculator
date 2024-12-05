document.getElementById("loan-form").addEventListener("submit",function(e){
    document.querySelector(".loading-spinner").style.display = "block";
    document.getElementById("results").style.display = "none";
    setTimeout(calculate,2000);
    e.preventDefault();
});

function calculate(){
    const amount = document.getElementById("loan_amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthly = document.getElementById("monthly-pay");
    const tot_amount = document.getElementById("total-amt");
    const tot_int = document.getElementById("total-interest");

    const principle = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value)/100/12;
    const calculatePayment = parseFloat(years.value)*12;
    const x = Math.pow(1+calculateInterest,calculatePayment);
    const monthly_is = (principle*x*calculateInterest)/(x-1);

    if(isFinite(monthly_is)){
        monthly.value = monthly_is.toFixed(2);
        tot_amount.value = (monthly_is*calculatePayment).toFixed(2);
        tot_int.value = (monthly_is*calculatePayment - principle).toFixed(2);

        document.getElementById("results").style.display = "block";
        document.querySelector(".loading-spinner").style.display = "none";
    }
    else{
        showAlert("Please enter the values!!");
        document.querySelector(".loading-spinner").style.display = "none";
    }
    //e.preventDefault();
}

function showAlert(error){
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));
    const last = document.querySelector(".last");
    const calc = document.querySelector(".calc");
    last.insertBefore(errorDiv,calc);
    setTimeout(function(){
        document.querySelector(".alert").remove();
    },2000);
}