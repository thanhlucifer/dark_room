document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    createTabs(data.navPills);
    createTabContent(data.tabPanes, data.navPills);
    tryOnItem();

    // // Đổi lớp CSS của các phần tử theo ánh xạ định nghĩa
    // const classMapping = {
    //     "necklace": "necklaces",
    //     "bikinitop": "topclothes",
    //     "bikinibottom": "botclothes",
    //     "handbag": "handbags",
    //     "feet": "shoes"
    // };

    // for (const [originalClass, newClass] of Object.entries(classMapping)) {
    //     const element = document.querySelector(`.${originalClass}`);
    //     if (element) {
    //         element.classList.remove(originalClass);
    //         element.classList.add(newClass);
    //     }
    // }
});


const createTabs = (navPills) => {
    let navPillsContainer = document.querySelector('.nav.nav-pills');
    navPills.forEach((pill, index) => {
        let pillElement = document.createElement('li');
        pillElement.className = 'nav-item';
        pillElement.innerHTML = `<a class="nav-link ${index === 0 ? 'active' : ''}" data-toggle="tab" href="#${pill.tabName}">${pill.showName}</a>`;
        navPillsContainer.appendChild(pillElement);
    });
};

const createTabContent = (tabPanes, navPills) => {
    let tabContentContainer = document.querySelector('.tab-content');
    navPills.forEach((pill, index) => {
        let tabPane = document.createElement('div');
        tabPane.className = `tab-pane container ${index === 0 ? 'active' : ''}`;
        tabPane.id = pill.tabName;

        let rowElement = document.createElement('div');
        rowElement.className = 'row';

        let items = tabPanes.filter(item => item.type === pill.type);
        items.forEach((item, idx) => {
            if (idx % 4 === 0 && idx !== 0) {
                tabPane.appendChild(rowElement);
                rowElement = document.createElement('div');
                rowElement.className = 'row';
            }

            let colElement = document.createElement('div');
            colElement.className = 'col-md-3'; 
            colElement.innerHTML = `
                <div class="card">
                    <img class="card-img-top" src="${item.imgSrc_jpg}" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        
                        <button class="btn btn-primary try-on" data-id="${item.id}" data-img="${item.imgSrc_png}" data-type="${item.type}" data-name="${item.name}">Thử ngay</button>
                    </div>
                </div>
            `;
            rowElement.appendChild(colElement);
        });
        tabPane.appendChild(rowElement); 
        tabContentContainer.appendChild(tabPane);
    });
};


const tryOnItem = () => {
    const listChosen = new ListChosen();

    document.body.addEventListener('click', event => {
        if (event.target.classList.contains('try-on')) {
            const id = event.target.getAttribute('data-id');
            const imgSrc = event.target.getAttribute('data-img');
            const type = event.target.getAttribute('data-type');
            const name = event.target.getAttribute('data-name');

            const chosenItem = new ChoseItem(id, type, name, imgSrc);
            listChosen.addChosenItem(chosenItem);
            const classMapping = {
                "necklace": "necklaces",
                "bikinitop": "topclothes",
                "bikinibottom": "botclothes",
                "handbag": "handbags",
                "feet": "shoes"
            };
        
            for (const [originalClass, newClass] of Object.entries(classMapping)) {
                const element = document.querySelector(`.${originalClass}`);
                if (element) {
                    element.classList.remove(originalClass);
                    element.classList.add(newClass);
                }
            }

            let targetElement = document.querySelector(`.${type}`);
            if (targetElement) {
                targetElement.style.backgroundImage = `url(${imgSrc})`;
                
            } else {
                console.error(`Element with class .${type} not found.`);
            }
        }
    });
};

