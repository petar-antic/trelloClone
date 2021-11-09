const lists = document.querySelectorAll('.list');
const items = document.querySelectorAll('.items');
const buttons = document.querySelectorAll('.button');

const backlogDiv = document.getElementById('backlog');
const inProgressDiv = document.getElementById('inProgress');
const completeDiv = document.getElementById('complete');
const onHoldDiv = document.getElementById('onHold');

const storage = window.localStorage;
// storage.clear();
draggedItem = null;
if (Object.entries(storage).length) {
  existingItems = Object.values(storage).map((localItem) =>
    JSON.parse(localItem)
  );
  existingKeys = Object.keys(storage).map((localKey) => localKey);
  getItems(existingItems, existingKeys);
  dragItem();
}

buttons.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    let dataItem = btn.getAttribute('data-items');
    let key = `item-${Date.now()}`;
    storage.setItem(
      key,
      JSON.stringify({ key: key, title: 'New Item', list: `${dataItem}` })
    );

    let newItem = document.createElement('div');
    newItem.classList.add('list-item');
    newItem.setAttribute('draggable', true);
    newItem.setAttribute('data-key', key);
    newItem.innerText = 'New Item';
    switch (dataItem) {
      case 'backlog':
        backlogDiv.appendChild(newItem);
        break;
      case 'inProgress':
        inProgressDiv.appendChild(newItem);
        break;
      case 'complete':
        completeDiv.appendChild(newItem);
        break;
      case 'onHold':
        onHoldDiv.appendChild(newItem);
        break;
    }
    dragItem();
  });
});

function getItems(existingItems, existingKeys) {
  existingItems.forEach((item, i) => {
    key = existingKeys[i];
    let newItem = document.createElement('div');
    newItem.classList.add('list-item');
    newItem.setAttribute('draggable', true);
    newItem.setAttribute('data-key', key);
    newItem.innerText = item.title;
    switch (item.list) {
      case 'backlog':
        backlogDiv.appendChild(newItem);
        break;
      case 'inProgress':
        inProgressDiv.appendChild(newItem);
        break;
      case 'complete':
        completeDiv.appendChild(newItem);
        break;
      case 'onHold':
        onHoldDiv.appendChild(newItem);
        break;
    }
  });
}

function dragItem() {
  let list_items = document.querySelectorAll('.list-item');
  list_items.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      draggedItem = item;
      setTimeout(function () {
        item.style.visibility = 'none';
      }, 0);
    });
    item.addEventListener('dragend', (e) => {
      setTimeout(function () {
        item.style.display = 'block';
        draggedItem = null;
      }, 0);
    });
  });

  lists.forEach((itemsList, i) => {
    itemsList.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    itemsList.addEventListener('dragenter', function (e) {
      e.preventDefault();
    });
    itemsList.addEventListener('drop', function (e) {
      items[i].appendChild(draggedItem);
      datakey = draggedItem.getAttribute('data-key');
      list1 = items[i].id;
      storage.setItem(
        datakey,
        JSON.stringify({
          key: datakey,
          title: 'New Item',
          list: list1,
        })
      );
    });
  });
}
