/*===========================================*/
/*         General Driver Functions          */
/*===========================================*/
function init_search() {
    const searchPage = new Search_Driver;
    searchPage.init();
}

function init_view_all() {
    const viewAllPage = new View_All_Driver;
    viewAllPage.init();
}

/*===========================================*/
/*  Index Driver & General Purpose Site Code */
/*                                           */
/*   Usage: Set a var to new Site_Driver(),  */
/*   and call var.init() in body of index.   */
/*===========================================*/
class Site_Driver {
    baseUrl = "https://botw-compendium.herokuapp.com/api/v2"; //Base api call url, inhereted classes will customize it to finish the call

    init() {
        //Void, defined in children
    }

    //Used to display errors
    display_error_header(targetElement, message) {
        const target_header = document.createElement("h2");
        target_header.classList.add("error");
        target_header.innerText = message;
        delete_children(targetElement);
        targetElement.appendChild(target_header);
    }
};

class Search_Driver extends Site_Driver{
    resultSection = document.querySelector(".search-result");
    searchForm = document.querySelector(".search-form");
    cardLoaded = false; // Tracks if a search has been done yet, redo api call if true
    lastSearchTarget = "" //Tracks last successful search target for api recall

    searchOption = "/entry/"

    init() {
        //init search functions
        this.init_search_form();
    }

    init_search_form() {
        this.searchForm.addEventListener("submit", this.execute_search.bind(this));
    }

    async execute_search(event) {
        event.preventDefault(); //Stop the form from doing form stuff, we just want to place the card in the DOM
        this.cardLoaded = false;
        const searchInput = document.querySelector("#search-input").value;
        const searchResult = await this.get_result(searchInput);

        if(searchResult == undefined)
        {
            this.display_error_header(this.resultSection, `${searchInput} was not found...`);
        }
        else
        {
            this.display_result(searchResult);
        }
    }

    async get_result(searchItem) {
        console.log(this)
        let searchResult = undefined; //If it stays undefined, we didnt get a result

        searchItem = searchItem.trim().replace(/\s+/,"_").toLowerCase(); // Get rid of leading/trailing whitespace, replace spaces with an underscore, set everything to lowercase, all for a valid input for api call

        let searchUrl = this.baseUrl;

        searchUrl += this.searchOption + searchItem;

        console.log(searchUrl);

        await fetch( searchUrl )
        .then(res => res.json())
        .then(data => {
            if(data["message"] != "no results") //Api call returns this if searchItem is not found
            {
                searchResult = data.data; //Set searchResult to the entry we got
            }
        })
        .catch(err => {
            console.error(err);
        })

        return searchResult; 
    }

    display_result(result) { //Result is a compendium entry
        const card = new Compendium_Card(result);
        delete_children(this.resultSection);
        card.appendToTarget(this.resultSection);
        this.cardLoaded = true;
    }
};

class View_All_Driver extends Site_Driver {
    viewAllOption = "/all";
    viewAllUrl = this.baseUrl + this.viewAllOption;
    loadingIconContainer = document.querySelector(".loading-icon");
    loadingIconAnimation;
    categoricContainer = document.querySelector(".categoric-sort");
    alphabeticalContainer = document.querySelector(".alphabetical-sort");
    contentContainer = document.querySelector(".all-e-content");
    errorHeader = document.querySelector(".error-header");
    categoricSortButton = document.querySelector("#c-view");
    alphabeticSortButton = document.querySelector("#a-view");

    async init() {
        //Turn on loading icon
        this.init_loading_icon();

        //Fetch compendium
        const compendium = await this.get_compendium();
        console.log(compendium)

        //Verify Compendium fetch was good
        if(compendium == null) {
            this.display_error_header(this.errorHeader, "Fetch failed, please reload...")
        }
        else
        { 
            //Populate categoric
            this.populate_categoric(compendium);
            //Populate 
            this.populate_alphabetic(compendium);
        }

        //Init sort buttons
        this.init_sort_buttons();

        //Turn off loading icon
        this.stop_loading_icon();

        //Display content
        this.toggle_hidden();
    }

    init_loading_icon() {
        this.loadingIconAnimation = setInterval(this.loading_animation_driver.bind(this), 320);
    }

    stop_loading_icon() {
        clearInterval(this.loadingIconAnimation);
        this.loadingIconContainer.classList.toggle("hidden")
    }

    loading_animation_driver() {
        this.loadingIconContainer.classList.toggle("fade");
    }

    async get_compendium() {
        let compendium;

        await fetch(this.viewAllUrl)
        .then(res => res.json())
        .then(data => {
            compendium = data.data;
        })
        .catch(err => {
            console.error(err);
            compendium = null;
        })

        return compendium;
    }

    populate_categoric(compendium) {
        const food      = compendium.creatures.food;
        const non_food  = compendium.creatures.non_food;
        const creatures = sort_objs_numerically(food.concat(non_food), "id");
        const creaturesTarget = document.querySelector(".creatures > .cards");
        const equipment = sort_objs_numerically(compendium.equipment, "id");
        const equipmentTarget = document.querySelector(".equipment > .cards");
        const materials = sort_objs_numerically(compendium.materials, "id");
        const materialsTarget = document.querySelector(".materials > .cards");
        const monsters  = sort_objs_numerically(compendium.monsters, "id");
        const monstersTarget = document.querySelector(".monsters > .cards");
        const treasure = sort_objs_numerically(compendium.treasure, "id");
        const treasureTarget = document.querySelector(".treasure > .cards");

        populate_section(creatures, creaturesTarget);
        populate_section(monsters, monstersTarget);
        populate_section(materials, materialsTarget);
        populate_section(equipment, equipmentTarget);
        populate_section(treasure, treasureTarget);
    }

    populate_alphabetic(compendium) {
        const food = compendium.creatures.food;
        const non_food = compendium.creatures.non_food;
        const equipment = compendium.equipment;
        const materials = compendium.materials;
        const monsters = compendium.monsters;
        const treasures = compendium.treasure;
        let all = food.concat(non_food, equipment, materials, monsters, treasures);

        all = sort_objs_alphabetically(all, "name");

        all.forEach(x => {
            const target = x["name"][0].toUpperCase();
            const targetSection = document.querySelector("." + target + " > section");
            const targetCard = new Compendium_Card(x);
            targetCard.appendToTarget(targetSection);
        })
    }

    toggle_hidden() {
        this.contentContainer.classList.toggle("hidden")
    }

    init_sort_buttons() {

        this.categoricSortButton.otherItem = this.alphabeticSortButton;
        this.categoricSortButton.container = this.categoricContainer;
        this.alphabeticSortButton.otherItem = this.categoricSortButton;
        this.alphabeticSortButton.container = this.alphabeticalContainer;

        this.categoricSortButton.addEventListener("click", this.change_view);
        this.alphabeticSortButton.addEventListener("click", this.change_view);
    }

    change_view(event) {
        console.log(event)
        if(!event.target.classList.contains("active"))
        {
            console.log("Were doing a change")
            event.target.classList.toggle("active");
            event.target.otherItem.classList.toggle("active");
            event.target.container.classList.toggle("hidden")
            event.target.otherItem.container.classList.toggle("hidden");
        }
    }
};

/* Create and append Hyrule Compendium cards into the document */
/* Usage: new Compendium_Card(obj) where obj is a properly
          formatted compendium entry from the api
          This will return the below object, which can be appended
          to the document with the appendToTarget(targetElement) method  */
class Compendium_Card {

    card_container = document.createElement("div"); //Entire container
    upper_container = document.createElement("div"); //Name and description
    lower_container = document.createElement("div"); //Extra info and location
    identity_container = document.createElement("div"); //Name, category, img
    description_container = document.createElement("div"); //Description
    info_container = document.createElement("div"); //Extra info
    location_container = document.createElement("div"); //Location info

    constructor(obj) {
        this.init_classes();
        this.add_headers();
        this.populate_identity(obj);
        this.populate_description(obj);
        this.populate_info(obj);
        this.populate_locations(obj);
        this.populate_upper();
        this.populate_lower();
        this.populate_card();

        this.appendToTarget(document.querySelector("body"));
    }

    init_classes() {
        this.card_container.classList.add("card");
        this.upper_container.classList.add("upper-info");
        this.lower_container.classList.add("lower-info");
        this.identity_container.classList.add("basic-info");
        this.description_container.classList.add("desc");
        this.info_container.classList.add("extra-info");
        this.location_container.classList.add("locations");
    }

    add_headers() {
        const description_header = document.createElement("h6");
        const info_header = document.createElement("h6");
        const location_header = document.createElement("h6");

        description_header.innerText = "Description";
        info_header.innerText = "Important Info";
        location_header.innerText = "Common Locations";

        this.description_container.appendChild(description_header);
        this.info_container.appendChild(info_header);
        this.location_container.appendChild(location_header);
    }

    populate_identity(obj) {
        const name_header = document.createElement("h5");
        const category_entry = document.createElement("p");
        const entry_image = document.createElement("img");

        name_header.innerText = set_property(obj, "id", "ID Unknown") + " - " + set_property(obj, "name", "Name Unknown");
        category_entry.innerText = set_property(obj, "category", "Category Unknown");
        entry_image.src = set_property(obj, "image", null);
        entry_image.alt = set_property(obj, "name", "Name of shown creature is unknown.");

        this.identity_container.appendChild(name_header);
        this.identity_container.appendChild(category_entry);
        this.identity_container.appendChild(entry_image);
    }

    populate_description(obj) {
        const description = document.createElement("p");

        description.innerText = set_property(obj, "description", "No information");

        this.description_container.appendChild(description);
    }

    populate_upper() {
        this.upper_container.appendChild(this.identity_container);
        this.upper_container.appendChild(this.description_container);
    }

    populate_locations(obj) {
        const location_list = document.createElement("ul");
        const locations = set_property(obj, "common_locations", []);

        if(locations.length == 0)
        {
            const listItem = document.createElement("li");
            listItem.innerText = "No known locations";
            location_list.appendChild(listItem);
        }
        else
        {
            locations.forEach(x=>{
                const listItem = document.createElement("li");
                listItem.innerText = x;
                location_list.appendChild(listItem);
            })
        }
        
        this.location_container.appendChild(location_list);
    }

    populate_info(obj) {
        //This is the most challenging one to pull off, need all other properties to be added to a potentially nested list
        const info_list = document.createElement("ul");

        for(let key in obj)
        {
            switch(key) {
                case "category": case "common_locations": case "description": case "id": case "image": case "name":
                    break; //Do nothing
                default:
                    const listItem = document.createElement("li");
                    if(typeof obj[key] == "object") //Should be an array
                    {
                        const innerHeader = document.createElement("span");
                        const innerList = document.createElement("ul");

                        innerHeader.innerText = key.replace("_", " ") + ":"
                        listItem.appendChild(innerHeader);
                        if(obj[key] == null || obj[key] == undefined || obj[key].length == 0)
                        {
                            const innerListItem = document.createElement("li");

                            innerListItem.innerText = "Unknown";

                            innerList.appendChild(innerListItem);
                        }
                        else
                        {
                            obj[key].forEach(x=> {
                                const innerListItem = document.createElement("li");

                                innerListItem.innerText = x;

                                innerList.appendChild(innerListItem);
                            })
                        }
                        listItem.appendChild(innerList);
                    }
                    else
                    {
                        listItem.innerText = key.replace("_", " ") + ": " + obj[key];
                    }
                    info_list.appendChild(listItem);
                    break;
            }
        }

        this.info_container.appendChild(info_list);
    }

    populate_lower() {
        this.lower_container.appendChild(this.info_container);
        this.lower_container.appendChild(this.location_container);
    }

    populate_card() {
        this.card_container.appendChild(this.upper_container);
        this.card_container.appendChild(this.lower_container);
    }

    appendToTarget(target) {
        target.appendChild(this.card_container);
    }
};

/*=============================*/
/*      Utility Functions      */
/*=============================*/
function sort_objs_alphabetically(objs, propertyName) {
    console.log(objs);
    return objs.map( x => [x[propertyName], x] )
               .sort((a,b) => a[0].localeCompare(b[0]))
               .map( x => x[1] );
}

function sort_objs_numerically(objs, propertyName) {
    return objs.map( x => [x[propertyName], x] )
               .sort((a,b) => Number(a[0])-Number(b[0]))
               .map( x => x[1] );
}

function delete_children(obj) {
    while(obj.firstChild) {
        obj.removeChild(obj.firstChild)
    }
}


function create_ul(listContent)
{
    const list = document.createElement("ul");
    listContent.forEach(x=>{
        const list_item = document.createElement("li");
        list_item.innerText = x;
        list.appendChild(list_item);
    })
    return list;
}

function set_property(obj, property, alt) {
    if(obj[property] == null || obj[property] == undefined)
    {
        return alt;
    }
    else
    {
        return obj[property];
    }
}

function populate_section(entry_array, targetElement)
{
    entry_array.forEach(x => {
        const card = new Compendium_Card(x);
        card.appendToTarget(targetElement);
    });
}