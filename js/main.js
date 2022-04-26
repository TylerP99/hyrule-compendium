const baseUrl = "https://botw-compendium.herokuapp.com/api/v2";
const entryMode = "/entry/moblin";

const allMode = baseUrl + "/all"

fetch(allMode)
.then(res => res.json() )
.then(data => {
    const complete_compendium = data.data;
    console.log(data.data)
    display(complete_compendium);
})
.catch(err => {
    console.error(err)
})


function display(compendium) {
    delete_children(document.querySelector("body"));
    const food = compendium.creatures.food;
    const non_food = compendium.creatures.non_food;
    const equipment = compendium.equipment;
    const materials = compendium.materials;
    const monsters = compendium.monsters;
    const treasures = compendium.treasure;

    food.forEach(x=>new Compendium_Card(x));
    non_food.forEach(x=>new Compendium_Card(x));
    equipment.forEach(x=>new Compendium_Card(x));
    materials.forEach(x=>new Compendium_Card(x));
    monsters.forEach(x=>new Compendium_Card(x));
    treasures.forEach(x=>new Compendium_Card(x));
}


function display_creatures(creatures_all)
{
    const food = creatures_all.food; //Array of all food items
    const non_food = creatures_all.non_food;
    console.log(food);
    console.log(non_food);
    delete_children(document.querySelector("body"));
    food.forEach(x=>create_card(x));
    non_food.forEach(x=>create_card(x))
}

function create_card(obj) {
    const card_container = document.createElement("div");
    card_container.classList.add("card");

    const upper_container = document.createElement("div");
    upper_container.classList.add("upper-info");

    const basic_info = document.createElement("div");
    basic_info.classList.add("basic-info");
    const name = document.createElement("h1");
    name.innerText = obj.name;
    basic_info.appendChild(name);
    const category = document.createElement("h3");
    category.innerText = obj.category;
    basic_info.appendChild(category);
    const image = document.createElement("img");
    image.src = obj.image;
    image.alt = obj.name;
    basic_info.appendChild(image);
    upper_container.appendChild(basic_info);

    const desc_container = document.createElement("div");
    desc_container.classList.add("desc");
    const desc_header = document.createElement("h2");
    desc_header.innerText = "Description";
    desc_container.appendChild(desc_header);
    const desc = document.createElement("p");
    desc.innerText = obj.description;
    desc_container.appendChild(desc);
    upper_container.appendChild(desc_container);

    card_container.appendChild(upper_container);

    const lower_container = document.createElement("div");
    lower_container.classList.add("lower-info");

    const extra_info = document.createElement("div");
    extra_info.classList.add("extra-info");
    const extra_header = document.createElement("h2");
    extra_header.innerText = "Important Info";
    extra_info.appendChild(extra_header);
    //Looks at obj and adds any items not already set to be added to the info list
    const info_list = document.createElement("ul")
    for(let key in obj) {
        switch(key) {
            case "category": case "common_locations": case "description": case "id": case "image": case "name":
                break; //Do nothing
            default:
                if(!obj[key]) //If value is null or undefined
                {
                    //Do nothing
                }
                else
                {
                    let newItem = document.createElement("li");
                    let itemDesc = key;
                    itemDesc = itemDesc.replace("_"," ");

                    if(typeof obj[key] == "object")
                    {
                        let listHeader = document.createElement("span");
                        listHeader.innerText = itemDesc +":";
                        newItem.appendChild(listHeader);

                        let newList = document.createElement("ul");
                        let innerObj = obj[key];
                        for(let key2 in innerObj)
                        {
                            let newListItem = document.createElement("li");
                            newListItem.innerText = innerObj[key2];
                            newList.appendChild(newListItem);
                        }
                        newItem.appendChild(newList);
                        info_list.appendChild(newItem)
                    }
                    else
                    {
                        newItem.innerText = itemDesc + ": " + obj[key];
                        info_list.appendChild(newItem);
                    }
                }
                
                break;  
        }
    }
    extra_info.appendChild(info_list);

    lower_container.appendChild(extra_info);

    const locations = document.createElement("div");
    locations.classList.add("locations");
    const loc_header = document.createElement("h2");
    loc_header.innerText = "Common Locations";
    locations.appendChild(loc_header);
    const loc_list = document.createElement("ul");
    if(obj.common_locations) {
        obj.common_locations.forEach(x=>{
            let newLoc = document.createElement("li");
            newLoc.innerText = x;
            loc_list.appendChild(newLoc);
        })
    }
    else {
        let loc = document.createElement("li");
        loc.innerText = "Unknown";
        loc_list.appendChild(loc);
    }
    locations.appendChild(loc_list);

    lower_container.appendChild(locations);

    card_container.appendChild(lower_container);

    document.querySelector("body").appendChild(card_container);
}

function populate_card(obj) {
    document.querySelector(".basic-info > h1").innerText = obj.name;
    document.querySelector(".basic-info > h3").innerText = obj.category;
    document.querySelector(".basic-info > img").src = obj.image;

    document.querySelector(".desc > p").innerText = obj.description;

    let infoList = document.querySelector(".extra-info > ul");
    delete_children(infoList);

    let effect = document.createElement("li")
    effect.innerText = "Cooking Effect: " + obj.cooking_effect
    infoList.appendChild(effect)

    let restored = document.createElement("li")
    restored.innerText = "Hearts Restored: " + obj.hearts_recovered;
    infoList.appendChild(restored)

    let locList = document.querySelector(".locations > ul");
    delete_children(locList);

    obj.common_locations.forEach( x => {
        let newItem = document.createElement("li");
        newItem.innerText = x;
        locList.appendChild(newItem);
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

        name_header.innerText = setProperty(obj, "name", "Name Unknown");
        category_entry.innerText = setProperty(obj, "category", "Category Unknown");
        entry_image.src = setProperty(obj, "image", null);
        entry_image.alt = setProperty(obj, "name", "Name of shown creature is unknown.");

        this.identity_container.appendChild(name_header);
        this.identity_container.appendChild(category_entry);
        this.identity_container.appendChild(entry_image);
    }

    populate_description(obj) {
        const description = document.createElement("p");

        description.innerText = setProperty(obj, "description", "No information");

        this.description_container.appendChild(description);
    }

    populate_upper() {
        this.upper_container.appendChild(this.identity_container);
        this.upper_container.appendChild(this.description_container);
    }

    populate_locations(obj) {
        const location_list = document.createElement("ul");
        const locations = setProperty(obj, "common_locations", []);

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

function setProperty(obj, property, alt) {
    if(obj[property] == null || obj[property] == undefined)
    {
        return alt;
    }
    else
    {
        return obj[property];
    }
}