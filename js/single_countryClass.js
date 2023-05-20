import {createSingleCountryByName } from "./app.js";
export default class Single_Cuntry {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.name = _item.name.common;
    this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()} M`;
    this.flag = _item.flags.png;
    this.region = _item.region;
    this.languages = _item.languages ? Object.values(_item.languages).join() : "no information";
    this.coin = _item.currencies ? Object.keys(_item.currencies) : "no information";
    this.capital = _item.capital ? _item.capital[0] : "no information";
    this.map = _item.latlng;
    this.borders = _item.borders;
  }
  render() {
    document.querySelector("#id_select").style.display = "none";
    document.querySelector("#title").style.display = "none";
    console.log(this.borders)
    let div = document.createElement("div");
    div.className = "my-4 border-3";
    document.querySelector(this.parent).innerHTML = "";
    document.querySelector(this.parent).append(div);
    div.innerHTML = ` 
    <div class="container mt-5 shadow d-flex flex-column">
      <img class="myImg" src="${this.flag}" alt="my img">
      <div class="info row my-2">
      <div class="col-lg-6">
      <button id="back_btn" class="btn p-2 mb-2 col-lg-3 p-1"><i class="fa fa-home" aria-hidden="true"></i>
       Back</button>
          <h5 class="textColor">More About ${this.name}:</h5>
          <p>Population: ${this.pop}</p>
          <p>Region: ${this.region}</p>
          <p>Languages: ${this.languages}</p>
          <p>Coins: ${this.coin}</p>
          <p>Capital: ${this.capital}</p>
          <p>Borders with:</p>
          <div class="borders_div"></div>
          </div>
          <iframe class="mt-3 col-lg-6" height="300px" src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
          </div>
      </div>`
      this.getFullBordersNames(div);
    let back_btn = div.querySelector("#back_btn");
    back_btn.addEventListener("click", () => {
      document.querySelector("#id_parent").innerHTML = "";
      window.open("../index.html","_self");
    });
  }
  getFullBordersNames(div) {
    let borders_div = div.querySelector(".borders_div");
    if (this.borders) {
      let i = 0;
      this.borders.forEach(async (item) => {
        console.log(item);
        let fullNmae = await getNameByCode(item);
        let a = document.createElement("a");
        if (i === this.borders.length - 1) {
          a.innerHTML = fullNmae + ".";
        }
        else {
          a.innerHTML = fullNmae + ", ";
        }
        i++;
        a.style = "color: #107793; cursor: pointer; ";
        borders_div.append(a);
        console.log(this.borders.length)
        a.addEventListener("click", () => {
          createSingleCountryByName(fullNmae);
        });
      });
    } else { borders_div.innerHTML += "There are no borders." }
  }
}
const getNameByCode = async (code) => {
  let url = `https://restcountries.com/v3.1/alpha/${code}`;
  let resp = await fetch(url);
  let data = await resp.json();
  return data[0].name.common;
}