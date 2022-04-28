const baseUrl = "https://botw-compendium.herokuapp.com/api/v2";
const entryMode = "/entry/moblin";

//display_all();
init_search();

function display_error_header(targetElement, message) {
    const target_header = document.createElement("h2");
    target_header.classList.add("error");
    target_header.innerText = message;
    delete_children(targetElement);
    targetElement.appendChild(target_header);
}


async function display_all() {
    const searchUrl = "https://botw-compendium.herokuapp.com/api/v2/all";
    let completeCompendium;

    await fetch(searchUrl)
    .then(res => res.json() )
    .then(data => {
        console.log(data);
        completeCompendium = data.data;
    })
    .catch(err => {
        console.error(err);
        completeCompendium = null;
    });

    console.log(completeCompendium)

    if(completeCompendium != null)
    {
        display(completeCompendium);
    }
    else
    {
        display_error_header(document.querySelector(".result-message"), "Error while fetching data, please refresh or try again later.");
    }
}

function sort_objs_alphabetically(objs, propertyName) {
    console.log(objs);
    return objs.map( x => [x[propertyName], x] )
               .sort((a,b) => a[0].localeCompare(b[0]))
               .map( x => x[1] );
}

function display(compendium) {
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


/* Search */
function init_search() {
    const searchForm = document.querySelector(".search-form");
    console.log("Init search");
    searchForm.addEventListener("submit", exec_search);
}

async function exec_search(event) {
    event.preventDefault();
    const resultSection = document.querySelector(".result");
    const searchInput = document.querySelector("#search").value;

    const searchResult = await get_result(searchInput);

    console.log("result: " + searchResult)

    if(searchResult == undefined)
    {
        display_error_header(resultSection, `${searchInput} was not found...`);
    }
    else
    {
        display_result(searchResult, resultSection);
    }
}

async function get_result(searchItem) {
    let searchUrl = "https://botw-compendium.herokuapp.com/api/v2/entry/";
    let searchResult = undefined;
    searchItem = searchItem.replace(" ","_");
    searchUrl += searchItem;

    await fetch(searchUrl)
    .then(res =>  res.json())
    .then(data => {
        if(data["message"] == "no results")
        {
            searchResult = undefined;
        }
        else
        {
            searchResult = data.data;
        }
    })
    .catch(err => {
        console.log(`This is an error: ${err}`)
    })
    return searchResult;
}

function display_result(result, targetElement) {
    const card = new Compendium_Card(result);
    delete_children(targetElement);
    card.appendToTarget(targetElement);
}


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
        const description_header = document.createElement("h2");
        const info_header = document.createElement("h2");
        const location_header = document.createElement("h2");

        description_header.innerText = "Description";
        info_header.innerText = "Important Info";
        location_header.innerText = "Common Locations";

        this.description_container.appendChild(description_header);
        this.info_container.appendChild(info_header);
        this.location_container.appendChild(location_header);
    }

    populate_identity(obj) {
        const name_header = document.createElement("h1");
        const category_entry = document.createElement("h3");
        const entry_image = document.createElement("img");

        name_header.innerText = set_property(obj, "name", "Name Unknown");
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
                    console.log(`Property and value ${key} : ${obj[key]}`)
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