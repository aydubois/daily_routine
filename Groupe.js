import { GROUPES, NODE_ELEMENTS } from "./constants.js"

export class Groupe {
    name = ''
    color = ''
    collaborateurs = []

    constructor(name, color){
        this.name = name 
        this.color = color 
        this.addGroupeIntoSelect()
        this.addTag()
    }

    addGroupeIntoSelect() {
        const option = document.createElement('option')
        option.value = this.name
        option.id = this.name
        option.textContent = this.name
        option.style.color = this.color
        NODE_ELEMENTS.input_groupe.appendChild(option)
    }

    addTag(){
        const p = document.createElement('p')
        p.textContent = this.name
        p.style.backgroundColor = this.color

        const span = document.createElement('span')
        span.textContent = "X"

        p.appendChild(span)
        NODE_ELEMENTS.container_tag.appendChild(p)
        this.addEventDeleteGroupeToCross(span, p)
    }

    addEventDeleteGroupeToCross(cross, tag){
        cross.addEventListener("click", () => {
            tag.remove()
            document.querySelector("option#"+this.name)?.remove()
            const indexToRemove = GROUPES?.findIndex(groupe => groupe.getName() === this.name)
            GROUPES[indexToRemove] = undefined
            this.collaborateurs?.forEach(collab => this.removeCollaborateur(collab))
            delete this
        })
    }

    addCollaborateur(collab) {
        collab.addIntoList()
        collab.addCard()
        this.collaborateurs.push(collab)
        this.addEventDeleteCollabToCross(collab)
    }

    addEventDeleteCollabToCross(collab) {
        collab.getDeleteNode().addEventListener("click", ()=> {
            this.removeCollaborateur(collab)
        })
    }
    
    removeCollaborateur(collab) {
        let collabIntoList = document.getElementById(collab.getId())
        let collabCard = document.getElementById(collab.getName())

        collabIntoList.remove()
        collabCard.remove()
        this.collaborateurs = this.collaborateurs.filter(collaborateur => collaborateur != collab)
    }

    getName() {
        return this.name
    }

    getColor() {
        return this.color
    }

    getCollaborateurs() {
        return this.collaborateurs
    }
    getDataStorage() {
        const collabs = []
        this.collaborateurs.forEach(collab => collabs.push(collab.getDataStorage()))
        
        return {
            name : this.name,
            color : this.color,
            collaborateurs : collabs
        }
    }
}

