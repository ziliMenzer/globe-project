import Single_Cuntry from "./single_countryClass.js";
let defaultFlag = "./images/defFlag.png"
export default class Country {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.pop = Number(_item.population).toLocaleString();
        this.region = _item.region;
        this.flag = _item.flags.png ? _item.flags.png : defaultFlag;
    }
    render(data) {
        let myDiv = document.createElement("div");
        myDiv.className = "col-lg-3 col-sm-6 my-3";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML = `<div class="card"  data-aos="fade-up"
        data-aos-duration="2000" >
        <div class="content">
            <div class="front" style="background-image: url(${this.flag});">
                <h3 class="title">${this.name}</h3>
            </div>
            <div class="back">
                <p class="description">
                    Pop:${this.pop}
                    <br>
                    Region:${this.region}
                </p>
            </div>
        </div>
    </div>`
        myDiv.addEventListener("click", () => {
            document.querySelector("#id_row").innerHTML = "";
            let c = data.filter(element => element.name.common === this.name);
            let single_country = new Single_Cuntry("#id_parent", c[0]);
            single_country.render(data);
        })
    }
}