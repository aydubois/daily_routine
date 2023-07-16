import { Collaborateur } from "./Collaborateur.js";
import { Groupe } from "./Groupe.js";
import { ERROR_SIZE, STORAGE, GROUPES, NODE_ELEMENTS, interval, isFirst } from "./constants.js"
import { Animation } from "./Animation.js";

export class Utils {
    static initAll() {
        Utils.initObserveMessageError()
        Utils.initFormAddGroupe()
        Utils.initFormAddCollab()
        Utils.initDataStorage()
        Utils.initEventSaveList()
        Utils.initEventAnimation()
    }

    static setImage(imgNode, img, collab){
        let reader = new FileReader();
        reader.onload = function (e) {
            imgNode.setAttribute('src', e.target.result)
            if(collab){
                collab.urlAvatar = e.target.result
            }else{
                Utils.testSizeIntoLocalStorage(e.target.result, img.name)
            }
        };
        reader.readAsDataURL(img);
    }

    static testSizeIntoLocalStorage(url, name) {
        try{
            localStorage.setItem('TEST-SIZE', JSON.stringify({url: url}))
            localStorage.removeItem('TEST-SIZE')
        }catch(e){
            console.log(e)
            ERROR_SIZE.message = "Le fichier "+ name +" est trop lourd !"
        }
    }

    static initObserveMessageError() {
        const objProxy = new Proxy(ERROR_SIZE, {
            set: function (target, key, value) {
            console.log(`${key} set from ${obj.message} to ${value}`);
            target[key] = value;
            return true;
        },
        });
        //TODO : Ajouter le message d'erreur dans le formulaire

    }
    static setBackground(node, img){
        let reader = new FileReader();
        reader.onload = function (e) {
            node.style.backgroundImage = "url(" + e.target.result + ")"
        };
        reader.readAsDataURL(img);
    }

    static getCrossDelete() {
        let cross = document.createElement('span')
        cross.textContent = "X"
        cross.style.color = "black"

        return cross
    }

    static readURL(input) {
        if (input.files && input.files[0]) {
            Utils.setImage(NODE_ELEMENTS.visualizeAvatar, input.files[0])
        }
    }

    static initEventSaveList() {
        NODE_ELEMENTS.button_save.addEventListener('click', ()=> {
            Utils.saveIntoLocalStorage()
        })
    }

    static initEventAnimation() {
        NODE_ELEMENTS.button_start.addEventListener('click', ()=>{
            NODE_ELEMENTS.button_start.disabled = true
            setTimeout(()=>{
                NODE_ELEMENTS.button_start.disabled = false 
            }, 8000)

            if(!!interval){
                clearInterval(interval)
            }
            if(!isFirst.animation){
                Utils.resetAnimation()
            }else{
                isFirst.animation = false
            }
            Animation.startAnimation()
            setTimeout(()=>{Animation.startMovement()}, 2000)
            setTimeout(()=>{Animation.selectRandomCollab()}, 5000)
        })
    }

    static resetAnimation() {
        NODE_ELEMENTS.get_all_cards().forEach(card => {
            card.remove()
            
        })
        GROUPES?.forEach(groupe => {
            groupe.getCollaborateurs()?.forEach(collab => {
                collab.addCard()
            })
        })
    }

    static  initDataStorage() {
        const groupes = JSON.parse(localStorage.getItem(STORAGE))
        
        groupes?.forEach(groupe => {
            const newGroupe = new Groupe(groupe.name, groupe.color)
            groupe.collaborateurs?.forEach(collaborateur => {
                const dataAvatar = JSON.parse(localStorage.getItem(STORAGE+ '_avatar_' + collaborateur.id))
                
                const newCollab = new Collaborateur(collaborateur.name, groupe.color, collaborateur.isActive, newGroupe, null, dataAvatar?.urlAvatar)
                newGroupe.addCollaborateur(newCollab)
            })
            GROUPES.push(newGroupe)
        })
    }

    static saveIntoLocalStorage() {
        let result = []
        GROUPES.forEach(groupe => {
            if(!groupe){
                return
            }
            result.push(groupe.getDataStorage())

            groupe.getCollaborateurs()?.forEach(collab => {
                localStorage.setItem(STORAGE + '_avatar_' + collab.getId(), JSON.stringify(collab.getAvatarStorage()))
            })
        });

        localStorage.setItem(STORAGE, JSON.stringify(result))

    }
    
    static initFormAddCollab(){
        const name = NODE_ELEMENTS.input_name
        const groupe = NODE_ELEMENTS.input_groupe
        const avatar = NODE_ELEMENTS.input_avatar
    
        NODE_ELEMENTS.form_collab.addEventListener('submit', (e)=>{
            e.preventDefault()
            e.stopPropagation()
            let selectedGroupe = GROUPES.find(group => group.getName() === groupe.value)
            
            const collab = new Collaborateur(name.value,selectedGroupe.getColor(), true, selectedGroupe, avatar?.files?.[0], null)
            selectedGroupe.addCollaborateur(collab)
        })
    
        avatar.addEventListener('change', ()=>{
            Utils.readURL(avatar)
        })
    }

    static initFormAddGroupe(){
        const nameGroupe = NODE_ELEMENTS.input_name_groupe
        const color = NODE_ELEMENTS.input_color
    
        NODE_ELEMENTS.form_groupe.addEventListener('submit', (e)=>{
            e.preventDefault()
            e.stopPropagation()
            const groupe = new Groupe(nameGroupe.value, color.value)
            GROUPES.push(groupe)
        })
    }
}