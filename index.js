const baseUrl = 'https://prafrios-tag-backend.herokuapp.com/'
// const baseUrl = 'http://localhost:4000/'
let currentIdChangeText = false
let currentText = false
let currentModel = false
const btnSave = document.querySelector("#save")
const btnPrint = document.querySelector("#print")
const changeData = document.querySelectorAll(".changeData")
const saveTextTag = document.querySelector("#saveTextTag")
const tagModels = document.querySelector("#tagModels")

const getTagTypeOneData = () => {

    const title = (document.querySelector('#title') || { innerHTML: false }).innerHTML
    const obs1 = (document.querySelector('#obs1') || { innerHTML: false }).innerHTML
    const obs2 = (document.querySelector('#obs2') || { innerHTML: false }).innerHTML
    const obs3 = (document.querySelector('#obs3') || { innerHTML: false }).innerHTML
    const obs4 = (document.querySelector('#obs4') || { innerHTML: false }).innerHTML
    const obs5 = (document.querySelector('#obs5') || { innerHTML: false }).innerHTML
    const obs6 = (document.querySelector('#obs6') || { innerHTML: false }).innerHTML
    const obs7 = (document.querySelector('#obs7') || { innerHTML: false }).innerHTML
    const obs8 = (document.querySelector('#obs8') || { innerHTML: false }).innerHTML
    const obs9 = (document.querySelector('#obs9') || { innerHTML: false }).innerHTML
    const obs10 = (document.querySelector('#obs10') || { innerHTML: false }).innerHTML
    const obs11 = (document.querySelector('#obs11') || { innerHTML: false }).innerHTML
    const obs12 = (document.querySelector('#obs12') || { innerHTML: false }).innerHTML
    const obs13 = (document.querySelector('#obs13') || { innerHTML: false }).innerHTML
    const obs14 = (document.querySelector('#obs14') || { innerHTML: false }).innerHTML
    const obs15 = (document.querySelector('#obs15') || { innerHTML: false }).innerHTML
    const obs16 = (document.querySelector('#obs16') || { innerHTML: false }).innerHTML
    const obs17 = (document.querySelector('#obs17') || { innerHTML: false }).innerHTML

    return { title, obs1, obs2, obs3, obs4, obs5, obs6, obs7, obs8, obs9, obs10, obs11, obs12, obs13, obs14, obs15, obs16, obs17 }
}

saveTextTag.addEventListener("click", async () => {
    const text = document.querySelector(`#textTag`).value
    console.log(`#${currentIdChangeText}`, text)
    document.querySelector(`#${currentIdChangeText}`).innerHTML = String(text)
    $('#textTagModal').modal('hide')

});

btnSave.addEventListener("click", async () => {
    const etData = getTagTypeOneData()
    await save(etData)
    window.location.reload()
});

const changeDataText = (id, text) => {
    currentIdChangeText = id
    document.querySelector(`#textTag`).value = text
    $('#textTagModal').modal('show')
}


btnPrint.addEventListener("click", async () => {
    window.print();
});

const fillTag = (tag) => {
    fillTagTypeOne(tag)
}

const fillTagTypeOne = (tag) => {
    const keys = Object.keys(tag)
    for (let index in keys) {
        const key = keys[index]
        const value = tag[key]

        if (key != 'id' && value) {
            console.log(key)
            try {
                document.querySelector(`#${key}`).innerHTML = value
            
            } catch (error) {
                console.log(`nao deu`)
            }
        }
    }
}

const save = async (data) => {
    console.log(data)
    const tags = await fetch(`${baseUrl}tag`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => {
            return data.json()
        })
        .catch(err => {
            // Catch and display errors
        })
    return tags
}

const getTags = async (model) => {
    const tags = await fetch(`${baseUrl}tag/model/${model}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(data => {
            return data.json()
        })
        .catch(err => {
            // Catch and display errors
        })
    return tags
}


const getTagById = async (id) => {

    const tags = await fetch(`${baseUrl}tag/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(data => {
            return data.json()
        })
        .catch(err => {
            // Catch and display errors
        })
    return tags
}


const removeTagById = async (id) => {

    const tags = await fetch(`${baseUrl}tag/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(data => {
            return data.json()
        })
        .catch(err => {
            // Catch and display errors
        })
    return tags
}

const useTag = async (id) => {
    const tag = await getTagById(id)
    fillTag(tag[0])
}

const removeTag = async (id) => {
    const tag = await removeTagById(id)
    window.location.reload()

}

const listTags = async (model) => {
    const tags = await getTags(model)
    let card = ''
    tags.map(item => {
        card +=
            `
        <div class="col-3">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${item.obs1}</h6>
                    <a href="#" class="card-link" onClick='useTag(${item.id})' >Usar</a>
                    <a href="#" class="card-link" onClick='removeTag(${item.id})' >Remover</a>
                </div>
            </div>
        </div>
        `
    })

    document.querySelector('#listTags').innerHTML = card
}


for (var i = 0; i < changeData.length; i++) {
    const id = changeData[i].id
    const text = changeData[i].innerHTML
    changeData[i].addEventListener('click', () => changeDataText(id, text), false);
}