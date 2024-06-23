function renderItem(item, index) {
    return `
    <div data-index="${index}" class="item ${item.completed ? "checked" : ""}">
        <input type="checkbox" ${item.completed ? "checked" : ""}>
        <p>${item[0]} ${item[1] > 1 ? `(${item[1]})` : ""}</p>
        ${!item.completed ? `<button class="edit">Edytuj</button>` : ""}
        <button class="delete">Usuń</button>
    </div>
`;
}

function renderEditItem(item) {
    return `
        <input value="${item.content}" class="edited-item">
        <button class="save">Zapisz</button>
`;
}

function groupItems(list) {
    const result = {};

    list.forEach(({ content }) => {
        if (result[content]) {
            result[content] = result[content] + 1;
        } else {
            result[content] = 1;
        }
    });

    return Object.entries(result);
}

export function renderApp(rootNode, onDeleteItem, onAddItem, onChangeItem) {
    let shoppingList;

    let editedItemIndex = null;
    rootNode.innerHTML = `
        <div>
            <div>
                <h1>Lista zakupów</h1>
                <div id="add-row">
                    <div id="input-row">
                        <div id="loader" class="hidden"></div> 
                        <input type="text" placeholder="Dodaj zakup"/>
                        <div id="suggestion-box" class="hidden">
                            <ul>
                                <li><b>Mak</b>aron Spaghetti Lubella</li>
                                <li><b>Mak</b>aron świderki Barilla</li>
                                <li><b>Mak</b>aron tagiatelle Barilla</li>
                            </ul>
                        </div>
                    </div>
                    <button class="add">Dodaj</button>
                </div>
            </div>
                <div id="shopping-list">
                    
                </div>
            <div>
            </div>
        </div>
    `;

    function renderShoppingList(items) {
        shoppingList = items;
        rootNode.querySelector("#shopping-list").innerHTML = items.length
            ? groupItems(items).map(renderItem).join("")
            : `<p class="empty">Lista pusta 🎉</p>`;
    }

    function renderAddItem(item) {
        shoppingList.push(item);
        renderShoppingList(rootNode, shoppingList);
    }

    function renderEditedItem(item) {
        shoppingList[editedItemIndex] = item;

        const tempNode = document.createElement("div");
        tempNode.innerHTML = renderItem(
            shoppingList[editedItemIndex],
            editedItemIndex
        );

        const editedItem = rootNode.querySelector(
            `[data-index="${editedItemIndex}"]`
        );
        editedItem.replaceWith(tempNode.firstElementChild);

        editedItem.classList.remove("edited-item");
        editedItemIndex = null;
    }

    rootNode.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        if (e.target.classList.contains("add")) {
            const input = parent.querySelector("input");

            const content = input.value;
            const newItem = { content, completed: false };

            input.value = "";

            onAddItem(newItem, renderAddItem);
        }

        if (e.target.classList.contains("edit")) {
            if (editedItemIndex !== null) {
                return;
            }

            const index = Number(parent.dataset["index"]);
            editedItemIndex = index;
            parent.classList.add("edited-item");
            parent.innerHTML = renderEditItem(shoppingList[index]);
        }

        if (e.target.classList.contains("save")) {
            const content = parent.querySelector("input").value;
            shoppingList[editedItemIndex].content = content;

            onChangeItem(shoppingList[editedItemIndex], renderEditedItem);
            editedItemIndex = null;
        }

        if (e.target.classList.contains("delete")) {
            const index = Number(parent.dataset["index"]);
            onDeleteItem(shoppingList[index], (element) => {
                shoppingList.splice(index, 1);
                renderShoppingList(rootNode, shoppingList);
            });
        }
    });

    rootNode.addEventListener("change", (e) => {
        if (e.target.type === "checkbox") {
            const parent = e.target.parentNode;
            const index = Number(parent.dataset["index"]);
            editedItemIndex = index;
            shoppingList[editedItemIndex].completed = e.target.checked;

            onChangeItem(shoppingList[editedItemIndex], renderEditedItem);
        }
    });

    if (localStorage["autocomplete"]) {
        rootNode.addEventListener("input", (e) => {
            if (e.target.value.length >= 3) {
                const parentNode = e.target.parentNode;

                const loader = parentNode.querySelector("#loader");
                loader.classList.remove("hidden");

                setTimeout(() => {
                    loader.classList.add("hidden");
                    parentNode
                        .querySelector("#suggestion-box")
                        .classList.remove("hidden");
                }, 750);
            }
        });
    }

    rootNode.querySelector("#suggestion-box").addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            rootNode.querySelector("input").value = e.target.textContent;
            rootNode.querySelector("#suggestion-box").classList.add("hidden");
        }
    });

    return { renderShoppingList };
}
