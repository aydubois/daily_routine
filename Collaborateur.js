import { NODE_ELEMENTS } from "./constants.js"
import { Utils } from "./Utils.js";

export class Collaborateur {
    id = ''
    name = ''
    isActive = false
    groupe = null //TODO : peut être l'enlever si inutile
    avatar = null
    deleteNode = null
    urlAvatar = '' 
    color = null

    constructor(name,color, isActive, groupe, avatar, urlAvatar){
        this.name = name 
        this.isActive = isActive 
        this.color = color 
        this.groupe = groupe 
        this.avatar = avatar 
        this.urlAvatar = urlAvatar 
        this.id = 'item_'+ this.name
    }

    addIntoList() {
        const li = document.createElement('li')
        const p = document.createElement('p')
        this.deleteNode = Utils.getCrossDelete()
        
        li.id = this.id
        p.textContent = this.name
        p.style.color = this.color
        li.classList.add("list-basic")
        li.active = this.isActive
        
        li.appendChild(p)
        if(!!this.avatar || this.urlAvatar){
            const img = document.createElement('img')
            this.urlAvatar 
                ? img.setAttribute('src', this.urlAvatar)
                : Utils.setImage(img, this.avatar, this) 

            li.appendChild(img)
        }
        li.appendChild(this.deleteNode)
        NODE_ELEMENTS.ul_collabs.appendChild(li)
    }

    addCard() {
    
        if(this.isActive){
            const li = document.createElement('li')
            const p = document.createElement('p')
            
            p.textContent = this.name
            p.style.color = this.color
            li.id = this.name
            li.appendChild(p)

            if(this.avatar || this.urlAvatar){
                this.urlAvatar 
                    ?  li.style.backgroundImage = "url("+this.urlAvatar+")"
                    : Utils.setBackground(li, this.avatar) 
            }
            NODE_ELEMENTS.ul_cards.appendChild(li)
        }
    }

    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getDeleteNode() {
        return this.deleteNode
    }

    getDataStorage() {
        return {
            id : this.id,
            name : this.name,
            isActive : this.isActive,
        }
    }

    getAvatarStorage(){
        return {
            id : this.id,
            urlAvatar: this.urlAvatar
        } 
    }
}
