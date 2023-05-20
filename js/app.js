import Country from "./countryClass.js";
import { declareViewEvents } from "./eventsView.js";
import Single_Cuntry from "./single_countryClass.js";
import { declareBtns } from "./eventsView.js";
let country_arr = [];


const init = () => {
    doApi('all');
    declareBtns();

}
const doApi = async (_search) => {
    //loader
    setTimeout(() => {
        showLoading();
        setInterval(hideLoading, 1500);
    }, 0);
    //fetch all countrues
    let url = `https://restcountries.com/v3.1/${_search}`
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
    country_arr = data;
    declareViewEvents(data, createAllCountries, createSingleCountryByName);
    createAllCountries(data);
}
export const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";

}
export const hideLoading = () => {

    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";// after timeout show im
}
export const createAllCountries = (data) => {
    document.querySelector("#id_row").innerHTML = "";
    document.querySelector("#id_select").style.display = "";
    data.forEach(element => {
        let country = new Country("#id_row", element);
        country.render(data);
    });
}
export const createSingleCountryByName = async (_country_name) => {
    let country = country_arr.filter(item => item.name.common === _country_name);
    document.querySelector("#id_row").innerHTML = "";
    document.querySelector("#id_parent").innerHTML = "";
    let new_country = new Single_Cuntry("#id_parent", country[0]);
    new_country.render(country_arr);
}
init();
