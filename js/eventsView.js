export const declareViewEvents = (country_arr, createAllCountries, createSingleCountryByName) => {
    let search_input = document.querySelector("#id_search");
    let glass_icon = document.querySelector("#id_glass");
    let header_countries = document.querySelectorAll(".nav li a");
    //navbar events
    header_countries.forEach(item => {
        item.addEventListener("click", () => {
            createSingleCountryByName(item.innerHTML);
        })
    });
    // search on glass image click
    glass_icon.addEventListener("click", () => {
        document.querySelector("#id_parent").innerHTML = "";
        let arr = country_arr.filter((item) =>
            item.name.common.toLowerCase().includes(search_input.value.toLowerCase())
        );
        if (arr.length > 0) {
            createAllCountries(arr);
        } else {
            document.querySelector("#id_row").innerHTML = `<h2 class="display-2 text-danger" style:"color:red;">Country ${search_input.value} is  not found </h2>`;
        }
    });
    //search on keyboard click 
    search_input.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            document.querySelector("#id_parent").innerHTML = "";
            let arr = country_arr.filter((item) =>
                item.name.common.toLowerCase().includes(search_input.value.toLowerCase())
            );
            if (arr.length > 0) {
                createAllCountries(arr);
            }
            else {
                document.querySelector("#id_row").innerHTML = `<h2>Country ${search_input.value} is  not found </h2>`;
            }
        }
    });
    //sort countries by name or population
    let select = document.querySelector("#id_select");
    let sorted_ar;
    select.addEventListener("change", () => {
        let select_val = select.value;
        if (select_val == "population-decreasing") {
            sorted_ar = _.sortBy(country_arr, "population");
            sorted_ar = _.reverse(sorted_ar);
            console.log(sorted_ar);
        }
        else {
            sorted_ar = _.sortBy(country_arr, select_val);
        }
        createAllCountries(sorted_ar)
    })
}

//burger control
export const declareBtns = () => {
    let burger_btn = document.querySelector("#burger_btn");
    let nav_open = document.querySelector("#nav_open");
    burger_btn.addEventListener("click", function () {
        (nav_open.style.display != "block") ? nav_open.style.display = "block" : nav_open.style.display = "none";
    })
}
